// SQL stuff
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");


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
    const sqlSelect = `SELECT * FROM Movie_TV WHERE REPLACE(lower(title), ' ', '') LIKE REPLACE(lower('%${name}%'), ' ', '')`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.post("/api/create_user", (require, response) => {
    const new_user = require.body.new_user_name;
    const new_password = require.body.new_password;
    const sqlSelect = `INSERT INTO Login VALUES('${new_user}','${new_password}')`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.get("/api/login", (require, response) => {
    const user = require.query.user_name;
    const password = require.query.password;
    const sqlSelect = `SELECT * FROM Login WHERE username = '${user}' AND password = '${password}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.post("/api/list", (require, response) => {
    const new_list = require.body.new_list_name;
    const creater = require.body.list_creater;
    const sqlSelect = `INSERT INTO Watch_list(username, list_name) VALUES('${creater}','${new_list}')`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    })
})

app.listen(3002, () => {
    console.log("success");
})

