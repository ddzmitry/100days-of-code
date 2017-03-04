//first Uler Callange
'use strict'
	var b = 0;
for (var i = 0; i < 1000; i++) {
	
	if (i % 5 == 0 || i % 3 == 0  ) {
		b += i
		console.log(i)
	} 
			

}
console.log(b)
//secomd Uler Callange

var num1 = 1
var num2 = 2
var arr = []

function Fibo(num1, num2) {

	arr.push(num1)
	if (num2 > 4000000) {
		var temp2 = 0
		for (number in arr) {
			if (arr[number] % 2 == 0) {
				temp2 += arr[number]
				console.log(arr[number])
			}
		}
		console.log(temp2)
		return

	}

	// console.log(num1,num2)
	temp = num1 + num2
	num1 = num2
	num2 = temp

	Fibo(num1, num2)

}
Fibo(num1, num2)