var express = require("express");
var app = express();
var request = require("request");

//caling checkFor data func to populate DB when the app starts
var dataCheck = require("./db/index").checkForData;

// seting .ejs as a default view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


// requiring routes file
var indexRoute = require("./routes/index");

// using routes file
app.use("/", indexRoute);

//==================== APP LISTENER


app.listen(port = 3000, function () {
    console.log("App server started!")
})