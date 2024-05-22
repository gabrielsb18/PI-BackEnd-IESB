const controller = require("../controllers/controllerNotes");
const express = require("express");
const router = express.Router();

router.get("/", controller.listarNotes);
router.get("/:id", controller.listarNotaPeloID);
router.post("/", controller.criar);

module.exports = router;