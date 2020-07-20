const express = require("express");
const router = express.Router();

const userController = require("../controller/UserController");
const tripController = require("../controller/TripController");

router.use("/user", userController);
router.use("/trip", tripController);

module.exports = router;