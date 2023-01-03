const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
app.use(cors());

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie",
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/movies-manager/all", (req, res) => {
  const sql = `
          SELECT
          *
          FROM movies
      `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/movies-manager", (req, res) => {
  const sql = `					
    SELECT						
    *						
    FROM movies					
    `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/movies-manager", (req, res) => {
  const sql = `
         INSERT INTO movies 
         (title, date, description)
         VALUES (?, ?, ?)
      `;

  con.query(
    sql,
    [req.body.title, req.body.date, req.body.description],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
      console.log(results);
    }
  );
});

app.delete("/movies-manager/:id", (req, res) => {
  const sql = `
          DELETE FROM movies
          WHERE id = ?
          `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.put("/movies-manager/:id", (req, res) => {
  const sql = `
          UPDATE movies
          SET title = ?, date = ?, description = ?
          WHERE id = ?
      `;
  con.query(
    sql,
    [req.body.title, req.body.date, req.body.description, req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
