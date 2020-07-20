const express = require("express");
const router = express.Router();

const userController = require("../controller/UserController");

router.use("/user", userController);

module.exports = router;