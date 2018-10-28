var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var request = require('request-promise');
var socket = require('socket.io-client')('http://localhost:3004');
var models = require('../models');
var async = require('async');
const queue = require('../store/queue');
const closePortQueue = require('../store/closePortQueue');
const kill = require('kill-port')


function strcmp(str1, str2) {

  return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}

router.post('/', function(req, res, next) {
  const code = req.body.code;
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

      var output = await request.get(`http://localhost:${port}/runCode`).then( (body) => {
        console.log(body);
        var b = JSON.parse(body);

        if (strcmp(response, b.hello) == 0){
          console.log(port);
          kill(port);
          res.send("correct");
        }

        else {
          kill(port);
          res.send("incorrect");
        }

      })
    }

  op();

  });







});



module.exports = router;
