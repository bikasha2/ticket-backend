const router = require("express").Router();
const auth = require("../../middleware/auth");
// import controllers
const UserController = require("../../controllers/usersController");

// uses /api/users

router.get("/", auth, UserController.getAllUsers);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user", auth, UserController.getUser);

module.exports = router;