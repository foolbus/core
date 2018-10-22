var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var submitRouter = require('./routes/submit');
var fakeServer = require('./routes/fakeServer');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  req.io = io;
  next();
})


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on("started", function(socket){
  console.log("started")
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/submit', submitRouter);
app.use('/fakeServer', fakeServer);

module.exports = app;
