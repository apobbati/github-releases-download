var express = require('express');
var util = require('util');
var rp = require('request-promise');
var app = express();
var _ = require('lodash');

app.use(require('express-promise')());

app.get('/gh-releases/:user/:project/:version/:assetName', function(req, res) {
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

  var version = req.params.version;
  var assetName = req.params.assetName;

  return res.send(rp(options).then(function(gh_res) {
    if(gh_res.statusCode != 200)
      throw 'Error';

    var releases = JSON.parse(gh_res.body);
    var release = _.find(releases,
      version == 'latest' ?
        function() { return true; } :
        function(r) { return r.tag_name == version; }
    );

    if(!release)
      throw 'Error';

    var asset = _.find(release.assets, function(asset) {
      return asset.name == assetName;
    });

    if(!asset)
      throw 'Error';

    return res.redirect(asset.browser_download_url);
  }).catch(function(e) {
    res.statusCode = 404;
    res.send();
  }));
});

var server = app.listen(3000);
