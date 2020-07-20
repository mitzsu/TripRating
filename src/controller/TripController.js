const express = require("express");
const router = express.Router();

const TripHelper = require("../helper/TripHelper");

// Creating
router.post("/createFakeTrip", TripHelper.createFakeTrips);

// Reading
router.get("/getAllTrips", TripHelper.getAllTrips);
router.get("/getTrip/:id", TripHelper.getTrip);
router.get("/getTripsByUser/:id/:is_driver", TripHelper.getTripsByUser);

// Updating document
router.post("/ratingByUser", TripHelper.ratingByUser);

module.exports=router;