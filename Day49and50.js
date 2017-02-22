var mysql = require('mysql');
require('console.table');
var inquirer = require('inquirer');
var fs = require('fs');
var jsonfile = require('jsonfile');
var file = 'transactionlog.json';
var chalk = require('chalk');

//Found this function! RESUCE IS AMAZING!
function getTotalCounts(obj) {
	return obj.reduce(function(result, item) {
		var index = (item.DEPARTMENT < 10 ? '0' : '') + item.DEPARTMENT;
		result[index] = (result[index] || 0) + item.TOTAL_PROFIT;
		return result;
	}, {});
}


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Kainer2305!',
	database: 'bamazone',
	port: 3306
});


connection.connect(function(err) {

	console.log('Connected as id:' + connection.threadId)
});



var SUPERVISOR = function() {

	inquirer.prompt({
		type: 'list',
		name: 'choice',
		message: 'What would you like to do?',
		choices: [
			'View Product Sales by Department',
			'Create New Department',
			'Exit'
		]

	}).then(function(answer) {
		var Total;
		if (answer.choice === 'View Product Sales by Department') {
			// CLEAN TABLE BEFORE 
			connection.query(`TRUNCATE TABLE departments;`,
				function(err, res) {

					if (err) {

						console.log(err)
						return;
					}
					// console.table(res)
					// MANAGER()
				});

			jsonfile.readFile(file, function(err, obj) {

				Total = getTotalCounts(obj.transactions);
				// console.table(Total)


				connection.query(`INSERT INTO departments (department_name)
SELECT DISTINCT department_name FROM products;`,
					function(err, res) {

						if (err) {

							console.log(err)
							return;
						}
						jsonfile.readFile(file, function(err, obj) {


							// console.log(obj.transactions)
							var DataObje = obj.transactions
							var Filter = DataObje.reduce(function(obj, item) {


								if (!obj[item.DEPARTMENT]) {

									obj[item.DEPARTMENT] = parseInt(item.TOTAL_PROFIT)

								}

								obj[item.DEPARTMENT] += parseInt(item.TOTAL_PROFIT)
								return obj
							}, {})

							// console.table(Filter)
							Total = Filter
						})

						connection.query(`SELECT * FROM departments;`,
							function(err, res) {

								if (err) {

									console.log(err)
									return;
								}
								var invent = JSON.stringify(res)
								invent = JSON.parse(invent)
								var arrt = []
								invent.forEach(function(element, index) {
									id = element.department_id
									key = element.department_name;
									var dummyNode = Math.floor(Math.random() * 100000)
									var companyCost = element.over_head_costs
									companyCost = dummyNode
									value = parseFloat(Total[element.department_name])
									var stuff = {

										Department_ID: id,
										department: key,
										over_head_costs: companyCost,
										product_sales: Math.round(value, -2),
										total_profit: companyCost - value

									}
									arrt.push(stuff)
									return arrt
								});

								console.table(arrt)
								SUPERVISOR()
							});


					});
			});



		} else if(answer.choice === 'Create New Department' ) {

			inquirer.prompt({

				type: 'input',
				name: 'department',
				message: 'What department would you like to add?'

			}).then(function(answer) {

					
				connection.query(`INSERT INTO departments (department_name) VALUES ('${answer.department}');`,
					function(err, res) {

						if (err) {

							console.log(err)
							return;
						}
						console.log(chalk.green(`Department ${answer.department} was added! `));
						SUPERVISOR()
					});



			});

		}

		else {

			process.exit()
		}
	})
}

SUPERVISOR()