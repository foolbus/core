'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PrefixCodes', [{
        framework: 'Express',
        code:
        `var express = require('express');
        var router = express.Router();
        var fs = require('fs');
        const path = require('path');
        const seq = require('../models');
        const sequelize = seq.sequelize
        `,

      }], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('PrefixCodes', null, {});

  }
};
