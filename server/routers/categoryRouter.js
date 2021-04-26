const { Router } = require("express");

const { CategoryController } = require("../controllers");

const router = Router();

router.get("/", CategoryController.findAll);

module.exports = router;
