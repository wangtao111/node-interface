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
router.get('/get_user_msg', function (req, res) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'manager'
  });
  connection.connect();
  var pager = {};
  if (req.query.page_size) {
    pager.page_size = req.query.page_size;
  }else{
    res.send({code: 1, msg:'缺少参数page_size'});
    return;
  }
  if(req.query.page){
    pager.page = req.page;
  }else {
    pager.page = 1;
  }
  const sql = 'SELECT * from user_msg';
  connection.query( sql, function ( error, results, fields ) {
    var data = {};
    if (error){
      throw error;
    } else {
      data.code = 0;
      data.msg = '返回成功！';
      data.data = results;
      pager.total = results.length;
      data.pager = pager;
      console.log(data);
      res.send( data );
      connection.end();
    }
  });
});
module.exports = router;
