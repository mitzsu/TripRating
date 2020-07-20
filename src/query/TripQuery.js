const mongoose = require("mongoose");
const faker = require("faker");

const TripModel = require("../model/TripModel");
const UserModel = require("../model/UserModel");
const CRUD = require("../services/crud");


module.exports={
    createFakeTrip,
    getAllTrips,
    getTrip,
    getTripsByUser,
    rateThisTrip
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
        trips.message = "Trips are "+( (trips.result.length===0)?"not ":"" )+"found";
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
        trip.message = "Trip is "+( (trip.result.length===0)?"not ":"" )+"found";
    }
    else{
        trip.message = "There is an error";
    }
    return trip;
}


async function getTripsByUser(userId, isDriver){
    var searchCondition = {};
    if(isDriver){
        searchCondition.driver_id =  mongoose.Types.ObjectId(userId);
    }
    else{
        searchCondition.passanger_id =  mongoose.Types.ObjectId(userId);
    }
    var trips = await CRUD.readDocument(TripModel, searchCondition);
    if(trips.code === "success"){
        trips.message = "Trips are "+( (trips.result.length===0)?"not ":"" )+"found";
    }
    else{
        trips.message = "There is an error";
    }
    return trips;
}


// Rate The Trip
async function rateThisTrip(obj){
    var tripId = obj.trip_id;
    var userId = obj.user_id;
    var isDriver = obj.is_driver;
    var rating = obj.rating;
    var comment = obj.comment;

    if(rating>5 || rating<0)
        return {code: "error", result: [], message: "Rating would be from 0 to 5"};

    var searchCondition = {
        _id: mongoose.Types.ObjectId(tripId)
    };
    if(isDriver){
        searchCondition.driver_id =  mongoose.Types.ObjectId(userId);
    }
    else{
        searchCondition.passanger_id =  mongoose.Types.ObjectId(userId);
    }

    var currentTrip = await getTrip(tripId);
    if(currentTrip.result.length === 0){
        return {code: "success", result: [], message: "No trip was found"};
    }

    if(isDriver){
        if(currentTrip.result[0].driver_id.toString()!==userId){
            return {code: "success", result: [], message: "Invalid driver!"};
        }
        let temp = JSON.stringify(currentTrip.result[0]);
        let obj = JSON.parse(temp);
        if(obj.hasOwnProperty("rating_by_driver")){
            return {code: "success", result: [], message: "Already rated by driver"};
        }
    }else{
        if(currentTrip.result[0].passanger_id.toString()!==userId){
            return {code: "success", result: [], message: "Invalid passanger!"};
        }
        let temp = JSON.stringify(currentTrip.result[0]);
        let obj = JSON.parse(temp);
        if(obj.hasOwnProperty("rating_by_passanger")){
            return {code: "success", result: [], message: "Already rated by paasanger"};
        }
    }

    var setJSON = {
        rate: rating,
        comment: comment
    };

    await CRUD.setOneDocument(TripModel, searchCondition,
            (isDriver)? {rating_by_driver: setJSON} : {rating_by_passanger: setJSON}
    );
    
    searchCondition = {};

    if(!isDriver){
        searchCondition = {
            driver_id: mongoose.Types.ObjectId(userId),
            'rating_by_passanger': {$exists: true}
        };
    }
    else{
        searchCondition = {
            passanger_id: mongoose.Types.ObjectId(userId),
            'rating_by_driver': {$exists: true}
        };
    }

    var userRatedTrips = await CRUD.readDocument(TripModel, searchCondition,
        (isDriver)? {rating_by_driver: setJSON} : {rating_by_passanger: setJSON}
    );
    if(userRatedTrips.result.length>0){
        var sum = 0;
        for(var i=0; i<userRatedTrips.result.length; ++i){
            let temp = JSON.stringify(userRatedTrips.result[i]);
            let obj = JSON.parse(temp);
            if(isDriver){
                sum += obj.rating_by_driver.rate;
            }
            else{
                sum += obj.rating_by_passanger.rate;
            }
        }
        await CRUD.setOneDocument(UserModel,
            {_id: mongoose.Types.ObjectId(userId)},
            {
                aggr_rating: (sum/userRatedTrips.result.length)
            }
        );
    }
    return await getTrip(tripId);
}