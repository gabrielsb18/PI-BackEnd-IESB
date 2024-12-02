const controller = require("../controllers/controllerNotes");
const middleware = require("../middlewares/validatoken");
const express = require("express");
const router = express.Router();

router.get("/", middleware.validaToken,controller.listarNotes);
router.get("/search", middleware.validaToken, controller.pesquisaNotas);
router.get("/:id", middleware.validaToken, controller.buscarPeloID, controller.obterNota);
router.post("/", middleware.validaToken, controller.validaDados,controller.criar);
router.put("/:id", middleware.validaToken, controller.buscarPeloID, controller.validaDados, controller.atualizar);
router.delete("/:id", middleware.validaToken, controller.buscarPeloID, controller.remover);

module.exports = router;