// SQL stuff
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
  host:'34.71.145.75',
  user: 'root',
  password: 'watchdojo',
  database: 'watchdojo'
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


app.get("/api/get", (require, response) => {
    const name = require.query.show_title;
    console.log(require);
    const sqlSelect = `SELECT * FROM Movie_TV WHERE REPLACE(lower(title), ' ', '') LIKE REPLACE(lower('%${name}%'), ' ', '')`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});


app.listen(3002, () => {
    console.log("success");
})

