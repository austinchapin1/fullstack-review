const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let repoSchema = mongoose.Schema({
  ownerID: Number,
  id: Number,
  login: String,
  repo_name: String,
  stargazers_count: Number,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (err, data) => {

  if (err) {
    console.log('Error in axios get request to GitHub API');
  } else {

    // Create new array of repo documents
    var formattedRepoObjs = data.map( obj => {
      return new Repo( {
        ownerID: obj.owner.id,
        id: obj.id,
        login: obj.owner.login,
        repo_name: obj.name,
        stargazers_count: obj.stargazers_count,
        html_url: obj.owner.html_url
      })
    })

  // Get username from incoming GITHUB API request
  var username = data[0].owner.login;

  Repo.find({login: username})
    .then(() => {
      Repo.deleteMany({login: username})
      .then(() => {
        Repo.insertMany(formattedRepoObjs)
        .then(() => {
          Repo.find({login: username}, (err, res) => {
            console.log(res, "EEEEEEEE")
          });
        })
      })
    })
    .catch( error => {
      console.log('CATCH ERROR')
    })
  }
};


module.exports.save = save;