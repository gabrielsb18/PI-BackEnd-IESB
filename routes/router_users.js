const controller = require("../controllers/controllerUsers");
const middleware = require("../middlewares/validatoken");
const ControllerUsersAvatar = require("../controllers/controllerUsersAvatar");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const uploadConfig = require("../config/upload");
const upload = multer(uploadConfig.MULTER)

const controllerUsersAvatar = new ControllerUsersAvatar();

router.get("/", middleware.validaToken, controller.obterUser);
router.patch("/avatar", middleware.validaToken, upload.single("avatar"), controllerUsersAvatar.update);
router.put("/:id", middleware.validaToken, controller.atualizar);
router.post("/", controller.criar);
router.post("/login", controller.login);
router.post("/renovar", controller.renovaToken)

module.exports= router;