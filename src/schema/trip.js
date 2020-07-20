const mongoose = require("mongoose");

module.exports = {
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    passanger_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    driver_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    distance:{
        type: Number
    },
    start_time: {
        type: Date,
        default: Date.now
    },
    end_time: {
        type: Date,
        default: Date.now
    },
    rating_by_passanger:{
        rate: {
            type: Number
        },
        comment:{
            type: String
        }
    },
    rating_by_driver:{
        rate: {
            type: Number
        },
        comment:{
            type: String
        }
    }
};