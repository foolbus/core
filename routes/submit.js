var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var request = require('request');
var socket = require('socket.io-client')('http://localhost:3004');
var models = require('../models');
var async = require('async');
const queue = require('../store/queue');

function strcmp(str1, str2) {

  return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}

router.post('/', function(req, res, next) {
  const code = req.body.code;
  console.log(code);
  const response = "help me yo!"
  const jobData = {
    "framework":"Express",
    "code": code,
  };

  const job = queue.createJob(jobData);

  job.save();
  var port;
  job.on('succeeded', (result) => {
    port = result; //Change this to get port
    console.log(`Received result for job ${job.id}: ${result}`);


    async function op() {
      var output = await request.get(`http://localhost:${port}/runCode`, function(error, output, body) {
        console.log(body);
            var b = JSON.parse(body);


            if (strcmp(response, b.hello) == 0)
              res.send("correct");
            else {
              res.send("incorrect");
            }
        });

    }

  op();

  });







});



module.exports = router;
