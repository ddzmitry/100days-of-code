const chalk = require('chalk');


const userInput = process.argv; // here we check user input 
var userCommand = ''; // Official user command that we are going to use

for (var i = 2; i < userInput.length; i++) {

  // console.log(userInput[i])

  userCommand = userCommand + " " + userInput[i];

}
userCommand = userCommand.trim() // in case of extra white spaces!
console.log(userCommand)


FindSolution(userCommand)

function FindSolution(userCommand) {

  var fs = require('fs')

  fs.appendFile("whatDidIdo.txt", ' , ' + userCommand, function() {
    fs.readFile("whatDidIdo.txt", "utf8", function(error, data) {

    })
  })



  if (userCommand === "my-tweets") {

    tweet() // firing looking for tweet function! 
  }

  if (userCommand.includes("spotify-this-song")) {
    var song = userCommand.slice(17).trim()

    SpotiFy(song)
  }

  if (userCommand.includes("movie-this")) {

    var movie = userCommand.slice(10).trim()

    MovieSearch(movie)
  }
  // movie-this
  //here we will find function to find random topick in tweetwer! 
  if (userCommand.includes('tweets') && userCommand.includes(' ')) {

    topic = userCommand.split(' ')[1] // need work on it
    FindTopicTweet(topic)

  }

  if (userCommand === 'do-what-it-says') {

    // console.log("Yes")
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {

      console.log(data);

      FindSolution(data)


    });

  }



}
module.exports = {
  FindSolution
}

//search for movie function
function MovieSearch(movie) {

  var MovieDB = require('moviedb')('65df1022a70a9ad63fbfa028ad61d139');

  MovieDB.searchMovie({
    query: `${movie}`
  }, function(err, res) {


    var movieSearched = res.results[0]
//Creating the Obj for Movie
    var MovieObj = {

      PLOT: movieSearched.overview,
      DATE: movieSearched.release_date,
      TITLE: movieSearched.title,
      RAITING: movieSearched.popularity,
      RAITINGVOTE: movieSearched.vote_average
    }
    console.log(MovieObj)
  });


}

function SpotiFy(song) {

  var spotify = require('spotify');

  spotify.search({
    type: 'track',
    query: `${song}`
  }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    const musicList = data.tracks.items
    console.log(musicList)
    const caseSongs = []
    const songResult = musicList.filter(function(list, index) {

      //two cases fore music search, that point we will definetly have a result.
      if (musicList[index].name === song) {
        // console.log('case 1')
        // console.log(musicList[index].preview_url)

        require("openurl").open(`${musicList[index].preview_url}`)
        return musicList[index].preview_url

      } else {
        // console.log('case 2')
        //Creating new song object and pushing it to an array.
        var song = {

          TYPE: musicList[index].type,
          NAME: musicList[index].name,
          URL: musicList[index].preview_url,
          EXTERNALURL: musicList[index].album.external_urls.spotify
        }

        caseSongs.push(song)


      }


    });

    console.log(caseSongs)
      //opening a link to the first aperience in array for our song search! 
    require("openurl").open(`${caseSongs[0].EXTERNALURL}`)


  });

  console.log(chalk.bgGreen('ENJOY!'));

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
      const comment = tweetProperArray.find(tweet => console.log(chalk.bgRed(tweet.text))) // function that displayes the tweets is a VAR

      // console.log(comment)

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