// ALL NodeJs Libraries
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


// All Custom Routes and Services and Helpers And Models
const APIs = require("./src/services/apis");


// Custom Services
const config = require("./config");


// Database Connection URL And PORT
const URL = config.db_config.protocol+"://"+config.db_config.host+"/"+config.db_config.database;
const PORT = config.db_config.port || process.env.PORT;



//Connect to MongoDB
mongoose.connect(URL,{ useNewUrlParser: true });
mongoose.connection
    .once('open',() => console.log("Connected!"))
    .on('error',(error) => {
        console.warn('Warning',error);
    });
mongoose.Promise = global.Promise;


// Set Up View Engine
app.set('view engine','ejs');


// Form URL Encoded Method
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Header Controls
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, x-refresh-token");
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, PATCH");
        return res.status(200).json({});
    }
    next();
});


// Start server
app.listen(PORT,function(){
    console.log("Server started at "+PORT);
});


// ALL API List
app.use("/api",APIs);


// Render The API when it is attempting on root '/' like this
app.get("/",function(req,res){
    res.render("home");
});