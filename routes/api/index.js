const router = require("express").Router();
//import auth middleware
const auth = require("../../middleware/auth");
// import controllers
const controller = require("../../controllers/ticketController");


// Routes for showing, creating and deleting tickets
router.get("/tickets", auth, controller.findAll);
router.get("/ticket/:id", auth, controller.findOne);
router.post("/tickets", controller.save);
router.delete("/ticket/:id", auth, controller.delete);

module.exports = router;