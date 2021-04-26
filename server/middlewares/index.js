const errHandler = require("./errHandler");
const { authenticate, authorize } = require("./auth");

module.exports = {
  errHandler,
  authenticate,
  authorize,
};
