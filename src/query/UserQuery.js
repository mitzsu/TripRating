const mongoose = require("mongoose");
const faker = require("faker");

const UserModel = require("../model/UserModel");
const CRUD = require("../services/crud");


module.exports={
    createFakeUser,
    getUsers,
    getUser
}


// Create New Fake User
async function createFakeUser(isDriver){
    var user = await CRUD.createDocument(
                        UserModel,
                        {
                            _id: new mongoose.Types.ObjectId,
                            fullname: faker.name.firstName()+" "+faker.name.lastName(),
                            email: faker.internet.email(),
                            password: "$2b$10$N6bMluWnTHkSfdzpPBelmOiqAKhDKjsFtXAZDw6rri5xei4VWPkIG", //tars123
                            age: faker.random.number(),
                            gender: 'Male',
                            phone: faker.phone.phoneNumber(),
                            image: faker.image.imageUrl(),
                            is_driver: isDriver,
                            aggr_rating: 0
                        }
                    );
    if(user.code === "success"){
        user.message = ((!isDriver)?"Passanger":"Driver")+" is created successfully";
    }
    else{
        user.message = "There is an error";
    }
    return user;
}


// Find Users
async function getUsers(isDriver){
    var users = await CRUD.readDocument(UserModel, { is_driver: isDriver });
    if(users.code === "success"){
        users.message = ((!isDriver)?"Passangers":"Drivers")+" are found";
    }
    else{
        users.message = "There is an error";
    }
    return users;
}


// Find User By Id
async function getUser(id){
    var user = await CRUD.readDocument(UserModel, { _id: mongoose.Types.ObjectId(id) });
    if(user.code === "success"){
        user.message = "User is found";
    }
    else{
        user.message = "There is an error";
    }
    return user;
}