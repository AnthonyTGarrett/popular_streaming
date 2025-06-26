import { db } from '../connect.js';
import bcrypt from 'bcryptjs';

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
      let content = JSON.stringify(data);
      res.send(content);
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

  if (await fetchFirst(db, usernameTest, req.body.username)) {
    const error = new Error(`An account already exists with that username`);
    error.status = 400;
    return next(error);
  }

  if (await fetchFirst(db, emailTest, req.body.email)) {
    const error = new Error(
      `An account already exists with that email address`
    );
    error.status = 400;
    return next(error);
  }

  const sql =
    'INSERT INTO users(username, password, email, firstName, lastName) VALUES(?, ?, ?, ?, ?)';
  try {
    db.run(
      sql,
      [
        req.body.username,
        await hashPassword(req.body.password),
        req.body.email,
        req.body.firstName || 'none',
        req.body.lastName || 'none',
      ],
      function (err) {
        if (err) throw err;
        res.status(201);
        let data = {
          status: 201,
          message: `User ${req.body.firstName} ${req.body.lastName}`,
        };
        let content = JSON.stringify(data);
        res.send(content);
      }
    );
  } catch (error) {
    error.message = 'Error adding the new user.';
    error.status = 400;
    return next(error);
  }
};

// Returns all shows in the users watched table
export const getWatchedShows = async (req, res, next) => {
  res.set('content-type', 'application/json');

  const sql = `SELECT * FROM ShowsWatched WHERE user_id = ${req.params.id}`;
  let data = { Movies: [] };

  try {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        data.Movies.push({
          imdbId: row.imdbId,
          title: row.title,
          showType: row.showType,
          overview: row.overview,
        });
      });
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return null;
  }
};
export const getWatchList = async (req, res, next) => {};

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

// Wrapper functions taken directly from the sqlitetutorial.net site that make fetching from the db easier and uses promises to do it

export const fetchAll = async (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const fetchFirst = async (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};
