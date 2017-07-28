/**
 * Created by Administrator on 2017/7/27.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
router.use(function timeLog(req, res, next) {
  var s1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  console.log('Time: ', s1);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Origin","*")
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
router.post('/login', function (req, res) {
  console.log(req.body);
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'manager'
  });
  connection.connect();
  const sql = 'SELECT * from user_msg where user_name="'+req.body.username+'" and password="'+req.body.password+'"';
  connection.query(sql, function (error, results, fields) {
    if (error){
      throw error;
    } else {
      var data = {};
      if(!results.length){
        data = {code: 1, response:'用户名或密码有误！'};
      }else{
        data = {code: 0, response:'登录成功！'};
      }
      console.log(results,data);
      res.send(data);
      connection.end();
    }
  });
});
module.exports = router;
