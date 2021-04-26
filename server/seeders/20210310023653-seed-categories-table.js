"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        title: "Backlog",
        order: 1,
      },
      {
        title: "Todo",
        order: 2,
      },
      {
        title: "Doing",
        order: 3,
      },
      {
        title: "Done",
        order: 4,
      },
    ];
    categories.forEach((category) => {
      category.createdAt = new Date();
      category.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
