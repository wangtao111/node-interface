/**
 * Created by Administrator on 2017/8/2.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');
router.use(function timeLog(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Origin","*")
  res.header("Content-Type", "application/json;charset=utf-8");
  var s1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  next();
});
router.delete('/delete_user', function(req,res){
   var connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '1234',
     database: 'manager'
   });
  connection.connect();
  const ids = JSON.parse(req.query.ids);
  var str = [];
  if(ids.length){
    for ( var i = 0; i < ids.length; i++ ) {
      str.push('user_name="'+ids[i]+'"');
    }
  }
  str = str.join(' OR ');
  const sql = 'delete from user_msg WHERE (' + str + ')';
  console.log(sql);
  connection.query( sql, function(error, results, fields){
    if (error){
      var data = {};
      data.code = 1;
      data.msg = '删除失败';
      throw error;
    } else {
      var data = {};
      data.code = 0;
      data.msg = '删除成功';
      res.send(data);
      connection.end();
    }
  })
});
module.exports = router;