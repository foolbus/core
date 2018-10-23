'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrefixCode = sequelize.define('PrefixCode', {
    code: DataTypes.STRING,
    framework: DataTypes.STRING
  }, {});
  PrefixCode.associate = function(models) {
    // associations can be defined here
  };
  return PrefixCode;
};