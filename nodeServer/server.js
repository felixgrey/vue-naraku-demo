var proxy = require('express-http-proxy');
var url = require('url');
var http = require('http');
var querystring = require('querystring');
var https = require('https');
var util = require('util');
var httpProxy = require('http-proxy');
var path = require('path');

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

function doService(servicePath, methodPath, data ){
  var service;
  
  try{
    service = require('./service/' + servicePath);
  } catch(e){
    console.log(e);
  }
  
  if(!service || !service[methodPath]){
    return Promise.reject({"code": 40004});
  }
  
  return Promise.resolve(service[methodPath](data)); 
}

function getService(req){
  var urlInfo = url.parse(req.url);   
  return urlInfo.pathname.replace('/api/', '').split('/')
    .concat(querystring.parse(urlInfo.query));
}

app.get('/api/*', function (req, res) {  

  var [servicePath, methodPath, queryData] = getService(req);
  
  doService(servicePath, methodPath, queryData)
  .then(data => res.send(JSON.stringify({code: 20000, data})))
  .catch(err => res.send(JSON.stringify(err)));
});  

app.post('/api/*', function (req, res) {  

  var post = '';     

  req.on('data', function(chunk){    
      post += chunk;
  });

  req.on('end', function(){    
    var [servicePath, methodPath] = getService(req);
    
    doService(servicePath, methodPath, JSON.parse(post))
    .then(data => res.send(JSON.stringify({code: 20000, data})))
    .catch(err => res.send(JSON.stringify(err)));
  });
});

var server = app.listen(7000, function () {  
    var host = server.address().address;  
    var port = server.address().port;  
  
    console.log(`listening at http://${host}:${port}`);  
});  