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

app.post("/api/create_list", (require, response) => {
    const new_list = require.body.new_list_name;
    const creater = require.body.list_creater;
    const sqlSelect = `INSERT INTO Watch_list(username, list_name) VALUES('${creater}','${new_list}')`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    })
})


app.get("/api/get_list", (require, response) => {
    const user = require.query.user_name;
    const sqlSelect = `SELECT list_id, list_name FROM Watch_list WHERE username = '${user}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.put("/api/update_list", (require, response) => {
    const list_id = require.body.ID
    const list_name = require.body.Name
    const user_name = require.body.User
    const sqlSelect = `UPDATE Watch_list SET list_name = '${list_name}' WHERE list_id = ${list_id} AND username = '${user_name}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.delete("/api/delete_list", (require, response) => {
    const list_id = require.query.list_ID
    const user_name = require.query.curr_user
    const sqlSelect = `DELETE FROM Watch_list WHERE list_id = ${list_id} AND username = '${user_name}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.get("/api/get_query1", (require, response) => {
    const sqlSelect = `SELECT first_name, last_name, COUNT(show_id) AS num_movie FROM Movie_TV NATURAL JOIN Casted_by NATURAL JOIN Cast WHERE year_released >= 2008 AND category = 'Movie' GROUP BY cast_id ORDER BY COUNT(show_id) DESC LIMIT 15`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.get("/api/get_query2", (require, response) => {
    const sqlSelect = `SELECT first_name, last_name, rating, COUNT(show_id) AS num_all FROM Movie_TV NATURAL JOIN Directed_by NATURAL JOIN Director d WHERE country = 'United States' GROUP BY rating, director_id ORDER BY COUNT(show_id) DESC LIMIT 15`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.listen(3002, () => {
    console.log("success");
})

