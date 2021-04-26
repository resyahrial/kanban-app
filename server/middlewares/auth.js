const { decodedToken } = require("../helpers");
const { User, Task } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { name: "Please login first" };
    }

    const { access_token } = req.headers;
    const { id, email } = decodedToken(access_token);

    const user = await User.findByPk(id);

    if (!user || user.email !== email) {
      throw { name: "Invalid user" };
    }

    req.currUser = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    console.log(err);
    next({
      data: err,
    });
  }
};

const authorize = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      throw { name: "Task not found" };
    }

    const UserId = req.currUser.id;
    if (task.UserId !== UserId) {
      throw { name: "You're not authorize" };
    }

    next();
  } catch (err) {
    next({
      data: err,
    });
  }
};

module.exports = {
  authenticate,
  authorize,
};
