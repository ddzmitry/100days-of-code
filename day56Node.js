// Home
// Favorite Food
// Favorite Movies
// Favorite CSS Frameworks
var url = require("url");
var fs = require("fs");
var http = require("http");

var PORT = 7000;



var server = http.createServer(handleRequest);

server.listen(PORT, function() {
	// Callback triggered when server is successfully listening. Hurray!
	console.log("Server listening on: http://localhost:%s", PORT);
});

// We need a function which handles requests and send response
function handleRequest(req, res) {

	// Capturing the url the request is made to.x
	var urlParts = url.parse(req.url);

	// When we visit different urls, the switch statement call on different functions.
	switch (urlParts.pathname) {
		case "/":


			fs.readFile("home.html", function(err, data) {

				// We then respond to the client with the HTML page by specifically telling the browser that we are delivering
				// an html file.
				res.writeHead(200, {
					"Content-Type": "text/html"
				});
				res.end(data);
			});
			break;
		case "/food":

			fs.readFile("food.html", function(err, data) {

				// We then respond to the client with the HTML page by specifically telling the browser that we are delivering
				// an html file.
				res.writeHead(200, {
					"Content-Type": "text/html"
				});
				res.end(data);
			});


			break;
		case "/movies":
			fs.readFile("movies.html", function(err, data) {

				// We then respond to the client with the HTML page by specifically telling the browser that we are delivering
				// an html file.
				res.writeHead(200, {
					"Content-Type": "text/html"
				});
				res.end(data);
			});
			break;
		case "/css":
			fs.readFile("css.html", function(err, data) {

				// We then respond to the client with the HTML page by specifically telling the browser that we are delivering
				// an html file.
				res.writeHead(200, {
					"Content-Type": "text/html"
				});
				res.end(data);
			});
			break;
		default:
			// display404(urlParts.pathname, req, res);
	}
}