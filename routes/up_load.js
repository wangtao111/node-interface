/**
 * Created by Administrator on 2017/7/24.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.post('/file_upload', function (req, res) {
  console.log(req.files[0]);  // 上传的文件信息
  var n = path.resolve(__dirname, '../public/images');
  var des_file = n + "/" + req.files[0].originalname;
  console.log(__dirname,n);
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      }else{
        response = {
          message:'File uploaded successfully',
          filename:req.files[0].originalname
        };
      }
      console.log( response );
      res.sendFile( des_file );
    });
  });
})
module.exports = router;