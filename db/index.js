var fs = require("fs");
var User = require("../models/user");
var path = require("path");



function populateDB() {
    //read data.json file and store it in the list var
    var list = fs.readFileSync(path.join(__dirname, 'data.json'));
    //parse it and store it in the json_list var
    var json_list = JSON.parse(list);

    // loop thru json_list and later create a user with set parameters from the read file(data.json)
    for (var i = 0; i < json_list.length; i++) {
        // users parameters from data.json
        var user = {
            id: json_list[i]["id"],
            firstName: json_list[i]["firstName"],
            surname: json_list[i]["surname"],
            age: json_list[i]["age"],
            gender: json_list[i]["gender"],
            friends: json_list[i]["friends"]
        };
        // creating a user
        User.create(user, function (err, user) {
            if (err) {
                console.log("ERROR: " + err);
            }
        });
    };
};

//function designed to check if there is any data in the db
function checkForData() {
    // try to find any data in the db
    User.find(function (err, user) {
        if (err) {
            console.log("ERROR");
        }
        //if no data ---> populate db
        if (user.length === 0) {
            //call populateDB func
            populateDB();
            console.log("Database populated!");
        } else {
            console.log("Database ready!");
        }
    });
}

//calling check for data func
checkForData();

module.exports.checkForData = checkForData;