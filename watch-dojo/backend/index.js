// SQL stuff
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
  host:'34.71.145.75',
  port: 3306,
  user: 'root',
  password: 'watchdojo',
  database: 'watchdojo'
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


app.get("/api/get", (require, response) => {
    // const name = require.body.title;
    const sqlSelect = "SELECT * FROM Movie_TV LIMIT 1";
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});


app.listen(3002, () => {
    console.log("success");
})

