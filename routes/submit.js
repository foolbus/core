var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var request = require('request');
var socket = require('socket.io-client')('http://localhost:3004');

function strcmp ( str1, str2 ) {

    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}


router.get('/', function(req, res, next) {
  var response= "respond now or never";
  socket.emit('chat message');
  socket.on('started', function(){

    console.log("conected")

    var output  = request.get('http://localhost:3003/runCode',function(error,output,body){
      var b = JSON.parse(body);
      console.log(b.hello);

      if(strcmp(response,b.hello) == 0)
        res.send("correct");
      else {
        res.send("incorrect");
      }

    });

  });




});



module.exports = router;
