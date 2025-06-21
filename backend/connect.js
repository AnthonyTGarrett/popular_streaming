import sqlite3 from 'sqlite3';

const sql3 = sqlite3.verbose();

const db = new sql3.Database('./users.db', sqlite3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  }
  console.log('Connected to the SQLite database.');
}

let sql = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  avatar TEXT
);`;

db.run(sql, [], err => {
  //callback function after running the SQL command
  if (err) {
    console.error('Error creating the users database.');
    return;
  }
  console.log('Table Created or Table Already Exists.');
});

export { db };
