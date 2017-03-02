var express = require('express')
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");
var HTMLRouts = require (path.join(__dirname, 'app/routing/htmlRoutes.js'))
var apiRouts = require (path.join(__dirname, 'app/routing/apiRoutes.js'))

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}))


//allowing stacitc folder for usage
app.use("/static/", express.static(path.join(__dirname, "app/public")));
HTMLRouts(app)
apiRouts(app)


app.all('*', function(req, res) {
  res.redirect("http://localhost:3000/");
});


app.listen(3000)


