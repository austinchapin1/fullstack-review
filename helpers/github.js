const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback, errorCB) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return axios(options)
    .then(results => { callback(null, results.data) })
    .catch(error => { errorCB(error)})
}

module.exports.getReposByUsername = getReposByUsername;