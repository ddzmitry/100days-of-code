/* 18.1.4 - Updates, Deletes and Drops
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/- */

// Go back to your classroom database.

// 1. You've decided to take on a new hobby. 
// Add Extreme Basketweaving to your array of hobbies.
db.testclassroom.update({"name": "Dzmitry"}, {$set: {"hobbies":["xtreme Basketweaving Competition","coding"]}})
db.testclassroom.update({"name": "Dzmitry"}, {$push: {"hobbies":["funtimes hobby"]}})
// 2. While practicing for your Extreme Basketweaving Competition, 
// you broke the computer of the person next to you. 
// They're using a new Operating System now. Change their os field.
db.testclassroom.update({name:"Peter"},{$set:{"Operating System":"Mac"}})
// 3. Another student in your row saw you break that computer 
// and wisely decided to move. Remove them from your database.
db.testclassroom.remove({"name" : "Melinda"})
// 4. You are worried everyone else will leave 
// and you'll have to sit all alone. 
db.testclassroom.update({}, {$set: {"gavecandy":false}}, {multi:true})
db.testclassroom.update({}, {$set: {gavecandy : true} } ,{multi: true})

db.getCollection('testclassroom').update({name: "Dzmitry"} , {$set: {"gave Candy" : true}});

// You decide to bribe everyone who didn't leave with candy.
// Add a field of gavecandy with a value of false to everyone in the array 
// so you can keep track.

// 5. All this work made you hungry, so you bought yourself some candy. 
// Change the value of gavecandy to true in your entry.
