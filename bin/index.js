/**
 * Created by Administrator on 2017/7/21.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var app = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');
var multer  = require('multer');
var catch_routes = require('../tools/catch_routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(express.static('public'));
var dir = path.resolve(__dirname, '../routes');
catch_routes(dir, function(err, results) {
  if (err) {
    throw err;
  }
  for(var i = 0; i < results.length; i ++){
    app.use(require('../routes/'+results[i]));
  }
  console.log('路由', results);
});
var server = app.listen(8081,'192.168.20.60', function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})