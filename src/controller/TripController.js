const express = require("express");
const router = express.Router();

const TripHelper = require("../helper/TripHelper");

// Creating
router.post("/createFakeTrip", TripHelper.createFakeTrips);

// Reading
router.get("/getAllTrips", TripHelper.getAllTrips);
router.get("/getTrip/:id", TripHelper.getTrip);

module.exports=router;