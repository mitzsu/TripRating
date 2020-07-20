const STATUS_CODE = require("../services/status-code");
const User = require("../query/UserQuery");

exports.createFakePassanger = async function(req,res){
    var result = await User.createFakeUser(false);
    return STATUS_CODE.SC_201(res, result);
}

exports.createFakeDriver = async function(req,res){
    var result = await User.createFakeUser(true);
    return STATUS_CODE.SC_201(res, result);
}

exports.getPassangers = async function(req,res){
    var result = await User.getUsers(false);
    return STATUS_CODE.SC_200(res, result);
}

exports.getDrivers = async function(req,res){
    var result = await User.getUsers(true);
    return STATUS_CODE.SC_200(res, result);
}

exports.getUser = async function(req,res){
    var result = await User.getUser(req.params.id);
    return STATUS_CODE.SC_200(res, result);
}