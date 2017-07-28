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
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'manager'
  });
  connection.connect();
  console.log(req.body.username);
  const sql = 'SELECT * from user_msg where user_name="'+req.body.username+'"';
  connection.query(sql, function (error, results, fields) {
    console.log(results);
    if (error){
      throw error;
    } else {
      var data = {};
      if(!results.length){
        data = {code: 2, response:'用户名不存在！'};
        res.send(data);
        connection.end();
      }else{
        connection.query('SELECT * from user_msg where user_name="'+req.body.username+'" and password="'+req.body.password+'"', function (error, result, fields) {
          console.log(111,result);
          if (error){
            throw error;
          } else {
            if(!result.length){
              data = {code: 1, response:'密码有误！'};
            }else{
              data = {code: 0, response:'登录成功！'};
            }
          }
          res.send(data);
          connection.end();
        })
      }
    }
  });
});
module.exports = router;
