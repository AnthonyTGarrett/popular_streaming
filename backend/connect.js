import sqlite3 from 'sqlite3';

// Setup sqlite3 to verbose to show errors mainly for testing
const sql3 = sqlite3.verbose();

// Opening the database or creating it if it doesn't exist
const db = new sql3.Database(
  './users.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  connected
);

// Displaying an error message if the database fails
function connected(err) {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  }
  console.log('Connected to the SQLite database.');
}

/**
 * @summary Create one table to hold the user information, one table for the watched shows, and one table for shows to watch. Both tables will hold similar entries
 * @description A middleware function that logs the HTTP method and URL of incoming requests.
 *
 * THIS DATABASE SCHEMA WAS CREATED USING GOOGLE GEMINI AS I HAVE VERY LITTLE EXPERIENCE IN CREATING ANY KIND OF TABLE SETUP
 */
let sql0 = `CREATE TABLE IF NOT EXISTS Users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  avatar TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

let sql1 = `
  CREATE TABLE IF NOT EXISTS ShowsWatched (
  watched_movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  showType TEXT NOT NULL,
  imdbId TEXT NOT NULL,
  title TEXT NOT NULL,
  overview TEXT,
  rating INTEGER CHECK(rating >=1 AND rating <= 100),
  image TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
  );`;

let sql2 = `
  CREATE TABLE IF NOT EXISTS ShowsToWatch (
  to_watch_movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  showType TEXT NOT NULL,
  imdbId TEXT NOT NULL,
  title TEXT NOT NULL,
  overview TEXT,
  rating INTEGER CHECK(rating >=1 AND rating <= 100),
  image TEXT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id));
`;

// Creates one table at a time in sequence
db.serialize(() => {
  try {
    db.run(sql0, err => {
      if (err) {
        throw err;
      }
    });
    db.run(sql1, err => {
      if (err) {
        throw err;
      }
    });
    db.run(sql2, err => {
      if (err) {
        throw err;
      }
    });
  } catch (err) {
    console.error(`Database error: ${err.message}`);
  }
});

export { db };
