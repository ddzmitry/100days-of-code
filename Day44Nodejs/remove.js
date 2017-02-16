var file = 'data.json'
var fs = require('fs');
var colors = require('colors');
var jsonfile = require('jsonfile');
var updated = {
	cards: []
}

function RemoveFromJSON(i) {

	var pick = i - 1


	jsonfile.readFile(file, function(err, obj) {
		if (pick > obj.cards.length) {

			console.log(colors.red('Number is too BIG'))
		} else {



			obj.cards.forEach(function(element, index) {

				if (pick !== index) {

					updated.cards.push(element)
				}


			});

			// console.log(updated)

			jsonfile.writeFile(file, updated, {
				spaces: 2
			}, function(err) {
				// console.error(err)
			})
		}



	})

}

module.exports = {
	RemoveFromJSON
}