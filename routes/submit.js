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

  const jobData = {
    "framework":"Express",
    "code": code,
  };

  const job = queue.createJob(jobData);

  job.save();
  job.on('succeeded', (result) => {
    console.log(`Received result for job ${job.id}: ${result}`);
    return res.send("success")
  });







});



module.exports = router;
