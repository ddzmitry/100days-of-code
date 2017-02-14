var team = [];
var subTeam = []
var score = 0

function Player(name, position, offense, defense) {
	var names = ['Jhonny', 'BaxBunny', 'BeautyFly', 'Node.js', 'javaScript','someFun']
	var postion = ['offence', 'deffence']

	this.name = names[Math.floor(Math.random() * names.length)];
	this.position = postion[Math.floor(Math.random() * postion.length)];
	this.offense = Math.floor(Math.random() * 11);
	this.defense = Math.floor(Math.random() * 11);
}

Player.prototype.GoodGame = function() {
	var math = Math.random();
	if (math < 0.5) {

		this.offense = this.offense + 1
	} else {

		this.defense = this.defense + 1
	}
};

Player.prototype.BadGame = function() {
	var math = Math.random();
	if (math < 0.5) {

		this.offense = this.offense - 1
	} else {

		this.defense = this.defense - 1
	}
};

Player.prototype.PrintStats = function() {
	console.log(` 
name: ${this.name}
pos: ${this.position}
off: ${this.offense}
deff: ${this.defense}`)

};
var CreateTeam = function() {
for (var i = 0; i < 8; i++) {
	if (team.length < 5) {

		var ThisPlayer = new Player()
		team.push(ThisPlayer)

	} else {
		var ThisPlayer = new Player()
		subTeam.push(ThisPlayer)

	}



}

return team
}

var SHowSubs = function(subTeam) {

		return subTeam
}

team.forEach( function(member) {
	console.log("BEGINNING OF THE GAME")
	member.PrintStats()
	// console.log()
});

function playGame(team) {

	var math = Math.random()

	if (math < 0.5) {
		console.log('Heads Offence')
		var sum = Math.floor(Math.random() * 50)
		console.log(sum)
		var TEAMSCORE = 0;
		team.forEach(function(member) {
			TEAMSCORE = TEAMSCORE + member.offense
			console.log(member.offense)
		});
		console.log(`THE RANDOM SCORE IS ${sum}`)
		console.log(`THE TEAM SCORE IS ${TEAMSCORE}`)

		if (sum > TEAMSCORE) {

			console.log('YOU LOOSE')
			team.forEach(function(member) {
				member.BadGame()

				member.PrintStats()

			});
		} else {
			console.log('YOU WIN')
						team.forEach(function(member) {
				member.GoodGame()
				member.PrintStats()
			});
		}

	} else {
		console.log('Tails Deffence')
		var sum = Math.floor(Math.random() * 50)

		var TEAMSCORE = 0;
		team.forEach(function(member) {
			TEAMSCORE = TEAMSCORE + member.defense
			// console.log(member.defense)
		});
		console.log(`THE RANDOM SCORE IS ${sum}`)
		console.log(`THE TEAM SCORE IS ${TEAMSCORE}`)

		if (sum > TEAMSCORE) {
			console.log('YOU LOOSE')
			team.forEach(function(member) {
				member.BadGame()
				member.PrintStats()
			});
		} else {
			console.log('YOU WIN')
						team.forEach(function(member) {
				member.GoodGame()
				member.PrintStats()
			});
		}
	}
}
// playGame(team)
module.exports = {
 	Player,
 	CreateTeam,
 	playGame,
 	SHowSubs
}
