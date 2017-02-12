


	
function DigitalPa() {
			this.hungry = false;
			this.sleepy = false;
			this.bored = true;
			this.age = 0;
			this.Feed = function () {
				
				this.hungry = true;
				console.log('That was Yummy!')
			};
			this.Sleep = function(){
				this.sleepy = true;
				console.log('ZZZZZzzzzz')

				this.increaseAge()

			};
			this.increaseAge = function () {
				this.age++
				console.log("The level was increased!")
			}
			this.play = function(){

				this.bored ? console.log('yaya ayaya lets play') : console.log('dont Want to play yet')

					
			}


						// setTimeout(this.play(), 3000)
						// setTimeout(this.Sleep(), 5000)




}

module.exports = {
  DigitalPa
}
var dog = new DigitalPa;
dog.bark = function () {	
console.log('Woof')};
dog.GoOutside = function () {
		console.log('I love to go outside!')
	dog.play()
	dog.outDoor = true;	
}

dog.GoInside = function () {
		console.log('Okay I will go back home!')
	
	dog.outDoor = false;	
}


console.log(dog)

// dog.increaseAge()

// console.log(dog)
// dog.Sleep()
// console.log(dog)
// dog.Feed()
// console.log(dog)
// dog.bark()
// dog.GoOutside();
// dog.GoInside();
// console.log(dog)