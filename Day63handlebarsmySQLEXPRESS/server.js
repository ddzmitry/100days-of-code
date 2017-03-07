// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');

// Create an instance of the express app.
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}))
// Specify the port.
var port = 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Data
var icecreams = [

  {
    flavor: "Vanilla",
    price: 5.99,
    coolnest: 10
  }, {
    flavor: "Peach",
    price: 5.99,
    coolnest: 10
  }, {
    flavor: "Strawberry",
    price: 5.99,
    coolnest: 10
  }, {
    flavor: "Pear",
    price: 5.99,
    coolnest: 10
  }
];

// Routes

app.post("/", function(req, res) {

  console.log(req.body)
  var ice = req.body
  icecreams.push(ice)
  

 
});

app.get("/icecreams", function(req, res) {


      var dataToSend = {icecreams:icecreams,
                        title:'Create SomethingCool'
                      }
       res.render("allice", dataToSend);

 
});

app.get("/icecream/:name", function(req, res) {

  console.log(req.params.name)

  for (var i = 0; i < icecreams.length; i++) {

    if (icecreams[i].flavor == req.params.name) {
      console.log(icecreams[i])
      res.render('index',icecreams[i])
    } else {

    }
    
  }

});

// app.get("/weekend", function(req, res) {
//   res.render("index", lunches[1]);
// });

// app.get("/lunches", function(req, res) {
//   res.render("all-lunches", {
//     foods: lunches,
//     eater: "david"
//   });
// });

// Initiate the listener.
app.listen(port);