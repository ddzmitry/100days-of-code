var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
var port = 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "my_wishes_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);

});

// Root get route
app.get("/", function(req, res) {

    connection.query("SELECT * FROM wishes;", function(err, data) {
        if (err) throw err;

        for (strips in data) {
            console.log(data[strips])
        }
        res.render("index", { events: data });

    });
});


// Post route -> back to home
app.post("/", function(req, res) {

    // Test it
    // console.log('You sent, ' + req.body.event);

    // Test it
    // res.send('You sent, ' + req.body.event);

    connection.query("INSERT INTO wishes (event) VALUES (?)", [req.body.event], function(err, result) {
        if (err) throw err;

        res.redirect("/");
    });

});

app.delete("/:id", function(req, res) {
    console.log(req.params.id)
    console.log('Hello');

    connection.query("DELETE FROM wishes WHERE id=?", [req.body.id], function(err, result) {
        if (err) throw err;

        res.redirect("/");
    });

});
app.put("/", function(req, res) {
    // SQL > UPDATE CUSTOMERS
    // SET ADDRESS = 'Pune'
    // WHERE ID = 6;
    console.log(req.body.id);
    console.log(req.body.text);
    connection.query(`UPDATE wishes SET event ='${req.body.text}' WHERE id = '${req.body.id}'`, function(err, result) {
        if (err) throw err;

        res.redirect("/");
    });

});
app.listen(port);