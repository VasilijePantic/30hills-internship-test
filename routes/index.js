var express = require("express");
var router = express.Router();
var User = require("../models/user");

// ROOT ROUTE - /
router.get("/", function(req,res){
    res.render("search");
})

// RESULTS ROUTE
router.get("/results", function(req, res){
    var user_id = req.query.user_id;

    User.findOne({id: user_id}, function(err, user){
        if(err){
            return res.render("results", {data: err});
        }
        var friends_array = user.friends;
        var friends_data = [];

        // going thru list
        for(var i = 0; i < friends_array.length;i++){
            User.findOne({id: friends_array[i]}, function(err, friends){
                if(err){
                    return res.render("results",{data: err});
                }
                friends_data.push(friends);
                // to make sure that you have all the friends - asinhrono
                if(friends_data.length === friends_array.length){
                    return res.render("results", {data: friends_data});
                }
            });
        }
    });
});




module.exports = router;