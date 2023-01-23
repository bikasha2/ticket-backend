const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./users");
// const path = require("path");

// Check health
router.get('/health', (req, res) => {
    res.json({status: 'alive'});
  });
// user Routes
router.use("/api/users", userRoutes);
// api Routes
router.use("/api", apiRoutes);

module.exports = router;

