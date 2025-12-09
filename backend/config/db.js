import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./documents.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      filepath TEXT,
      filesize INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;
