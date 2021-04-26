const { hashPassword, checkPassword } = require("./passwordHandler");
const { getToken, decodedToken } = require("./tokenHandler");

module.exports = {
  hashPassword,
  checkPassword,
  getToken,
  decodedToken,
};
