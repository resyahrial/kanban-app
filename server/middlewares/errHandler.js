module.exports = (err, req, res, next) => {
  if (!err) {
    next();
  }

  const { data } = err;
  let response = {
    status: 500,
    message: "Internal Server Error",
  };

  switch (data.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      response = {
        ...response,
        status: 400,
        message: data.errors[0].message,
      };
      break;
    case "Invalid email / password":
    case "Invalid input":
      response = {
        ...response,
        status: 400,
        message: data.name,
      };
      break;
    case "Please login first":
    case "Invalid user":
    case "You're not authorize":
      response = {
        ...response,
        status: 401,
        message: data.name,
      };
      break;
    case "Task not found":
      response = {
        ...response,
        status: 404,
        message: data.name,
      };
      break;
    case "SequelizeDatabaseError":
      response = {
        ...response,
        status: 404,
        message: `${data.parent.column} column can't be null`,
      };
      break;
    default:
      break;
  }

  res.status(response.status).json({ message: response.message });
};
