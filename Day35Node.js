const chalk = require('chalk');

// console.log(chalk.blue('Hello world!'));

/*           
  chalk.bgBlack     reset 
  chalk.bgRed       bold
  chalk.bgGreen     dim 
  chalk.bgYellow    italic (not widely supported)  
  chalk.bgBlue      underline
  chalk.bgMagenta    inverse  
  chalk.bgCyan      hidden  
  chalk.bgWhite     strikethrough (not widely supported) 
*/


const userInput = process.argv; // here we check user input 
var userCommand = ''; // Official user command that we are going to use

for (var i = 2; i < userInput.length; i++) {

  // console.log(userInput[i])

  userCommand = userCommand + " " + userInput[i];

}
userCommand = userCommand.trim() // in case of extra white spaces!
console.log(userCommand.split(" ").length)

if (userCommand === "my-tweets") {

  tweet() // firing looking for tweet function! 
}

if (userCommand.includes("spotify-this-song")) {
      var song =   userCommand.slice(17).trim()
          
          SpotiFy(song)
}

//here we will find function to find random topick in tweetwer! 
if (userCommand.includes('my-tweets') && userCommand.includes(' ')) {

  topic = userCommand.split(' ')[1] // need work on it
  FindTopicTweet(topic)

}

function SpotiFy(song){

var spotify = require('spotify');
 
spotify.search({ type: 'track', query: `${song}` }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    // type
    // name
 // preview_url
 var musicList = data.tracks.items
 var songResult = musicList.filter(function(list , index) {
  var song
      song = {
             TYPE :musicList[index].type,
             NAME :musicList[index].name,
             URL :musicList[index].preview_url
      } 
      console.log(song)
 });
    console.log(songResult)
});



}

//Here my Tweet Function that Displays My Tweets! 
function tweet() {


  const UserTweeter = require('./key.js')
  const Twitter = require('twitter');

  const DzmitryTweet = new Twitter(
    UserTweeter.twitterKeys
  )

  DzmitryTweet.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {

      const tweetProperArray = tweets.filter(tweet => (!tweet.text.includes('https://')));
      //here I hav my good tweets without links beeing Dislayed creates an array of objects
      const comment = tweetProperArray.find(tweet => console.log(tweet.text)) // function that displayes the tweets is a VAR

      console.log(comment)

    }
  });
}
// function that displays tweets on topic 

function FindTopicTweet(topic) {

  const UserTweeter = require('./key.js')
  const Twitter = require('twitter');

  const DzmitryTweet = new Twitter(
    UserTweeter.twitterKeys
  )

  DzmitryTweet.get('search/tweets', {
    q: `${topic} `
  }, function(error, tweets, response) {


    var TopickTweets = tweets.statuses.find(tweet => console.log(chalk.bgMagenta(tweet.text)))

    // console.log(chalk.bgMagenta(TopickTweets))


  });
}