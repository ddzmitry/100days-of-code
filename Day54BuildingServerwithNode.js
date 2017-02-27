var http = require('http');
var url = require('url')
var fs = require('fs')


var PORT = 8081;
var count = 0
function HandlERequest (request,response) {
		// count++
		// response.end("It works! Path Hit: " + request.url)
		
		var urlParts = url.parse(request.url);
		console.log(urlParts)

			switch (urlParts.pathname) {
				case '/':
					displayRoot(urlParts.pathname,response,request)
					break;
					case '/stuff':
					displayStuff(urlParts.pathname,response,request)
					break;
				default:
					// statements_def
					break;
			}
}

	var displayRoot = function (url,res,req) {
				 	
			var HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Ola</title></head><body><h1>HELLO WORLD</h1>
			<a href="/stuff"> Stuff</a></body></html>`	
			res.writeHead(200,{"Content-Type": "text/html"});

			res.end(HTML)

	};

	var displayStuff = function (url,res,req){
						var HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Ola</title></head><body><h1>HELLO STUFF</h1>
			<a href="/"> Home</a></body></html>`	
			res.writeHead(200,{"Content-Type": "text/html"});

			res.end(HTML)

	}
var server = http.createServer(HandlERequest)

server.listen(PORT,function () {
	
	console.log('Servert listerning on %s',PORT)
})