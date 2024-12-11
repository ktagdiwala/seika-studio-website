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

// Making the userId available to all views without passing it in each route
app.use((req, res, next) => {
  res.locals.user = req.session.userId ? { id: req.session.userId } : null;
  next();
});

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

app.get("/bookAnAppointment", (req, res) => {
  res.render("bookAnAppointment");
});

app.get("/signUp", (req, res) => {
  res.render("signUp");
});

app.get("/productGallery", async (req, res) => {
  let sql = `SELECT *
          FROM product
          ORDER BY category`;
const [rows] = await conn.query(sql);
res.render("productGallery", {"picGallery" : rows});
});

app.get("/customSets", isAuthenticated, async (req, res) => {
    // let user_id = SESSION USER ID
    let sql = `SELECT *
    FROM custom_set
    ORDER BY name`;
    // let params = [user_id];
    const [rows] = await conn.query(sql);
    res.render("customSets", { sets: rows });
}); // View custom nail sets created by user

app.get("/customSets/new",isAuthenticated, (req, res)=>{
  if (req.session.authenticated) {
    res.render("createCustomSet");
  } else {
    res.redirect("/loginSignup");
  }
});// Create a custom nail set

app.post("/customSets/new", isAuthenticated, async function (req, res) {
  let user_id = req.body.user_id;
  let type = req.body.q1;
  let size = req.body.q2;
  let length = req.body.q3;
  let description = req.body.q4;
  let name = req.body.q5;
  let sql = `INSERT INTO custom_set
             (user_id, name, type, size, length, description)
              VALUES (?, ?, ?, ?, ?, ?)`;
  let params = [user_id, name, type, size, length, description];
  const [rows] = await conn.query(sql, params);
  res.render("createCustomSet", { message: "Custom set added!" });
}); // Add customized set to user collection

app.get("/customSets/edit", isAuthenticated, async function (req, res) {
  let set_id = req.query.setId;
  console.log("Set id = " + set_id);
  let sql = `SELECT * 
              FROM custom_set
              WHERE set_id =  ?`;
  let params = [set_id];
  const [rows] = await conn.query(sql, params);
  res.render("editCustomSet", { set: rows });
}); // edit existing set

app.post("/customSets/edit", isAuthenticated, async function (req, res) {
  let set_id = req.body.set_id;
  let type = req.body.q1;
  let size = req.body.q2;
  let length = req.body.q3;
  let description = req.body.q4;
  let name = req.body.q5;
  let sql = `UPDATE custom_set
            SET name = ?,
            type = ?,
            size = ?,
            length = ?,
            description = ?
            WHERE set_id = ?`;
  let params = [name, type, size, length, description, set_id];
  const [rows] = await conn.query(sql, params);
  res.redirect("/customSets");
}); // update set info (based on edits) in database

app.get("/customSets/delete", isAuthenticated, async function (req, res) {
  let set_id = req.query.setId;
  let sql = `DELETE
              FROM custom_set
              WHERE set_id = ?`;
  const [rows] = await conn.query(sql, [set_id]);

  res.redirect("/customSets");
}); // delete custom set

app.get("/loginSignup", (req, res) => {
  if (req.session.userId) {
    res.redirect("index");
  } else {
    res.render("loginSignup");
  }
});

app.get("/signUp", (req, res) => {
  if (req.session.userId) {
    res.redirect("signUp");
  } else {
    res.render("loginSignup");
  }
});

// TODO: Seprate Login and Signup functionality -> app.post for /login and /signUp as signUp requires more fields
app.post("/loginSignup", async (req, res) => {
  let username = req.body.email;
  let password = req.body.password;

  console.log(username);
  console.log(password);

  let passwordHash = "";

  let sql = `SELECT * 
              FROM user
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
    req.session.userId = rows[0].user_id;
    res.render("index");
  } else {
    res.render("loginSignup", {"message": "Incorrect username or password."});
  }
});

// app.post("/signUp", async (req, res) => {
//   let username = req.body.email;
//   let password = req.body.password;

//   console.log(username);
//   console.log(password);

//   let passwordHash = "";

//   let sql = `SELECT * 
//               FROM user
//               WHERE email = ?`;

//   const [rows] = await conn.query(sql, [username]);

//   console.log(rows);

//   if (rows.length > 0) {
//     passwordHash = rows[0].password;
//   }

//   const passwordMatch = await bcrypt.compare(password, passwordHash);

//   console.log(passwordMatch);

//   if (passwordMatch) {
//     req.session.authenticated = true;
//     req.session.userId = rows[0].user_id;
//     res.render("index");
//   } else {
//     res.render("loginSignup", {"message": "Incorrect username or password."});
//   }
// });

// Simple logout route
app.get("/logout", isAuthenticated, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// "Langing Page" which is meant to be a Profile page. Thinking about changing this to "/profile" to make it more clear.
// This route only works if you are signed in
app.get("/landingPage", isAuthenticated, (req, res) => {
  if (req.session.authenticated) {
    res.render("landingPage");
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

// Functions

// Used as a Middleware function to check if the user is signed in for certain routes
function isAuthenticated(req, res, next) {
  if (!req.session.authenticated) {
    res.redirect("/loginSignup");
  } else {
    next();
  }
}
