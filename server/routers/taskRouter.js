const { Router } = require("express");

const { TaskController } = require("../controllers");
const { authorize } = require("../middlewares");

const router = Router();

router.get("/", TaskController.findAll);
router.post("/", TaskController.create);

router.use("/:id", authorize);
router.put("/:id", TaskController.update);
router.patch("/:id/category", TaskController.updateCategory);
router.delete("/:id", TaskController.delete);

module.exports = router;
