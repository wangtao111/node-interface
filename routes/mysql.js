var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
router.get('/', function (req, res) {
  res.send('asdasd');
});
module.exports = router;
