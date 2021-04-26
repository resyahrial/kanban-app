const { Router } = require("express");

const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter");
const categoryRouter = require("./categoryRouter");
const { authenticate } = require("../middlewares");

const router = Router();

router.use("/", userRouter);

router.use(authenticate);
router.use("/categories", categoryRouter);
router.use("/tasks", taskRouter);

module.exports = router;
