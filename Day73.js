
'use strict'

//A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

var pallers = []
 var paler =  (n) => {
	for (var i = 99; i < 999; i++) {
			let numOnNum = n * i
			let temp = numOnNum.toString().split('').reverse().join('')
					// console.log(i)
		if ( temp == numOnNum) {
				// console.log(temp)
			pallers.push(numOnNum)
			// console.log(pallers)
		}	

}
			if (n < 999) {

					n++
					paler(n)
			} else  {

				 const maxNum = pallers.reduce((num1, num2) => {
    				return Math.max(num1, num2);
    			});
																	
					console.log(maxNum)
			}
		
		
  		
}
paler(100)