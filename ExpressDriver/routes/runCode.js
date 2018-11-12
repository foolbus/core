var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        const path = require('path');
        const seq = require('../models');
        const sequelize = seq.sequelize
         router.get('/',function(req,res,next){
  sequelize.query("SELECT * from `Question1`", { type: sequelize.QueryTypes.SELECT})
  .then( data => {
    res.send(data)
  });


});module.exports = router;
        