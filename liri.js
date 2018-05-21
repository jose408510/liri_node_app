require("dotenv").config();
var twitter = require('twitter')
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs')


var cmd = process.argv[2]
var deafaultOption = '';

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
// errror functions end


function getTwitter(){
  var client = new Twitter(keys.twitter); 
  var params = {screen_name: 'bayareadev510',count: 20};

  
    client.get('statuses/user_timeline', params, function(respError, tweets, response) {

        errorFunction();

        fs.appendFile("log.txt", "tweets" + Date() + "\n\n" + "terminal commands: \n" + process.argv + "\n\n" + "Data Output: \n\n", errorFunctionStart());

      for(var i = 0; i < tweets.length; i++){
        console.log(i + 1 + ". Tweet: ", tweets[i].text);

        if (i + 1 > 9) {
          console.log("Tweeted on: ", tweets[i].created_at + "\n");
      } else {
          console.log("Tweeted on: ", tweets[i].created_at + "\n");
      }  
}
      fs.appendFile("log.txt", (i + 1) + ". Tweet: " + tweets[i].text + "\nTweeted on: " + tweets[i].created_at + "\n\n", errorFunction());

      fs.appendFile("log.txt", "--Tweets Log Entry End--\n\n", errorFunctionEnd());

});
}
 //spotify

function searchSpot(deafaultOption){

  if(deafaultOption == ""){
    deafaultOption= "started from the bottom"
  }

  var spotify = new Spotify(keys.spotify);

  var searchLimit = ""

      // Allows the user to input the number of returned spotify results, defaults 1 return if no input given
      if (isNaN(parseInt(process.argv[3])) == false) {
        searchLimit = process.argv[3];

        console.log("\n return: " + searchLimit + " songs");
        
        // Resets the deafaultOption to account for searchLimit
        deafaultOption = "";
        for (var i = 4; i < process.argv.length; i++) {        
            searchValue += process.argv[i] + " ";
        };

      }
  spotify.search({ type: 'track', query: deafSong, limit: searchLimit }, function(respError, response) {
    fs.appendFile("log.txt", "-----Spotify Log Entry Start-----\nProcessed on:\n" + Date() + "\n\n" + "terminal commands:\n" + process.argv + "\n\n" + "Data Output: \n", errorFunctionStart());
        errorFunction();

        var songResp = response.tracks.items;

        for (var i = 0; i < songResp.length; i++) {
          console.log("\n===Spotify Search Result "+ (i+1) +" ====\n");
          console.log(("Artist: " + songResp[i].artists[0].name));
          console.log(("Song title: " + songResp[i].name));
          console.log(("Album name: " + songResp[i].album.name));
          console.log(("URL Preview: " + songResp[i].preview_url));
          
          
          fs.appendFile("log.txt", "\n========= Result "+ (i+1) +" =========\nArtist: " + songResp[i].artists[0].name + "\nSong title: " + songResp[i].name + "\nAlbum name: " + songResp[i].album.name + "\nURL Preview: " + songResp[i].preview_url + "\n=============================\n", errorFunction());
        }
        fs.appendFile("log.txt","-----Spotify Log Entry End-----\n\n", errorFunctionEnd());

        })
      }
        
      function movies(deafaultOption){
        if(deafaultOption == ""){
          deafaultOption = "Mr. Nobody"
        }

      request("http://www.omdbapi.com/?t=" + deafaultOption.trim()  + "&y=&plot=short&apikey=9ed0bd6", function(respError, response, body) {

      fs.appendFile("log.txt", "--OMDB Log Entry Start--\n" + Date() + "\n\n" + "terminal commands:\n" + process.argv + "\n\n" + "Data Output: \n\n", errorFunctionStart());

      errorFunction();

      if(JSON.parse(body).Error == "movie not found! ") {
      
        fs.appendFile("log.txt", "I'm sorry, I could not find any movies that matched the title " + deafaultOption + errorFunctionEnd());
        
      }
      else{
        movieBody = JSON.parse(body);
        console.log("Moive Title: "+movieBody.Title)
        console.log("Moive Year: "+movieBody.Year)
        console.log("The Movies Rating is: "+movieBody.imdbRating)
        
      }



    })

  }







  switch (cmd) {
    case "my-tweets":
        getTwitter();
        break;
    case "spotify-this-song":
        searchSpot(deafaultOption);
        break;
    case "movie-this":
        movies(deafaultOption);
        break;
    case "do-what-it-says":
        randomSearch();
        break;
    default:
        console.log("\nI'm sorry, " + cmd + " is not a command that I recognize.  For a random search: node liri.js do-what-it-says \n\n  2. To search a movie node liri.js movie-this \n\n  3. To search for a song: spotify-this-song\n\n  4. To see tweets on Twitter: my-tweets \n");
};



//   api key for omdb  http://www.omdbapi.com/?i=tt3896198&apikey=9ed0bd6