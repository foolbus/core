'use strict';
module.exports = (sequelize, DataTypes) => {
  const PrefixCodes = sequelize.define('PrefixCodes', {
    code: DataTypes.STRING,
    framework: DataTypes.STRING
  }, {});
  PrefixCodes.associate = function(models) {
    // associations can be defined here
  };
  return PrefixCodes;
};
