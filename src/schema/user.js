const mongoose = require("mongoose");

module.exports = {
    _id:{
        type: mongoose.Schema.Types.ObjectId
    },
    fullname:{
        type: String,
        required: true
    },
    email:{
            type:String,
            required:true,
            unique:true,
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String
    },
    age: {
        type: Number
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    is_driver:{
        type: Boolean,
        required: true
    },
    aggr_rating:{
        type: Number,
        default: 0
    },
    created_time: {
        type: Date,
        default: Date.now
    }
};