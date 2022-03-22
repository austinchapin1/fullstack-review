const express = require('express');
let app = express();
const github = require('../helpers/github.js');
const db = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
// app.use(cors());
app.use(express.json());


app.post('/repos', function (req, res) {

  console.log(req.body.id, 'in app.post')
  github.getReposByUsername(req.body.id)
    .then(result => {
      console.log(result);
      db.save(result, (err, result) => {
        if (err) {
          console.log('here it is')
          res.sendStatus(500);
        } else {
          res.sendStatus (201);
        }
      })
    })
    .then( result => {
      console.log('success to github at least')
    })
    .catch( error => {
      console.log('Maybe its here')
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

