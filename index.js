// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const invalidDate = (date) => isNaN(date.getDate());

// Timestamp service
app.get("/api/:date?", function(req, res) {
  
  let params = req.params;
  try {
    // Parse the date if it comes in the parameters, otherwise use current date
    let requestedDate = new Date( params.date || Date.now() );

    // Check if invalid
    if(invalidDate(requestedDate)) {
      
      // Final moment to parse the UNIX timestamp as an integer
      requestedDate = new Date(parseInt( params.date ));

      if(invalidDate(requestedDate)) throw "Invalid Date";
    }

    res.json({ unix: requestedDate.getTime(), utc: requestedDate.toUTCString() });
  
  } catch(err) {
    res.json({ error : err });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
