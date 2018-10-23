'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SuffixCodes', [{
        framework: 'Express',
        code: `module.exports = router;
        `,

      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SuffixCodes', null, {});

  }
};
