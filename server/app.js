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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
