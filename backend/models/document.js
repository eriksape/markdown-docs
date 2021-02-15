'use strict';
const {
  Model,DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Document.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    modelName: 'documents',
  });
  return Document;
};
