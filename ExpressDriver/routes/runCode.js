var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        const path = require('path');
        router.get('/', function(req, res, next) {


  res.send('{"hello": "asdsad now or never"}');

});module.exports = router;
        