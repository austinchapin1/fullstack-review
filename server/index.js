const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());


app.post('/repos', function (req, res) {

  github.getReposByUsername(req.body.id, db.save, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  }
)
})


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // Make a query to MongoDB
  // Get results in array
  // Sort array based on number of stargazers, (a,b) =< {b - a}? Descending



});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

