require("dotenv").config();
var twitter = require('twitter')
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs')

var cmd = process.argv[2]
var deafSong = '';

for (var i = 3; i < process.argv.length; i++){
  searchStuff += process.argv[i] + '';
}

// Error Functions 
function errorFunction(respError) {
  if (respError) {
      return console.log("Error occured: ", respError);
   }
};
function errorFunctionStart (respError) {
  errorFunction();
  console.log("\n Log Started ");
};
function errorFunctionEnd (respError) {
  errorFunction();
  console.log("Log Ended");
};
function getTwitter(){
  var client = new Twitter(keys.twitter); 
  var params = {screen_name: 'bayareadev510',count: 20};

  
    client.get('statuses/user_timeline', params, function(respError, tweets, response) {

        errorFunction();

        fs.appendFile("log.txt", "tweets" + Date() + "\n\n" + "terminal commands: \n" + process.argv + "\n\n" + "Data Output: \n\n", errorFunctionStart());

      for(var i = 0; i < tweets.length; i++){
        console.log(i + 1 + ". Tweet: ", tweets[i].text);

        if (i + 1 > 9) {
          console.log("    Tweeted on: ", tweets[i].created_at + "\n");
      } else {
          console.log("   Tweeted on: ", tweets[i].created_at + "\n");
      }  
}
      fs.appendFile("log.txt", (i + 1) + ". Tweet: " + tweets[i].text + "\nTweeted on: " + tweets[i].created_at + "\n\n", errorFunction());

      fs.appendFile("log.txt", "-----Tweets Log Entry End-----\n\n", errorFunctionEnd());

});
}
 //spotify

function searchSpot(deafSong){

  if(deafSong == ""){
    deafSong = "started from the bottom"
  }

  var spotify = new Spotify(keys.spotify);

  var searchLimit = ""

      // Allows the user to input the number of returned spotify results, defaults 1 return if no input given
      if (isNaN(parseInt(process.argv[3])) == false) {
        searchLimit = process.argv[3];

        console.log("\nYou requested to return: " + searchLimit + " songs");
        
        // Resets the searchValue to account for searchLimit
        searchValue = "";
        for (var i = 4; i < process.argv.length; i++) {        
            searchValue += process.argv[i] + " ";
        };

      }
  spotify.search({ type: 'track', query: deafSong, limit: searchLimit }, function(respError, response) {
    fs.appendFile("log.txt", "-----Spotify Log Entry Start-----\nProcessed on:\n" + Date() + "\n\n" + "terminal commands:\n" + process.argv + "\n\n" + "Data Output: \n", errorFunctionStart());
        errorFunction();

        var songResp = response.tracks.items;



        })




  }

  // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  //   if (err) {
  //     return console.log('Error occurred: ' + err);
  //   }
   
  // console.log(data); 
  // });


// * `my-tweets`

// * `spotify-this-song`

//  `movie-this`

// `do-what-it-says'

//   api key for omdb  http://www.omdbapi.com/?i=tt3896198&apikey=9ed0bd6