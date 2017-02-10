"use strict";

// make `process.stdin` begin emitting "keypress" events 

// var keypress = require('keypress');
// keypress(process.stdin);

// listen for the "keypress" event 

let word = 'plenipotentiary'
word = word.split('')
const stuff = ""
let tries = 0;
let coded = word.map(function(element, result) {
  result = '_'
  result = result + stuff
  return result
});


function gameFun(Key, coded, word) {

  console.log(Key)

  Key = Key.toString();
  let bolleon = word.includes(Key)
  let indices = [];

  var idx = word.indexOf(Key);
  while (idx != -1) {
    indices.push(idx);
    idx = word.indexOf(Key, idx + 1);
  }

  indices.length > 0 ? OpenLetters(indices, Key, coded) : console.log(`missed  ${Key}`);
  tries++
}

function OpenLetters(indices, Key, coded) {

  console.log(indices);

  indices.forEach(function(element, index) {
    console.log(element)
    coded[element] = Key;


  });

  console.log(coded)

  if (!coded.includes('_')) {

    console.log("winner")
    console.log(`Computer did it in ${tries} tries`)
    process.exit()
  }

}

var str = 'abcdefghijklmnopqrstuvwxyz'
str = str.split('')

let strNew = str.sort(function() {
  return 0.5 - Math.random()
})

console.log(strNew);

strNew.forEach(function(element, index) {
  var Key = element;
  return gameFun(Key, coded, word);
});


// process.stdin.setRawMode(true);
// process.stdin.resume();

// process.stdin.on('keypress', function (ch, key) {
//   // console.log( key.name);
//   if (key && key.ctrl && key.name == 'c') {
//     process.stdin.pause();
//   }
//   var Key = key.name
//   gameFun(Key,coded,word);
// });