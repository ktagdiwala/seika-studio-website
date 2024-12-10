import express from "express";
import mysql from "mysql2/promise";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

//for Express to get values using POST method
app.use(express.urlencoded({ extended: true }));

//setting up database connection pool
const pool = mysql.createPool({
    host: "walid-elgammal.online",
    user: "walidelg_seikaUser1",
    password: "Cst-336",
    database: "walidelg_seika_website",
    connectionLimit: 10,
    waitForConnections: true
});
const conn = await pool.getConnection();

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/customSets", async (req, res)=>{
  let sql = `SELECT *
            FROM custom_set
            ORDER BY name`;
  const [rows] = await conn.query(sql);
  res.render("customSets", {"sets":rows});
});// View custom nail sets created by user

app.get("/customSets/new", (req, res)=>{
  res.render("createCustomSet");
});// Create a custom nail set

app.post("/customSets/new", async function(req, res){
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
  res.render("createCustomSet", 
             {"message": "Custom set added!"});
});// Add customized set to user collection

app.get("/customSets/edit", async function(req, res){
  let set_id = req.query.setId;
  console.log("Set id = " + set_id);
  let sql = `SELECT * 
              FROM custom_set
              WHERE set_id =  ?`;
  let params = [set_id];
  const [rows] = await conn.query(sql, params);
  res.render("editCustomSet", {"set":rows});
});// edit existing set

app.post("/customSets/edit", async function(req, res){
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
  const [rows] = await conn.query(sql,params);
  res.redirect("/customSets");
});// update set info (based on edits) in database

app.get("/customSets/delete", async function(req, res){
  let set_id = req.query.setId;
  let sql = `DELETE
              FROM custom_set
              WHERE set_id = ?`;
  const [rows] = await conn.query(sql, [set_id]);

  res.redirect("/customSets");
});// delete custom set

app.get("/dbTest", async(req, res) => {
    let sql = `SELECT *
                FROM product`;
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3000, () => {
  console.log("Express server running");
});
