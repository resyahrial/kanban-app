"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Task, { foreignKey: "CategoryId" });
    }
  }
  Category.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title is required",
          },
        },
      },
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
      hooks: {
        beforeCreate: (category) => {
          category.order = 50;
        },
      },
    }
  );
  return Category;
};
