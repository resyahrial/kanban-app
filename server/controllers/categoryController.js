const { Category, Task } = require("../models");

class Controller {
  static async findAll(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "title", "order"],
        order: [["order", "ASC"]],
      });
      res.status(200).json(categories);
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = Controller;
