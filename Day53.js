var constr = function(main, head, body, tail) {
	this.main = main,
		this.head = head,
		this.body = body,
		this.tail = tail
}

var word = new constr("Centipede", "Ce", "t", "e")

constr.prototype.Check = function(word) {
	if ((word.main.slice(0, word.head.length) === word.head &&
			word.main.includes(word.body) && word.main.endsWith(word.tail))) {
		console.log('Body tail etc')
	} else {
		console.log('Incomplete')
	}
};

word.Check(word)


// Write a function that takes 4 string arguments. You will be comparing the first string to the 3 next strings. Verify if the 1st string starts with the 2nd string, includes the 3rd string, and ends with the 4th string. If the 1st string passes all the checks, return the string "My head, body, and tail.", otherwise, return "Incomplete.".
// Examples:

// "Onomatopeia", "on", "mato", "ia" => "Incomplete."
// "Centipede", "Cent", "tip", "pede" => "My head, body, and tail.”

// Successful completion:
// John xjmwest (edited)

