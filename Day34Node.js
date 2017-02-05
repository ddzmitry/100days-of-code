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

if (userCommand === "tweet") {

  tweet() // firing looking for tweet function! 
}

//here we will find function to find random topick in tweetwer! 
if (userCommand.includes('tweet') && userCommand.includes(' ')) {

  topic = userCommand.split(' ')[1] // need work on it
  FindTopicTweet(topic)

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