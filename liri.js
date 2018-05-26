require("dotenv").config();
var Twitter = require('twitter')
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs')


var command = process.argv[2]
var deafaultOption = '';
for (var i = 3; i < process.argv.length; i++){
  deafaultOption += process.argv[i] + '';
}

console.log(process.argv)

switch (command) {
    case "my-tweets":
        getTwitter();
        break;
    case "spotify-this-song":
    if(deafaultOption === ""){
        deafaultOption = "Gods plan"
        // console.log(deafaultOption);
    }
        searchSpotify(deafaultOption);
        break;
    case "movie-this":
    if(deafaultOption === ""){
        deafaultOption = "Mr. Nobody"
    } 
        movies(deafaultOption);
        break;
    case "do-what-it-says":
        randomSearch();
        break;
    default:
//  cmnd - node liri spotify-this gods plan
//  argv [0] ==node [1]=== liri [2]== spotify-this [3] === gods  [4] === plan

// ""
//defaultOption = "gods "
//gods = plan -=> 'gods plan"

}
// Twitter function begins 
function getTwitter(){
  var client = new Twitter(keys.twitter); 
  var params = {screen_name: 'bayareadev510',count: 20};

  
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(error) {
            throw error
        }else{
      for(var i = 0; i < tweets.length; i++){
        console.log("Tweet: ", tweets[i].text);
        console.log(tweets[i].created_at);     
      }
}

});
}
// where the spotify function begins 
function searchSpotify(song){

    var spotify = new Spotify(keys.spotify);


    spotify.search({ type: 'track', query: song, limit: 5 }, function(err, data) {
        if ( err ) {
            return console.log('Error occurred: ' + err);
        }else{
            // console.log(JSON.stringify(data, null, 2));
           var track = data.tracks.items[0];
            console.log("Artist",track.artists[0].name);
            console.log("Song Name:",track.name);
            console.log("Song Name:",track.preview_url);
            console.log("Song Name:",track.album.name);

        }
     
    });
}
function movies(movie){
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=9ed0bd6", function(error, response, body) {
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

function randomSearch(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
    
        // We will then print the contents of data
        console.log(data);
    
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
    
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        var userAction = dataArr[0];
        var userTitle = dataArr[1];
        if(userAction =="my-tweets"){
            getTwitter();
        }else if (userAction == "spotify-this-song" ){
            searchSpotify(userTitle);
        }else if (userAction == "movie-this" ){
        movies(userTitle);
        }

    
    });
    
}