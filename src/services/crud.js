const Model = require("./model");

module.exports = {
    createDocument,
    readDocument,
    setOneDocument
};

// Create A New Document
async function createDocument(CurrentModel, obj){
    return new Promise((resolve, reject) => {
        new Model.getModel(CurrentModel)(obj)
        .save().then((data)=>{
            return resolve({
                code: "success",
                result: [data]
            });
        })
        .catch((err)=>{
            console.log("Error in inserting a new document: "+err);
            return reject({
                code: "error",
                result: []
            });
        });
    });
}

// Read A New Document
async function readDocument(CurrentModel, findObject){
    return new Promise((resolve, reject) => {
        Model.getModel(CurrentModel)
        .find(findObject)
        .then((data) => {
            return resolve({
                code: "success",
                result: data
            });
        })
        .catch((err) => {
            console.log("Error in retrieving response: "+err);
            return reject({
                code: "error",
                result: []
            });
        });
    });
}

// Update the Document
function setOneDocument(CurrentModel, condition, setObject, callback){
    Model.getModel(CurrentModel)
    .updateOne(
        condition,
        setObject
    ).then((data)=>{
            callback({
                received: 1,
                result: data
            });
    }).catch((err)=>{
        console.log("Error in update single document: "+err);
        callback({
            received: 0,
            result: []
        });
    });
}