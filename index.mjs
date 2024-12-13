import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();

// =====================
// Express Session Setup
// =====================

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
  res.locals.user = req.session.userId;
  res.locals.name = req.session.name;
  console.log(res.locals.user);
  console.log(res.locals.name);
  next();
});

// =========================
// Database Connection Setup
// =========================

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

// ==========
//   Routes
// ==========

// --- Home Page ---
app.get("/", (req, res) => {
  console.log("Rendering to /index");
  res.render("index");
});

// --- Booking Page ---
app.get("/bookAnAppointment", (req, res) => {
  console.log("Rendering to /bookAnAppointment");
  res.render("bookAnAppointment");
});

// --- Login Page ---
// GET Route
app.get("/login", isAuthenticated("/profile"), (req, res) => {
  console.log("Rendering to /login");
  res.render("login");
});

// POST Route
app.post("/login", async (req, res) => {
  let username = req.body.email;
  let password = req.body.password;

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
    req.session.name = rows[0].name;

    // Waiting for the session data to be updated
    await req.session.save();

    console.log("Redirecting to /profile");
    res.redirect("profile");
  } else {
    console.log("Rendering to /login");
    res.render("login", { message: "Incorrect username or password." });
  }
});

// --- Sign Up Page ---
// GET Route
app.get("/signUp", isAuthenticated("/profile"), (req, res) => {
  console.log("Rendering to /signUp");
  res.render("signUp");
});

// POST Route
app.post("/signUp", async (req, res) => {
  const { email, password, name, phone, zip } = req.body; 

  if (!email || !password || !name || !phone || !zip) {
    return res.render("signUp", { message: "All fields are required."});
  }

  if (phone.length < 10 || phone.length > 10 || !/^\d+$/.test(phone)) {
    return res.render("signUp", { message: "Enter a valid phone number of 10 numbers without symbols."});
  }

  if (zip.length < 5 || zip.length > 5 || !/^\d+$/.test(zip)) {
    return res.render("signUp", { message: "Enter a valid zipcode of 5 numbers."});
  }

  const hashedPassword = await bcrypt.hash(password, 10); 

  const [existingUserRows] = await pool.execute('SELECT * FROM user WHERE email = ?', [email]);
  if (existingUserRows.length > 0) {
    return res.render("signUp", { message: "User with this email already exist"});
  }

  const [result] = await pool.execute(
    'INSERT INTO user (email, password, name, phone, zip) VALUES (?, ?, ?, ?, ?)', 
    [email, hashedPassword, name, phone, zip]
  );

  res.render("signUp", { message: "User created succesfully"});
});

// --- Profile Page ---
app.get("/profile", isNotAuthenticated("/login"), (req, res) => {
  console.log("Rendering to /profile");
  console.log(!req.session.authenticated);
  res.render("profile");
});

// --- Logout Route ---
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session: ", err);
      return res.status(500).send("An error occured while logging out.");
    }
    console.log("Redirecting to /");
    res.redirect("/");
  });
});

// --- Product Gallery Page ---
app.get("/productGallery", async (req, res) => {
  let sql = `SELECT *
          FROM product
          ORDER BY category, title`;
  const [rows] = await conn.query(sql);
  let sql2 = `SELECT DISTINCT category
              FROM product
              ORDER BY category`;
  const [rows2] = await conn.query(sql2);
  res.render("productGallery", { picGallery: rows, categories: rows2 });
});

// Web API for Product Gallery
app.get("/api/product/:id", async (req, res) => {
  let product_id = req.params.id;
  let sql = `SELECT *
             FROM product
             WHERE product_id = ?`;
  let [rows] = await conn.query(sql, [product_id]);
  res.send(rows);
});

// --- Custom Sets Page ---
// TODO - Update this route to use the current user's ID
app.get("/customSets", isNotAuthenticated("/login"), async (req, res) => {
  // let user_id = SESSION USER ID
  let sql = `SELECT *
    FROM custom_set
    ORDER BY name`;
  // let params = [user_id];
  const [rows] = await conn.query(sql);
  console.log("Rendering to /customSets");
  res.render("customSets", { sets: rows });
}); // View custom nail sets created by user

// --- New Custom Set Page ---
// GET Route
app.get("/customSets/new", isNotAuthenticated("/login"), (req, res) => {
  console.log("Rendering to /createCustomSet");
  res.render("createCustomSet");
}); // Create a custom nail set

// POST Route
app.post(
  "/customSets/new",
  isNotAuthenticated("/login"),
  async function (req, res) {
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
    console.log("Rendering to /createCustomSet");
    res.render("createCustomSet", { message: "Custom set added!" });
  }
); // Add customized set to user collection

// --- Edit Custom Set Page ---
// GET Route
app.get(
  "/customSets/edit",
  isNotAuthenticated("/login"),
  async function (req, res) {
    let set_id = req.query.setId;
    console.log("Set id = " + set_id);
    let sql = `SELECT * 
              FROM custom_set
              WHERE set_id =  ?`;
    let params = [set_id];
    const [rows] = await conn.query(sql, params);
    console.log("Rendering to /editCustomSet");
    res.render("editCustomSet", { set: rows });
  }
); // edit existing set

// POST Route
app.post(
  "/customSets/edit",
  isNotAuthenticated("/login"),
  async function (req, res) {
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
    console.log("Redirecting to /customSets");
    res.redirect("/customSets");
  }
); // update set info (based on edits) in database

// --- Delete Custom Set Page ---
app.get(
  "/customSets/delete",
  isNotAuthenticated("/login"),
  async function (req, res) {
    let set_id = req.query.setId;
    let sql = `DELETE
              FROM custom_set
              WHERE set_id = ?`;
    const [rows] = await conn.query(sql, [set_id]);

    console.log("Redirecting to /customSets");
    res.redirect("/customSets");
  }
); // delete custom set

app.listen(3000, () => {
  console.log("Express server running");
});

// =========
// Functions
// =========

// Used as a Middleware function to check if the user is signed in for certain routes
function isNotAuthenticated(redirectPath) {
  return (req, res, next) => {
    if (!req.session.authenticated) {
      console.log("Redirecting to ", redirectPath);
      res.redirect(redirectPath);
    } else {
      next();
    }
  };
}

function isAuthenticated(redirectPath) {
  return (req, res, next) => {
    if (req.session.authenticated) {
      console.log("Redirecting to ", redirectPath);
      res.redirect(redirectPath);
    } else {
      next();
    }
  };
}
