var express = require("express");
var router = express.Router();
var User = require("../models/user");
var _ = require("lodash");



// ROOT ROUTE - 
router.get("/", function (req, res) {
  res.render("search");
});

//====================
// DIRECT FRIENDS ROUTE
//====================
router.get("/friends", function (req, res) {
  // we take user id from req.query and store it in a var - user_id
  var user_id = req.query.user_id;
  // find on with the specific if in the database
  User.findOne({ id: user_id }, function (err, user) {
    if (err) {
      return res.render("results", { data: err });
    }
    // store data of users direct friends in var firends_array
    var friends_array = user.friends;
    var friends_data = [];//empty array of now

    // loop through the array of users direct friends
    for (var i = 0; i < friends_array.length; i++) {
      //find every direct friend and ---->>>
      User.findOne({ id: friends_array[i] }, function (err, friends) {
        if (err) {
          return res.render("results", { data: err });
        }
        // ---->>> push in in an empty array
        friends_data.push(friends);
        // to make sure that you have all the friends
          //check if the lenghts of both arrays are the same--->>
        if (friends_data.length === friends_array.length) {
          //--->> if they are, reder results.ejs page with data from friends_data array
          return res.render("results", { data: friends_data });
        }
      });
    };
  });
});


//====================
// FRIENDS OF FRIEND ROUTE
//====================
router.get('/friends-of-friends', function (req, reply) {
  // request users id and stores it var userID
  var userID = Number(req.query.user_id);

  // find our wanted user with the id
  User.findOne({ id: userID }, function (err, user) {
    // Handle errors
    if (err) {
      return reply.render("error", { url: req.url });
    };
    // if no user
    if (user.length === 0) {
      return reply.render ("404", {data: "User does not exist"})
    };

    // friendsOfFriendsList - empty array for now
    let friendsOfFriendsList = [];

    // loop through users friends
    _.forEach(user.friends, (friend, i) => {
      // find one using id
      User.findOne({ id: friend }, (err, friendOfAFriend) => {
        if (err) {
          return reply.render("404", { url: req.url });
        };
        // now loop through friends from friendOfAFriend
        _.forEach(friendOfAFriend.friends, (item, j) => {
          // if users id is not there --->>>
          if (userID !== item) {
            // push it in a previously empty array 
            friendsOfFriendsList.push(item);
          };
          
          if (i === user.friends.length - 1 && j === friendOfAFriend.friends.length - 1) {
            // makes an array array of array values and stores it in - friendsOfFriendsList
            friendsOfFriendsList = _.difference(friendsOfFriendsList, user.friends);
            // remove duplicates with _.uniq from - friendsOfFriendsList
            friendsOfFriendsList = _.uniq(friendsOfFriendsList);

            // friendsOfFriendsData - empty array for now
            var friendsOfFriendsData = [];

            //after removing duplicates, loop through firendsOfFriendList
            _.forEach(friendsOfFriendsList, (id, iterator) => {
              // and find one from the db
              User.findOne({ id: id }, (err, friendData) => {
                if (err) { // if not found, render 404.ejs
                  return reply.render("404", { data: err });
                };
                // if found, push it in an empty array
                friendsOfFriendsData.push(friendData)

                //
                if (iterator === (friendsOfFriendsList.length - 1)) {
                  console.log("Calling");
                  return reply.render("results", { data: friendsOfFriendsData });
                };
              });
            });

          };
        });
      });
    });
  });
});


module.exports = router;