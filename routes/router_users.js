const controller = require("../controllers/controllerUsers");
const express = require("express");
const router = express.Router();

router.post("/", controller.criar);
router.post("/login", controller.login);
router.post("/renovar", controller.renovaToken)

module.exports= router;