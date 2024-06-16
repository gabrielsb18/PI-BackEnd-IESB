const controller = require("../controllers/controllerUsers");
const express = require("express");
const router = express.Router();

router.post("/", controller.criar);
router.post("/login", controller.login);

module.exports= router;