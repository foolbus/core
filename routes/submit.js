var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var request = require('request');
var socket = require('socket.io-client')('http://localhost:3004');
var models = require('../models');
var async = require('async');

function strcmp(str1, str2) {

  return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}

router.post('/', function(req, res, next) {
  var response = "respond now or never";
  socket.emit('chat message');
  socket.on('started', function() {
    const prefixCode =
      models.PrefixCodes.find({
        where: {
          framework: 'Express'
        }
      })


    const suffixCode =
      models.SuffixCodes.find({
        where: {
          framework: 'Express'
        }
      })


    async function formResponse() {
      var file = ""
      var prefix = await prefixCode;

      file = await file.concat(prefix.code);
      file = await file.concat(req.body.code);

      var suffix = await suffixCode;
      file = await file.concat(suffix.code);
      await fs.writeFileSync("ExpressDriver/routes/runCode.js", file);

      var output = await request.get('http://localhost:3003/runCode', function(error, output, body) {
        var b = JSON.parse(body);
        console.log(b.hello);

        if (strcmp(response, b.hello) == 0)
          res.send("correct");
        else {
          res.send("incorrect");
        }
      });


    }
    formResponse();

  });




});



module.exports = router;
