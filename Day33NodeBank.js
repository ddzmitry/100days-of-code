var accounts = [];

function account(name, balance, savings) {
	this.name = name;
	this.balance = balance;
	this.savings = savings;
	this.total = balance + savings;

	accounts.push({
		name,
		balance,
		savings,
		total
	})
}

function newAccount(name, balance, savings) {

	if ((typeof balance === 'number' && typeof balance === 'number')) {

		return account(name, balance, savings)
	} else {

		console.log("Wrong input")

	}


}


function findAccount(user) {

	function lookingForUser() {

		lookingForArray = []


		accounts.filter(function(index, n) {

			if (index.name === user) {
				console.log("Found " + user)
				console.log(index)
				console.log("________________")



				lookingForArray.push(n)

			} else if (n === accounts.length - 1 && lookingForArray == []) {


				console.log("User Was not found")

			} else {
				n++
				var progress = (n * 100) / accounts.length - 1

				console.log('Progress at ' + progress + "%")
			}
		});

		return

	}

	return lookingForUser()
}



function Deposit(name, money) {

	findAccount(name)

	indexForAccount = lookingForArray[0]
	accounts[indexForAccount].balance = accounts[indexForAccount].balance + money
}


function Withdraw(name, money) {

	findAccount(name)

	indexForAccount = lookingForArray[0]
	accounts[indexForAccount].balance = accounts[indexForAccount].balance - money
}

function CheckBalance(name) {

	findAccount(name)

	indexForAccount = lookingForArray[0]
	console.log(`The Balance of ${name} is ${accounts[indexForAccount].balance} `)
}

newAccount('Sam', 1500, 2400)
newAccount('Dzmitry', 500, 5500)
newAccount('Lee', 1500, 2060)
newAccount('Toureg', 200, 2500)
newAccount('Eight', 1500, 2030)
newAccount('Peter', 20, 150)
newAccount('Sam', 1500, 2400)
newAccount('Fine', 1500, 2400)
newAccount('Jasmin', 1500, 2000)
newAccount('Ralli', 1500, 2400)
newAccount('Jon', 1500, 2000)

Deposit('Dzmitry', 100)
Withdraw('Fine', 1500)
CheckBalance('Jon')


console.log(accounts)