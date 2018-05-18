require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

 var request = require('request')
 var fs = require('fs')

 console.log(process.argv)

 var functionOne = process.argv[2];
 var second = process.argv.slice(3).join("+")
if(functionOne === "my-tweets"){
    myTweets()
}

var myTweets = function(){
    var client = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
      });
       
      var params = {screen_name: 'nodejs'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        //   for()
        }
      });
}  

// * `my-tweets`

// * `spotify-this-song`

//  `movie-this`

// `do-what-it-says`


// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

 var spot = function(){
// var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: ,
//   <your spotify client id>,
  secret:
//    <your spotify client secret>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
console.log(JSON.stringify(data,null ,2)); 

});

}
