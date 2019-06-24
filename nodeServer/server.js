var proxy = require('express-http-proxy');
var url = require('url');
var http = require('http');
var querystring = require('querystring');
var https = require('https');
var util = require('util');
var httpProxy = require('http-proxy');

var express = require('express');
var app = express();  

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type,x-token,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(express.static('static'));

app.get('/api/*', function (req, res) {  

    var urlInfo = url.parse(req.url);
    
    var [servicePath, methodPath] = urlInfo.pathname.replace('/api/', '').split('/');
    var service = require('./service/' + servicePath);

    if(!service || !service[methodPath]){
      res.send('{"code": 40004}'); 
      return;
    }
    
    Promise.resolve(service[methodPath](querystring.parse(urlInfo.query))).then((data) => {
      res.send(JSON.stringify({code: 20000, data}, null, 2)); 
    });

});  

var server = app.listen(7000, function () {  
    var host = server.address().address;  
    var port = server.address().port;  
  
    console.log('Example app listening at http://%s:%s', host, port);  
});  