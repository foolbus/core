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

  router.post('/', function(req,res,next){
    sequelize.query("INSERT into Question1 (name,email,balance,foolbus_id) values('karthic','ka@fs.com','120',1)").then( () => res.send("success"));
    ;
  })


});module.exports = router;
        