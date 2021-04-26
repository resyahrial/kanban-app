const { OAuth2Client } = require("google-auth-library");

const { User } = require("../models");
const { checkPassword, getToken } = require("../helpers");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = { email, password };
      const user = await User.create(newUser);
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user || !checkPassword(password, user.password)) {
        throw { name: "Invalid email / password" };
      }

      const access_token = getToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({
        id: user.id,
        access_token,
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID,
      });
      const { email } = ticket.getPayload();

      const user = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          password: `${Math.floor(Math.random() * 1e7)}`,
        },
      });

      const payload = {
        id: user[0].id,
        email: user[0].email,
      };
      const access_token = getToken(payload);

      res.status(200).json({
        id: user[0].id,
        access_token,
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = Controller;
