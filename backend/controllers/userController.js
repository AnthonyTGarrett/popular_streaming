import { db } from '../connect.js';
import bcrypt from 'bcryptjs';

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
  const sql =
    'INSERT INTO users(username, password, email, firstName, lastName) VALUES(?, ?, ?, ?, ?)';

  try {
    db.run(
      sql,
      [
        req.body.username,
        await hashPassword(req.body.password),
        req.body.email,
        req.body.firstName,
        req.body.lastName,
      ],
      function (err) {
        if (err) throw err;
        res.status(201);
        let data = { status: 201, message: `User ${req.body.firstName}` };
        let content = JSON.stringify(data);
        res.send(content);
      }
    );
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      // Check for unique constraint violation
      res
        .status(409)
        .json({ error: 'Duplicate entry: unique value already exists' }); // 409 Conflict
    } else {
      next(err); // Pass other errors to the global error handler
    }
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
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return null;
  }
}
