const { Router } = require("express");
const listController = require("../controllers/listController");
const cw = require("./controllerErrorWrapper");

const router = new Router(); // Même chose que `const router = Router()`

router.get("/lists", cw(listController.getAllLists)); // controller wrapper
router.get("/lists/:id", cw(listController.getOneList));
router.post("/lists", cw(listController.createList));
router.patch("/lists/:id", cw(listController.updateList));
router.delete("/lists/:id", cw(listController.deleteList));

module.exports = router;
