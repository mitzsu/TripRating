const express = require("express");
const router = express.Router();

const UserHelper = require("../helper/UserHelper");

// Creating
router.post("/createFakePassanger", UserHelper.createFakePassanger);
router.post("/createFakeDriver", UserHelper.createFakeDriver);

// Reading
router.get("/getPassangers", UserHelper.getPassangers);
router.get("/getDrivers", UserHelper.getDrivers);
router.get("/getUser/{id}", UserHelper.getUser);

module.exports=router;