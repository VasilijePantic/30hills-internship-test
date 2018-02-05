var fs = require("fs");
var User = require("../models/user");
// var data = require('./data.json')
var path = require("path");

function populateDB(){
    var list = fs.readFileSync(path.join(__dirname, 'data.json'));

    var json_list = JSON.parse(list);
    
    // loop thru json_list and create a user with set parameters from the read file
    for(var i = 0; i < json_list.length;i++){
    
        // user parameters
        var user = {
            id: json_list[i]["id"],
            firstName: json_list[i]["firstName"],
            surname: json_list[i]["surname"],
            age: json_list[i]["age"],
            gender: json_list[i]["gender"],
            friends: json_list[i]["friends"]
        };
    
         User.create(user, function(err, user){
             if(err){
                 console.log("ERROR: " + err);
             }
         })
    }
}

function checkForData(){
    User.find(function (err, user) {
        if (err){
            console.log("ERROR");
        }

        if(user.length === 0) {
            populateDB();
            console.log("Database populated!");
        } else {
            console.log("Database ready!");
        }

    });
}

checkForData();

module.exports.checkForData = checkForData;