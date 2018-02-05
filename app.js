var express = require("express");
var app = express();
// var mongoose = require("mongoose");
var request = require("request");
var dataCheck = require("./db/index").checkForData;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


// requiring routes
var indexRoute = require("./routes/index");





// using routes
app.use("/", indexRoute);

//==================== APP LISTENER
app.listen(port=3000, function(){
    console.log("App server started!")
})