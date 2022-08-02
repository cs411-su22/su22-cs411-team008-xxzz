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
        response.send(err);
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

app.get("/api/get_list_detail", (require, response) => {
    const listed_id = require.query.list_id;
    const sqlSelect = `SELECT show_id, title FROM Existed_in NATURAL JOIN Movie_TV WHERE listed_id = '${listed_id}'`;
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

//add movies to list
app.put("/api/add_movie_to_list", (require, response) => {
    const listed_id = require.body.ID
    const show_id = require.body.ShowID
    const sqlSelect = `INSERT INTO Existed_in VALUES (${listed_id},${show_id})`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

//delete movies from list
app.delete("/api/delete_movie_from_list", (require, response) => {
    const listed_id = require.query.ID
    const show_id = require.query.ShowID
    const sqlSelect = `DELETE FROM Existed_in WHERE listed_id = ${listed_id} AND show_id = ${show_id}`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.delete("/api/delete_list", (require, response) => {
    const list_id = require.query.list_ID
    const user_name = require.query.curr_user
    const sqlSelect = `DELETE FROM Watch_list WHERE list_id = '${list_id}' AND username = '${user_name}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.get("/api/get_query1", (require, response) => {
    const year = require.query.year
    const sqlSelect = `SELECT first_name, last_name, COUNT(show_id) AS num_movie FROM Movie_TV NATURAL JOIN Casted_by NATURAL JOIN Cast WHERE year_released < '${year}' AND category = 'Movie' GROUP BY cast_id ORDER BY COUNT(show_id) DESC LIMIT 15`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.get("/api/get_query2", (require, response) => {
    const director_name = require.query.name
    const sqlSelect = `SELECT first_name, last_name, rating, COUNT(show_id) AS num_all FROM Movie_TV NATURAL JOIN Directed_by NATURAL JOIN Director d WHERE country = 'United States' AND director_id LIKE REPLACE(lower('%${director_name}%'), ' ', '') GROUP BY rating, director_id ORDER BY COUNT(show_id) DESC`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});


// Review Table Operation Start
app.get("/api/get_review_table", (require, response) => {
    const user = require.query.user_name;
    const sqlSelect = `SELECT show_id, reviews FROM Review WHERE username = '${user}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.post("/api/create_review", (require, response) => {
    const show_id = require.body.review_show_id;
    const content = require.body.review_content;
    const creater = require.body.review_creater;
    const sqlSelect = `INSERT INTO Review(username, show_id, reviews) VALUES('${creater}','${show_id}','${content}')`;
    // console.log(response);
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.put("/api/update_review", (require, response) => {
    const show_id = require.body.show_id;
    const content = require.body.new_content;
    const user_name = require.body.user;
    const sqlSelect = `UPDATE Review SET reviews = '${content}' WHERE show_id = '${show_id}' AND username = '${user_name}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.delete("/api/delete_review", (require, response) => {
    const show_id = require.query.review_show_id;
    const user_name = require.query.curr_user;
    const sqlSelect = `DELETE FROM Review WHERE show_id = '${show_id}' AND username = '${user_name}'`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});
// Review Table Operation End

// Stored Procedure 
app.get("/api/get_stored_procedure", (require, response) => {
    // const user = require.query.user_name;
    const sqlSelect = `call watchdojo.count_rating()`;
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        response.send(result);
    });
});

app.listen(3002, () => {
    console.log("success");
})

