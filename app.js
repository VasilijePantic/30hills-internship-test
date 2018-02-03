var express = require("express");
var app = express();
// var mongoose = require("mongoose");
var request = require("request");
var dataCheck = require("./db/index").checkForData;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));



//=========================================
//              ROUTES
//=========================================

// ROOT ROUTE - /
app.get("/", function(req,res){
    res.render("search");
})

// RESULTS ROUTE
app.get("/results", function(req, res){
    res.render("results")
})




//==================== APP LISTENER
app.listen(port=3000, function(){
    console.log("App server started!")
})