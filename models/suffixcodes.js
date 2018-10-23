'use strict';
module.exports = (sequelize, DataTypes) => {
  const SuffixCodes = sequelize.define('SuffixCodes', {
    code: DataTypes.STRING,
    framework: DataTypes.STRING
  }, {});
  SuffixCodes.associate = function(models) {
    // associations can be defined here
  };
  return SuffixCodes;
};