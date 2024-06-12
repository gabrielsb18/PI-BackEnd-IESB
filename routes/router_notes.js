const controller = require("../controllers/controllerNotes");
const express = require("express");
const router = express.Router();

router.get("/", controller.listarNotes);
router.get("/:id", controller.buscarPeloID, controller.obterNota);
router.post("/", controller.validaDados,controller.criar);
router.put("/:id", controller.buscarPeloID, controller.validaDados, controller.atualizar);
router.delete("/:id",controller.buscarPeloID, controller.remover);

module.exports = router;