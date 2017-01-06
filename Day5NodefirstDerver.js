var http = require("http");

var server = http.createServer(function(req, res) {

	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.end(`

		<!DOCTYPE html>
		<html lang="en">
		<head>
		<meta charset="UTF-8" />

		<title>First Node Server</title></head>
		<body>
						<h1> Hey There! 
											<ul>
								Day 5 Learning how to create Web Servers with node js
								<li>1.Trying GET better at programming!</li>
								<li>2.Learning New Every Day! </li>
								<li>3.Try my best!</li>
								<li>4.Hello WorldS!</li>
								<li>5.Using NODEMON is pretty handy! </li>
								</ul>
						</h1>

		</body>


		</html>





		`);
});

server.listen(3000);

console.log("Server listening on port 3000");