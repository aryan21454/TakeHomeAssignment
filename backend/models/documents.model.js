import db from "../config/db.js";

export const insertDocument = (doc) => {
  const { filename, filepath, filesize } = doc;

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO documents (filename, filepath, filesize) VALUES (?, ?, ?)`,
      [filename, filepath, filesize],
      function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID, ...doc });
      }
    );
  });
};

export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM documents ORDER BY id DESC", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

export const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM documents WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM documents WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      resolve(true);
    });
  });
};
