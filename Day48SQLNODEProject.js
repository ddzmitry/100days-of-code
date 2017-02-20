var mysql = require('mysql');
// var pool  = mysql.createPool(...);
require('console.table');
var inquirer = require('inquirer');
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


var itemID = 4;
var currentDB = {}
connection.query("SELECT item_id , product_name,price, stock_quantity FROM products", function(err, res) {

	if (err) {

		console.log(err)
		return;
	}
	console.table(res)

	Choise(res)
});

var Choise = function(res) {
	_this = this
	inquirer.prompt({
		name: 'choice',
		type: 'list',
		message: 'What do you want to buy?',
		choices: function(_this) {
			var Picckarray = [];

			for (var i = 0; i < res.length; i++) {

				Picckarray.push(res[i].product_name);
			}

			return Picckarray;

		}

	}).then(function(answer) {

		console.log(answer.choice)
		var itemPicked = answer.choice

			inquirer.prompt({
		name: 'amount',
		type: 'input',
		message: `How many units of ${itemPicked} would you like to buy? `,
			}).then(function(answers) {

		console.log(answers.amount)

		var toBuy = parseInt(answers.amount);

		var FullDescription = function () {
				
			for (var i = 0; i < res.length; i++) {

				if (res[i].product_name === itemPicked) {

						var item = res[i];

						if (parseInt(item.stock_quantity) >=  toBuy) {

								item.stock_quantity = item.stock_quantity - toBuy;

										console.log(item.item_id)
				connection.query(`UPDATE products SET stock_quantity = ${item.stock_quantity} WHERE item_id = ${item.item_id};`, function(err, res){


								if (err) {
									throw err;
								}

								console.log('You made your purchase')
				})			



						} else {
							
							console.log('Insufficient quantity!')
							Choise(res)
						}


				}
			}
		}
					FullDescription()


					});


	});




}





// connection.query("SELECT * FROM products where item_id = ? " , [itemID] , function(err,res){

// 		if (err) {

// 			console.log(err)
// 			return;
// 		}		
// 	console.log(JSON.stringify(res,null,2) );


// } )

// connection.end(function() {
// 	console.log('Connection Closed')
// })

