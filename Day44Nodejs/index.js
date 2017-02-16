var jsonfile = require('jsonfile')
var file = 'data.json'
var obj = {}
var fs = require('fs')

//constructor for each Index Card that returns JSON and adds it to data.JSON
function basicCard(front, back) {
	this.front = front,
	this.back = back,
	this.createJSON = function() {

		var card = {

			front: front,
			back: back,
			type: 'BasicCard'
		};


		pushtoTxt(card)
	};
	this.pushtoTxt = function(card) {
		fs.readFile('data.json', 'utf8', function readFileCallback(err, data) {
			if (err) {
				console.log(err);
			} else {
				obj = JSON.parse(data); //we Parsing JSON to be able acces the array in CARDS
				obj.cards.push(card); //add our card Data to the CARDS array as an object CARD
				json = JSON.stringify(obj, null, 4); //CONVERT BACK TO JSON
				fs.writeFile('data.json', json, 'utf8'); // REWRITE ADDITIONAL
			}


		});


	}
	

}

module.exports = {
	basicCard

}

basicCard()
