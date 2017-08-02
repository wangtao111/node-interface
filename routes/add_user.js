/**
 * Created by Administrator on 2017/7/28.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var moment = require('moment');
router.use(function timeLog(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Origin","*")
  res.header("Content-Type", "application/json;charset=utf-8");
  var s1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  console.log('Time: ', s1);
  next();
});
router.get('/add_user', function (req, res) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'manager'
  });
  connection.connect();
  connection.query( 'select * from user_msg where user_name="'+req.query.user_name+'"', function ( error, result, fields ) {
    console.log(result);
    if(error){
      res.send({code: 1, response: '提交失败'});
      throw error;
    }else{
      if(result.length){
        res.send({code: 2, response: '用户已存在!'});
        connection.end();
        return;
      }else{
        var time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        const sql = 'insert into user_msg (user_name,password,province,type,create_time) values ("'+req.query.user_name+'","'+req.query.password+'","'+req.query.province+'","'+req.query.type+'","' +time+'")';
        connection.query( sql, function ( error, results, fields ) {
          if(error){
            res.send({code: 1, response: '提交失败'});
            throw error;
          }else{
            res.send({code: 0, response: '提交成功'})
            connection.end();
          }
        });
      }
    }
  })

});
module.exports = router;
