const Github = require('github-api');
const path = require('path');
const request = require('request');

var lastData = "";

var github = new Github({
  token: process.env.OAUTH_TOKEN || require('./config/githubOauth.js').token,
  auth: "oauth"
});

function UpdateLast() {
  request({
    url: "https://raw.githubusercontent.com/tumble1999/discordPhoneBot/master/data/phones.json",
    json: true,
    followAllRedirects: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      lastData = body;
    }
  });
}

var repo = github.getRepo("tumble1999", "discordPhoneBot");
UpdateLast();

var options = {
  author: {name: 'HerokuSave', email: 'api@tumblenet.ga'},
  committer: {name: 'TN Phones', email: 'admin@tumblenet.ga'},
  encode: true // Whether to base64 encode the file. (default: true)
}



function SavePhones(data, cb) {
  UpdateLast();
  var callback = cb || function (err) {
    console.log(err);
  }
  if (lastData == JSON.stringify(data, null, '\t')) {
    callback("phones is already up to date")
  } else {
    repo.writeFile('master', 'data/phones.json', JSON.stringify(data, null, '\t'), 'Update Phones feed', options,
    function(error,request,result) {
      callback(error ? "There was an error in updateing phones data" : "phones data was updated");
    })
  }
}

module.exports = {
  SavePhones:SavePhones
};
