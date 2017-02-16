var inquirer = require('inquirer');
var index = require('./index.js');
var jsonfile = require('jsonfile');
var file = 'data.json'
var fs = require('fs');
var colors = require('colors');
var jsonfile = require('jsonfile');
var pull = require('./pull.js')
var remove = require('./remove.js')

function MainMenue() {


	inquirer.prompt([{
		type: 'list',
		message: ` What you want to do?`,
		name: 'commands',
		choices: [
			new inquirer.Separator(' <---Choices---> '), {
				name: 'Add Index Card'
			}, {
				name: 'Play with 3 Index Cards'
			}, {
				name: 'Check all index Cards'
			}, {
				name: 'Remove the card!'
			}, {
				name: 'Exit'
			},



		],



	}]).then(function(answers) {

		var command = answers.commands;
		if (command === 'Add Index Card') {

			var questions = [


				{
					type: 'input',
					name: 'front_name',
					message: 'What is front of your card?'
				}, {
					type: 'input',
					name: 'back_name',
					message: 'What is back of your card?'
				}

			];

			inquirer.prompt(questions).then(function(answers) {

				var front = answers.front_name.toString();
				var back = answers.back_name.toString();


				var phrase = new index.basicCard(front, back)
				phrase.createJSON()
				console.log('Card Was Added')
				setTimeout(MainMenue, 2000)
			});



		}
		if (command === 'Check all index Cards') {
			pull.LookUpdates()
			setTimeout(MainMenue, 2000)
		}

		if (command === 'Play with 3 Index Cards') {

			jsonfile.readFile(file, function(err, obj) {

				var random = obj.cards.sort(function(stuff) {
					return .5 - Math.random();
				})
				random = random.slice(0, 3)
					// console.log(random)


				var i = 0;
				var cor = 0;
				var incorr = 0;

				function aske(i, random) {
					


					if (i === 3) {
						console.log(colors.green(`Correct: ${cor}`))
						console.log(colors.red(`Incorrect: ${incorr}`))
						setTimeout(MainMenue, 1000)

					}
					else {
					console.log(colors.magenta(`Card:${i+1}`))	
					var question = [

						{
							type: 'input',
							name: 'in',
							message: `${random[i].front}`

						}



					];

					inquirer.prompt(question).then(function(answers) {


						if (answers.in.toLowerCase() === random[i].back.toLowerCase()) {
							cor++
							console.log(colors.green.underline('Correct'))
						} else {
							incorr++
							console.log(colors.red.underline('Incorrect'))
							console.log(colors.yellow(`Correct answer is: ${random[i].back}`))
							
						}



						i++
						aske(i, random)

					});
						}
				}

				aske(i, random)



			})
		}
		if (command === 'Remove the card!') {
			pull.LookUpdates()
			
				var question = [


				{
					type: 'input',
					name: 'cardTodelete',
					message: 'What Number of the card you would like to delete?'
				}
				]

				function WhatToDelet(){

					inquirer.prompt(question).then(function(answers) {
										if (isNaN(answers.cardTodelete)) {

												console.log(colors.red('You have to enter the number'))
												setTimeout(WhatToDelet, 1500)
										} else {
											var i = answers.cardTodelete
											remove.RemoveFromJSON(i)
											setTimeout(MainMenue,1500)
										}
								
							
	
				})

				} 

				setTimeout(WhatToDelet,2000)
		}

			if (command === 'Exit') {
				console.log(colors.random("SEE YOU LATER!"))
				
				process.exit()
			}
	})

}
MainMenue()