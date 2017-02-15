var inquirer = require('inquirer');
var index = require('./index.js');
var jsonfile = require('jsonfile');
var file = 'data.json'
var fs = require('fs');
var jsonfile = require('jsonfile');
var pull = require('./pull.js')

function MainMenue() {


	inquirer.prompt([{
		type: 'list',
		message: ` What you want to do?`,
		name: 'commands',
		choices: [
			new inquirer.Separator(' <---Choices---> '), {
				name: 'Add Index Card'
			}, {
				name: 'Create Index Card'
			}, {
				name: 'Play with 3 Index Cards'
			}, {
				name: 'Check all index Cards'
			}


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

				function aske(i, random) {
					console.log(`THIS IS  ${i}`)
					if (i > random.length) {

						return;
					}


					var question = [

						{
							type: 'input',
							name: 'in',
							message: `${random[i].front}`

						}



					];

					inquirer.prompt(question).then(function(answers) {


						if (answers.in.toLowerCase() === random[i].back.toLowerCase()) {

							console.log('GOOD')
						} else {

							console.log('BAAD')
						}



						i++
						aske(i, random)

					});

				}

				aske(i, random)



			})
		}

	})

}
MainMenue()