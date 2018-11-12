'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question1 = sequelize.define('Question1', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName : 'Question1'
  });
  Question1.associate = function(models) {
    Question1.belongsTo(models.User, { foreignKey: 'foolbus_id'})
  };
  return Question1;
};
