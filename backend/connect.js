import sqlite3 from 'sqlite3';

const sql3 = sqlite3.verbose();

const db = new sql3.Database(
  './users.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  connected
);

function connected(err) {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  }
  console.log('Connected to the SQLite database.');
}

// Create the three tables I will need in the database
// One table to hold user information, one table for shows that have already been watched and one table for watchlist shows
// Both of the show tables are the same and will be used to quickly access info to be displayed for the user home screen
// This database schema was setup using Google Gemini as I have very liitle experience in creating a table setup

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

// Using serialize to create tables back to back in order
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
