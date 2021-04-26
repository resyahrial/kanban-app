"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Task.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Task.init(
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
      due_date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            args: true,
            msg: "Due date is required",
          },
          isAfter: {
            args: [`${new Date()}`],
            msg: "Due date must be after today",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
