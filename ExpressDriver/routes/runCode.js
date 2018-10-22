var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');


fs.readFile(path.join(__dirname, '..', 'sampleFile.txt'), function(err, buf) {
  eval(buf.toString());

});






module.exports = router;
