
var express = require('express');
var sync_request = require('sync-request');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.post('/token',function (req, res) {
  console.log(req.body);
  var sr = sync_request('POST', 'https://login.salesforce.com/services/oauth2/token',
                  {
                  headers: {'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},
                  body: 'grant_type='+req.body.grant_type+'&code='+req.body.code+'&refresh_token='+req.body.refresh_token+'&client_id='+req.body.client_id+'&client_secret='+req.body.client_secret+'&redirect_uri='+req.body.redirect_uri
                  });
  console.log(sr.getBody('utf8'));
  response = JSON.parse(sr.getBody('utf8'));

  response.access_token = response.access_token + " " + response.instance_url;
  response.expires_in = 5400; //in seconds, set this to be less than your setting under session management.

  res.jsonp(response);
});

/*
app.get('/token',function (req, res) {
  console.log(req.query.grant_type);
  var sr = sync_request('POST', 'https://login.salesforce.com/services/oauth2/token',
                  {
                  headers: {'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},
                  body: 'grant_type='+req.query.grant_type+'&code='+req.query.code+'&refresh_token='+req.query.refresh_token+'&client_id='+req.query.client_id+'&client_secret='+req.query.client_secret+'&redirect_uri='+req.query.redirect_uri
                  });
  console.log(sr.getBody('utf8'));
  response = JSON.parse(sr.getBody('utf8'));

  response.access_token = response.access_token + " " + response.instance_url;
  response.expires_in = 5400; //in seconds, set this to be less than your setting under session management.

  res.jsonp(response);
});*/

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!')
})