const controller = require("../controllers/controllerNotes");

router.get("/", controller.listarNotes);

router.get("/:id", controller.listarNotaPeloID);

