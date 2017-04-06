/* Scraping into DB (18.2.5)
 * ========================== */


/* Students: Using the tools and techniques you learned so far,
 * you will scrape a website of your choice, then place the data
 * in a MongoDB database. Be sure to make the database and collection
 * before running this exercise.

 * Consult the assignment files from earlier in class
 * if you need a refresher on Cheerio. */


// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// https://en.wikipedia.org/wiki/Peter_Pan
// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});


// Main route (simple Hello World Message)
app.get("/", function(req, res) {
    request('https://charlotte.craigslist.org/search/cta', function(error, response, html) {
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', html); // Print the HTML for the Google homepage. 

        res.send(html)

    });
});

app.get("/save", function(req, res) {
    var result = []
    request('http://localhost:3000/', function(error, response, html) {

        // console.log(html)
        var $ = cheerio.load(html);
        $('li.result-row').each(function(i, element) {
            // console.log(element)
            // ["0"].baseURI
            /* Cheerio's find method will "find" the first matching child element in a parent.
             *    We start at the current element, then "find" its first child a-tag.
             *    Then, we "find" the lone child img-tag in that a-tag.
             *    Then, .attr grabs the imgs src value.
             * So: <figure>  ->  <a>  ->  <img src="link">  ->  "link"  */
            var imgLink = $(element).find("a").attr("href");
            var data = $(element).find(".result-info").find('.hdrlnk').text();
            console.log(data)
            console.log(imgLink)
            var chunk = { "data": data, "link": imgLink }
            result.push(chunk)
            db.scrapedData.insert({ "data": data, "link": imgLink });

            // Push the image's URL (saved to the imgLink var) into the result array
            // result.push({ Link: imgLink });
        });
        res.json(result)
    });
});

// https://charlotte.craigslist.org/search/cta
/* TODO: make two more routes
 * -/-/-/-/-/-/-/-/-/-/-/-/- */

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)


// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?

/* -/-/-/-/-/-/-/-/-/-/-/-/- */


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});