if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const router = require("./routers");
const { errHandler } = require("./middlewares");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Kanban-Server listening at http://localhost:${port}`);
});
