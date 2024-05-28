const controller = require("../controllers/controllerNotes");
const express = require("express");
const router = express.Router();

router.get("/", controller.listarNotes);
router.get("/:id", controller.buscarPeloID,controller.obterNota);
router.post("/", controller.criar);
router.delete("/:id",controller.buscarPeloID,controller.remover);

module.exports = router;