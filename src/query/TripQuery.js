const mongoose = require("mongoose");
const faker = require("faker");

const TripModel = require("../model/TripModel");
const CRUD = require("../services/crud");


module.exports={
    createFakeTrip,
    getAllTrips,
    getTrip
}


// Create New Fake User
async function createFakeTrip(passangerId, driverId){
    var trip = await CRUD.createDocument(
                        TripModel,
                        {
                            _id: new mongoose.Types.ObjectId,
                            passanger_id: mongoose.Types.ObjectId(passangerId),
                            driver_id: mongoose.Types.ObjectId(driverId),
                            distance: faker.random.number()
                        }
                    );
    if(trip.code === "success"){
        trip.message = "Trip is created successfully";
    }
    else{
        trip.message = "There is an error";
    }
    return trip;
}


// Find all trips
async function getAllTrips(){
    var trips = await CRUD.readDocument(TripModel, {});
    if(trips.code === "success"){
        trips.message = "Trips are found";
    }
    else{
        trips.message = "There is an error";
    }
    return trips;
}


// Find A Trip
async function getTrip(id){
    var trip = await CRUD.readDocument(TripModel, { _id: mongoose.Types.ObjectId(id) });
    if(trip.code === "success"){
        trip.message = "Trip is found";
    }
    else{
        trip.message = "There is an error";
    }
    return trip;
}