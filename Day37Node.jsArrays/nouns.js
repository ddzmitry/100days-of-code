// Apples, oranges, painting, pear, coding, apples,
// oranges,pear , shoes, stories, box, box, stories, shoes

const fs = require('fs');
var finalArr = []
fs.readFile("nouns.txt", "utf8", function(error, data) {

	console.log(data)
	var dataArr = data.split("\r\n");
	// console.log(dataArr.toString())
	dataArr = dataArr.toString().split(',')
		// console.log(dataArr);

	var newArr = [];

	dataArr.forEach(function(element, index) {
		var element = element.trim()
			// console.log(element)
		if (!element.includes('ing')) {

			// console.log(element)

			newArr.push(element)



		}



	});
	// console.log(newArr)

	var properArr = newArr.sort()
		// var finalArr = []
	var a = 'a'
	var the = 'the'

	properArr.forEach(function(element, index) {
		var some = index++
			if (properArr[index] === properArr[some]) {

				finalArr.push(a + ' ' + properArr[index])
				finalArr.push(the + ' ' + properArr[some])
					// console.log('match')
			}
			// console.log(index)
			// console.log(some)
	});
	console.log(finalArr)
	fs.writeFile("fixedText1.txt", finalArr, function() {})



})