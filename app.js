var express = require('express');
var util = require('util');
var rp = require('request-promise');
var app = express();
var _ = require('lodash');

app.use(require('express-promise')());

app.get('/gh-releases/:user/:project/:version', function(req, res) {
  var options = {
    method: 'GET',
    url: util.format('https://api.github.com/repos/%s/%s/releases',
      req.params.user,
      req.params.project
    ),
    headers: {
      'User-Agent': 'Awesome-Octocat-App'
    },
    resolveWithFullResponse: true
  };
  console.log('URL: ' + options.url);

  res.send(rp(options).then(function(res) {
    if(res.statusCode != 200)
      throw 'Error';

    var body = JSON.parse(res.body);
    return res.send(release_);
  }).catch(function(e) {
    return res.status(404);
  }));
});

var server = app.listen(3000);
