const STATUS_CODE = require("../services/status-code");
const Trip = require("../query/TripQuery");
const User = require("../query/UserQuery");

exports.createFakeTrips = async function(req,res){
    var passangers = await User.getUsers(false);
    var drivers = await User.getUsers(true);

    var pCount = passangers.result.length;
    var dCount = drivers.result.length;
    if(pCount === 0 || dCount === 0){
        return STATUS_CODE.SC_200(res, {code: "success", result: [], message: "Trip cannot be created."});
    }

    var pRandom = 0;
    var dRandom = 0;
    do{
        pRandom = Math.floor(Math.random() * pCount);
    }while(pRandom === 0);

    do{
        dRandom = Math.floor(Math.random() * dCount);
    }while(dRandom === 0);

    var passangerId = passangers.result[pRandom]._id;
    var driverId = passangers.result[dRandom]._id;

    var result = await Trip.createFakeTrip(passangerId, driverId);
    return STATUS_CODE.SC_201(res, result);
}


exports.getAllTrips = async function(req,res){
    var result = await Trip.getAllTrips();
    return STATUS_CODE.SC_200(res, result);
}


exports.getTrip = async function(req,res){
    var result = await Trip.getTrip(req.params.id);
    return STATUS_CODE.SC_200(res, result);
}