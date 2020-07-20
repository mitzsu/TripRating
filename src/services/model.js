const UserModel = require("../model/UserModel");
const TripModel = require("../model/TripModel");

module.exports = {
    getModel
};

function getModel(CurrentModel){
    var model=null;
    switch(CurrentModel){
        case UserModel:
            model = UserModel;
            break;
        case TripModel:
            model = TripModel;
            break;
    }
    return model;
}