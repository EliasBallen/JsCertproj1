// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// API using the date route 
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date
  
  if(/\d{5,}/.test(dateString)){

    if(parseInt(dateString).toString()!==dateString){
      res.json({error:"Invalid Date"})
    }
    res.json({
      unix:new Date(parseInt(dateString)).valueOf(),
      utc:new Date(parseInt(dateString)).toUTCString()
    })
  }
  if(new Date(dateString).toUTCString() === "Invalid Date"){
    res.json({error:"Invalid Date"})
  }
  res.json({
    unix:new Date(dateString).valueOf(),
    utc:new Date(dateString).toUTCString()
  });


});

app.get("/api/", function (req, res) {
  res.json({
    unix:new Date().valueOf(),
    utc:new Date().toUTCString()
  });

});

// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
