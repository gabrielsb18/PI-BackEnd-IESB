const controller = require("../controllers/controllerUsers");
const middleware = require("../middlewares/validatoken");
const express = require("express");
const router = express.Router();

router.get("/", middleware.validaToken, controller.obterUser);
router.post("/", controller.criar);
router.post("/login", controller.login);
router.post("/renovar", controller.renovaToken)

module.exports= router;