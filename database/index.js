const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  ownerID: Number,
  id: Number,
  login: String,
  repo_name: String,
  stargazers_count: Number,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (arrayOfRepoObjects, callback) => {

  // Check if username exists in MongoDB
  var searchForUser = Repo.findOne({ login: username });

  // Remove all repos from user if they exist
  if (searchForUser.length) {
    Repo.deleteMany({ login: username })
  };

  // Create new array of repo documents
  var formattedRepoObjs = arrayOfRepoObjects.map( obj => {
    return new Repo( {
      ownerID: obj.owner.id,
      id: obj.id,
      login: obj.owner.login,
      repo_name: obj.name,
      stargazers_count: obj.stargazers_count,
      html_url: obj.owner.html_url
    })
  })

  // Pass formatted array of repoObjs into insertMany() and populate DB
  Repo.insertMany(formattedRepoObjs)

};

module.exports.save = save;