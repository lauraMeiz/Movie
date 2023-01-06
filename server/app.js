const express = require("express");
const app = express();
const port = 3005;
const cors = require("cors");
app.use(cors());
md5 = require("js-md5");
const uuid = require("uuid");

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

const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf("/admin")) {
    const sql = `
        SELECT
        name
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
app.use(doAuth);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/admin/hello", (req, res) => {
  res.send("Hello Admin!");
});

app.get("/login-check", (req, res) => {
  const sql = `
    SELECT
    name
    FROM users
    WHERE session = ?
    `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error" });
    } else {
      res.send({ msg: "ok" });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

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

app.get("/admin/movies-manager", (req, res) => {
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
         (title, date, description, photo)
         VALUES (?, ?, ?, ?)
      `;

  con.query(
    sql,
    [req.body.title, req.body.date, req.body.description, req.body.photo],
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
          SET title = ?, date = ?, description = ?, photo = ?
          WHERE id = ?
      `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.date,
      req.body.description,
      req.body.photo,
      req.params.id,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});
app.get("/movies-list-sorted/", (req, res) => {
  let sql;
  if (req.query.by == "title" && req.query.dir == "asc") {
    sql = `
        SELECT   *  FROM movies ORDER BY title ASC
    `;
  } else if (req.query.by == "title" && req.query.dir == "desc") {
    sql = `
        SELECT   *  FROM movies ORDER BY title DESC
    `;
  } else if (req.query.by == "date" && req.query.dir == "asc") {
    sql = `
        SELECT   *  FROM movies ORDER BY date ASC
    `;
  } else {
    sql = `
        SELECT   *  FROM movies ORDER BY date DESC
    `;
  }

  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
    console.log(results);
  });
});

app.get("/movies-list-search", (req, res) => {
  const sql = `
        SELECT
        *
        FROM movies
        WHERE title LIKE '%${req.query.s}%'
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
