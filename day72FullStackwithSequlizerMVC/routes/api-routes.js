// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the todos
    app.get("/api/todos", function(req, res) {
        // Write code here to retrieve all of the todos from the database and res.json them
        // back to the user
        // db.Todo.
        // console.log(req.body)
        db.Todo.findAll({}).then(function(todos) {
            console.log(todos);
            // console.log(users.Instance.dataValues);
            res.json(todos)

        })

    });

    // POST route for saving a new todo. We can create todo with the data in req.body
    app.post("/api/todos", function(req, res) {
        // Write code here to create a new todo and save it to the database
        // and then res.json back the new todo to the user
        console.log(req.body)
        db.Todo.upsert({
            text: req.body.text,
            complete: req.body.complete
        }).then(function(todo) {

            res.json(todo)
        });


    });

    // DELETE route for deleting todos. We can get the id of the todo to be deleted from
    // req.params.id
    app.delete("/api/todos/:id", function(req, res) {
        console.log(req.params.id)

        db.Todo.destroy({ where: { id: req.params.id } }).then(function(todo) {
            console.log("I was destroyed")

            res.json(todo)
        })


    });

    // PUT route for updating todos. We can get the updated todo data from req.body
    app.put("/api/todos", function(req, res) {

        console.log(req.body)


        db.Todo.update({
            text: req.body.text,
            complete: req.body.complete


        }, {
            where: { id: req.body.id }
        }).then(function(todo) {
            // now you see me...
            res.json(todo)
            console.log('I am Peter lalaalalla')
        })






    });
};