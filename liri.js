require("dotenv").config();
var Twitter = require('twitter')
var keys = require("./keys.js");
var Spotify = require('spotify');
var request = require('request');
var fs = require('fs')


var command = process.argv[2]
var deafaultOption = '';


switch (command) {
    case "my-tweets":
        getTwitter();
        break;
    case "spotify-this-song":
    if(deafaultOption === ""){
        deafaultOption = "Gods plan"
        console.log(deafaultOption);
    }
        searchSpotify();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        randomSearch();
        break;
    default:

for (var i = 3; i < process.argv.length; i++){
  deafaultOption += process.argv[i] + '';
}
}
// Twitter function begins 
function getTwitter(){
  var client = new Twitter(keys.twitter); 
  var params = {screen_name: 'bayareadev510',count: 20};

  
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(error){
            console.log(tweets)
        }else{
      for(var i = 0; i < tweets.length; i++){
        console.log("Tweet: ", tweets[i].text);
      }
}
});
}
// where the spotify function begins 
function searchSpotify(){

    var spotify = new Spotify(keys.spotify);


    spotify.search({ type: 'track', query: deafaultOption, limit: 5 }, function(err, data) {
        if ( err ) {
            return console.log('Error occurred: ' + err);
        }else{
            console.log(data)
        }
     
    });
}
function movies(){
    request("http://www.omdbapi.com/?t=" + deafaultOption.trim() + "&y=&plot=short&apikey=9ed0bd6", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var dataFunction = JSON.parse(body);
            // console.log(dataFunction);
            console.log("-----------------------------------------");
            console.log("Movie title: " + JSON.parse(body).Title);
            console.log("Year released: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country of production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("-----------------------------------------");
            console.log("");
        }
        else{
            console.log("Error Status Code: " + response.statusCode);
            console.log("Error: " + error);
        }
    });
}
