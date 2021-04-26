const { Task, User } = require("../models");

class Controller {
  static async findAll(req, res, next) {
    try {
      const tasks = await Task.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });
      res.status(200).json(tasks);
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async create(req, res, next) {
    try {
      const UserId = req.currUser.id;
      const { title, due_date, CategoryId } = req.body;
      const task = { title, due_date, UserId, CategoryId };

      const newTask = await Task.create(task);
      res.status(201).json({
        id: newTask.id,
        title: newTask.title,
        due_date: newTask.due_date,
        UserId: newTask.UserId,
        CategoryId: newTask.id,
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, due_date } = req.body;

      const task = await Task.update(
        { title, due_date },
        {
          where: {
            id,
          },
          fields: ["title", "due_date"],
          returning: ["id", "title", "UserId", "CategoryId"],
        }
      );

      if (!task[0]) {
        throw { name: "Invalid input" };
      }

      res.status(200).json(task[1]);
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { CategoryId } = req.body;

      const task = await Task.update(
        { CategoryId },
        {
          where: {
            id,
          },
          fields: ["CategoryId"],
          returning: ["id", "title", "UserId", "CategoryId"],
        }
      );

      if (!task[0]) {
        throw { name: "Invalid input" };
      }

      res.status(200).json(task[1]);
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Task.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "Task deleted successfully",
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = Controller;
