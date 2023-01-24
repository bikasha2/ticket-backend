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
router.put('/ticket/completed/:id', controller.findOneUpdateComplete)
router.put('/ticket/uncompleted/:id', controller.findOneUpdateunComplete)
router.put('/ticket/assigne/:id', controller.findOneUpdateAssigne)
router.put('/ticket/comment/:id', controller.updateComment)

module.exports = router;