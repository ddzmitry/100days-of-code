var WriteRow = (int) => {
var random = ['🎅','🎄','🍪','❄️','🎁','🔔']

var space = ' '
var arr2 = []
var arr = []
for(i=0; i <= int; i++){
arr2.push(space)
} 

for(i=0;i<=int;i++){
if(Math.random() > 0.5){
arr.push('🔥')}else 
	arr.push(random[Math.floor(Math.random()*random.length)])
arr2.pop()	
console.log(arr2.join(""),arr.join("")) 

}}
WriteRow(50)