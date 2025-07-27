import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

// Function for simply testing pulling user information out of the database
// Not for production use
export const getUsers = (req, res, next) => {
  res.set('content-type', 'application/json');
  const sql = 'SELECT * FROM users';
  let data = { users: [] };
  try {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        data.users.push({
          id: row.id,
          username: row.username,
          email: row.email,
          password: row.password,
          firstName: row.firstName,
          lastName: row.lastName,
        });
      });
      res.status(200).json(data);
    });
  } catch (err) {
    console.error('Error: ', err.message);
    res.status(400);
  }
};

// Function to add a new User to the database
// Requires 5 pieces of information to add a new user
export const addUser = async (req, res, next) => {
  res.set('content-type', 'application/json');

  // Query the database to determine if a user with the username or email already exists
  const usernameTest = `SELECT * FROM Users WHERE username = ?`;
  const emailTest = `SELECT * FROM Users WHERE email = ?`;
  const { username, password, email, firstName, lastName } = req.body;

  if (await fetchFirst(db, usernameTest, username)) {
    const error = new Error(`An account already exists with that username`);
    error.status = 400;
    return next(error);
  }

  if (await fetchFirst(db, emailTest, email)) {
    const error = new Error(
      `An account already exists with that email address`
    );
    error.status = 400;
    return next(error);
  }

  if (!username || !email || !password) {
    const error = new Error(
      `No blank fields are allowed. Please fill in all required fields.`
    );
    error.status = 400;
    return next(error);
  }

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (!emailRegex.test(email)) {
    const error = new Error(`Invalid Email Address.`);
    error.status = 400;
    return next(error);
  }

  const sql =
    'INSERT INTO users(username, password, email, firstName, lastName) VALUES(?, ?, ?, ?, ?)';
  try {
    db.run(
      sql,
      [
        username,
        await hashPassword(password),
        email,
        firstName || 'unknown',
        lastName || 'unknown',
      ],
      function (err) {
        if (err) throw err;
        res.status(201);
        let data = {
          status: 201,
          message: `User ${firstName} ${lastName} added`,
        };
        res.json(data);
      }
    );
  } catch (error) {
    error.message = 'Error adding the new user.';
    error.status = 400;
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);

  const dbUser = `SELECT * FROM Users WHERE username = ?`;

  const user = await fetchFirst(db, dbUser, username);
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        userId: user.user_id,
        username: username,
      };
      const token = jwt.sign(payload, process.env.secretKey, {
        expiresIn: '2h',
      });
      res.status(200).json(token);
    } else {
      const error = new Error(`Invalid Password.`);
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error(`Username does not exist.`);
    error.status = 400;
    return next(error);
  }
};

export const addWatchedShow = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  const user_id = jwt.decode(token).userId;

  const showWatchedTest = `SELECT * FROM ShowsWatched WHERE imdbId = ? AND user_id = ?`;
  const showsToWatchTest = `SELECT * FROM ShowsToWatch WHERE imdbId = ? AND user_id = ?`;
  const imdbId = req.body.imdbId;

  if (await fetchFirst(db, showWatchedTest, [imdbId, user_id])) {
    const error = new Error('That show is already in your watched list.');
    error.status = 400;
    return next(error);
  }

  let response;

  try {
    response = await axios.get(
      `http://localhost:${process.env.PORT}/api/${imdbId}`
    );
  } catch (error) {
    error.message = 'Invalid show imdbId.';
    error.status = 400;
    return next(error);
  }

  const { showType, title, overview, rating } = response.data;

  if (await fetchFirst(db, showsToWatchTest, [imdbId, user_id])) {
    const delheaders = {
      Authorization: req.header('Authorization'),
      'Content-Type': 'application/json',
    };

    await axios.delete(
      `http://localhost:${process.env.PORT}/users/delWatchListShow`,
      {
        headers: delheaders,
        data: req.body,
      }
    );
  }

  const sql = `INSERT INTO ShowsWatched(user_id, imdbId, showType, title, overview, rating, image) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const inserts = [
    user_id,
    imdbId,
    showType,
    title,
    overview,
    rating,
    response.data.imageSet.verticalPoster.w360,
  ];
  try {
    db.run(sql, inserts, function (error) {
      if (error) throw error;
      res.status(201);
      let updateMessage = {
        status: 201,
        message: `${
          String(showType).charAt(0).toUpperCase() + String(showType).slice(1)
        } ${title} has been added.`,
      };

      res.json(updateMessage);
    });
  } catch (error) {
    error.message('Error inserting show into database.');
    error.status = 400;
    return next(error);
  }
};
export const addWatchListShow = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  const user_id = jwt.decode(token).userId;
  const showWatchedTest = `SELECT * FROM ShowsWatched WHERE imdbId = ? AND user_id = ?`;
  const showsToWatchTest = `SELECT * FROM ShowsToWatch WHERE imdbId = ? AND user_id = ?`;
  const imdbId = req.body.imdbId;

  if (await fetchFirst(db, showWatchedTest, [imdbId, user_id])) {
    const error = new Error('You have already seen this show.');
    error.status = 400;
    return next(error);
  }

  if (await fetchFirst(db, showsToWatchTest, [imdbId, user_id])) {
    const error = new Error('This show is already on your watch list.');
    error.status = 400;
    return next(error);
  }
  let response;

  try {
    response = await axios.get(
      `http://localhost:${process.env.PORT}/api/${imdbId}`
    );
  } catch (error) {
    error.message = 'Invalid show imdbId.';
    error.status = 400;
    return next(error);
  }
  const { showType, title, overview, rating } = response.data;

  const sql = `INSERT INTO ShowsToWatch(user_id, imdbId, showType, title, overview, rating, image) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const inserts = [
    user_id,
    imdbId,
    showType,
    title,
    overview,
    rating,
    response.data.imageSet.verticalPoster.w360,
  ];
  try {
    db.run(sql, inserts, function (error) {
      if (error) throw error;
      res.status(201);
      let updateMessage = {
        status: 201,
        message: `${
          String(showType).charAt(0).toUpperCase() + String(showType).slice(1)
        } ${title} has been added.`,
      };
      res.json(updateMessage);
    });
  } catch (error) {
    error.message('Error inserting show into database.');
    error.status = 400;
    return next(error);
  }
};

export const delWatchedShow = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  const user_id = jwt.decode(token).userId;
  const showWatchedTest = `SELECT * FROM ShowsWatched WHERE imdbId = ? AND user_id = ?`;
  const imdbId = req.body.imdbId;

  if (await fetchFirst(db, showWatchedTest, [imdbId, user_id])) {
    try {
      const delSQL = `DELETE FROM ShowsWatched WHERE imdbId = ? AND user_id = ?`;
      const inserts = [imdbId, user_id];
      db.run(delSQL, inserts, function (error) {
        if (error) throw error;
        res.status(201);
        let updateMessage = {
          status: 200,
          message: `Show has been removed from your Watched Shows.`,
        };
        res.json(updateMessage);
      });
    } catch (error) {
      error.message('Error deleting show from database.');
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error('This show is not in the Watched Show List.');
    error.status = 400;
    return next(error);
  }
};
export const delWatchListShow = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  const user_id = jwt.decode(token).userId;
  const showWatchedTest = `SELECT * FROM ShowsToWatch WHERE imdbId = ? AND user_id = ?`;
  const imdbId = req.body.imdbId;

  if (await fetchFirst(db, showWatchedTest, [imdbId, user_id])) {
    try {
      const delSQL = `DELETE FROM ShowsToWatch WHERE imdbId = ? AND user_id = ?`;
      const inserts = [imdbId, user_id];
      db.run(delSQL, inserts, function (error) {
        if (error) throw error;
        res.status(201);
        let updateMessage = {
          status: 200,
          message: `Show has been removed from your Watch List Shows.`,
        };
        res.json(updateMessage);
      });
    } catch (error) {
      error.message('Error deleting show from database.');
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error('This show is not in the Watch List shows.');
    error.status = 400;
    return next(error);
  }
};

// Returns all shows in the users watched table
export const getWatched = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  const user_id = jwt.decode(token).userId;

  const sql = `SELECT * FROM ShowsWatched WHERE user_id = ?`;
  let data = { Shows: [] };

  if (await fetchFirst(db, sql, user_id)) {
    try {
      db.all(sql, user_id, (error, rows) => {
        if (error) {
          throw error;
        }
        rows.forEach(row => {
          data.Shows.push({
            user_id: row.user_id,
            showType: row.showType,
            imdbId: row.imdbId,
            title: row.title,
            overview: row.overview,
            rating: row.rating,
            image: row.image,
          });
        });

        res.status(200).json(data);
      });
    } catch (error) {
      error.message = 'Error retrieving watched shows.';
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error('Your watched shows is empty.');
    error.status = 404;
    return next(error);
  }
};

export const getWatchList = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  const user_id = jwt.decode(token).userId;

  const sql = `SELECT * FROM ShowsToWatch WHERE user_id = ?`;
  let data = { Shows: [] };

  if (await fetchFirst(db, sql, user_id)) {
    try {
      db.all(sql, user_id, (error, rows) => {
        if (error) {
          throw error;
        }
        rows.forEach(row => {
          data.Shows.push({
            user_id: row.user_id,
            showType: row.showType,
            imdbId: row.imdbId,
            title: row.title,
            overview: row.overview,
            rating: row.rating,
            image: row.image,
          });
        });

        res.status(200).json(data);
      });
    } catch (error) {
      error.message = 'Error retrieving watched shows.';
      error.status = 400;
      return next(error);
    }
  } else {
    const error = new Error('Your Watch List is empty.');
    error.status = 404;
    return next(error);
  }
};

export const clearWatched = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  const user_id = jwt.decode(token).userId;

  const sql = `DELETE FROM ShowsWatched WHERE user_id = ?`;

  try {
    db.run(sql, user_id, function (error) {
      if (error) throw error;
      res.status(200);
      let updateMessage = {
        status: 200,
        message: `Watched Shows have been cleared.`,
      };
      res.json(updateMessage);
    });
  } catch (error) {
    error.message = 'Error deleting shows from database.';
    error.status = 400;
    return next(error);
  }
};
export const clearWatchList = async (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  const user_id = jwt.decode(token).userId;

  const sql = `DELETE FROM ShowsToWatch WHERE user_id = ?`;

  try {
    db.run(sql, user_id, function (error) {
      if (error) throw error;
      res.status(200);
      let updateMessage = {
        status: 200,
        message: `Watch list has been cleared.`,
      };
      res.json(updateMessage);
    });
  } catch (error) {
    error.message = 'Error deleting shows from database.';
    error.status = 400;
    return next(error);
  }
};

// Function to hash the password
// This function is used to hash the password with bcrypt before storing it in the database

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

// Wrapper function taken directly from the sqlitetutorial.net site that make fetching from the db easier and uses promises to do it

export const fetchFirst = async (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};
