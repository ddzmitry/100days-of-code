var number = 600851475143;

function Uler3 (number) {
	var arr = []
	//create an array where we will store our prime numbers!
	for(i=2; i <= number; i++){

		//here we define our prime numbers and pushing them to array
		if (number % i === 0) {
			// console.log(i)
			arr.push(i)
// every time when we add element in array we
// check for multiplication of all numbers
// if they match then we got out answer,
// which is going to be last element of our array!

			var numTonum = arr.reduce((a,b) =>{return a*b;})
			if(numTonum == number){
				console.log('Uler 3 made!')
				return console.log(arr.pop());

			}
		}
	}
}
Uler3(number)
