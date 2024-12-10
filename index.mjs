import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//for Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

// For Express-Session
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//setting up database connection pool
const pool = mysql.createPool({
  host: "walid-elgammal.online",
  user: "walidelg_seikaUser1",
  password: "Cst-336",
  database: "walidelg_seika_website",
  connectionLimit: 10,
  waitForConnections: true,
});
const conn = await pool.getConnection();

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/loginSignup", (req, res) => {
  res.render("loginSignup");
});

app.post("/loginSignup", async (req, res) => {
  let username = req.body.email;
  let password = req.body.password;

  console.log(username);
  console.log(password);

  let passwordHash = "";

  let sql = `SELECT * 
              FROM admin
              WHERE email = ?`;

  const [rows] = await conn.query(sql, [username]);

  console.log(rows);

  if (rows.length > 0) {
    passwordHash = rows[0].password;
  }

  const passwordMatch = await bcrypt.compare(password, passwordHash);

  console.log(passwordMatch);

  if (passwordMatch) {
    req.session.authenticated = true;
    res.render("landingPage");
  } else {
    res.redirect("/");
  }
});

app.get("landingPage", (req, res) => {
  if (req.session.authenticated) {
    res.render("landingPage.ejs");
  } else {
    res.redirect("/");
  }
});

app.get("/dbTest", async (req, res) => {
  let sql = `SELECT *
                FROM product`;
  const [rows] = await conn.query(sql);
  res.send(rows);
}); //dbTest

app.listen(3000, () => {
  console.log("Express server running");
});
