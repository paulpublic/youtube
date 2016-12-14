// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var google = require('googleapis');
var util = require('util');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// initialize the Youtube API library
var youtube = google.youtube({
  version: 'v3',
  auth: process.env.API_KEY
});

  youtube.search.list({
    part: 'id,snippet',
    q: 'Node.js on Google Cloud'
  }, function (err, data) {
    if (err) {
      console.error('Error: ' + err);
    }
    if (data) {
      console.log(util.inspect(data, false, null));
    }
    process.exit();
  });


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  
    
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
