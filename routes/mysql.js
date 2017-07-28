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
  var connection = mysql.createConnection({
    host     : 'database.aegis-info.com',
    user     : 'casedatamining',
    password : '!CaseDataMining@2015#',
    database : 'imonitor'
  });
  connection.connect();
  connection.query('SELECT * from city', function (error, results, fields) {
    if (error){
      throw error;
    } else {
      var url = path.resolve(__dirname,'../public/html/output.txt');
      results = JSON.stringify(results);
      fs.writeFile(url,results,function(err,data){
        if (err) {
          return console.error(err);
        }
      })
      res.send(results);
      connection.end();
    }
  });
});
module.exports = router;
