var express = require("express");
var router  = express.Router();
var User    = require("../models/user");
var _       = require("lodash");

// ROOT ROUTE - /
router.get("/", function(req, res) {
  res.render("search");
})

// RESULTS ROUTE
router.get("/friends", function(req, res) {
  var user_id = req.query.user_id;

  User.findOne({id: user_id}, function(err, user) {
    if(err) {
      return res.render("results", {data: err});
    }
    var friends_array = user.friends;
    var friends_data  = [];

    // going thru list
    for(var i = 0; i < friends_array.length; i++) {
      User.findOne({id: friends_array[i]}, function(err, friends) {
        if(err) {
          return res.render("results", {data: err});
        }
        friends_data.push(friends);
        // to make sure that you have all the friends - asinhrono
        if(friends_data.length === friends_array.length) {
          return res.render("results", {data: friends_data});
        }
      });
    }
  });
});

router.get('/friends-of-friends', function(req, reply) {
  var userID = Number(req.query.user_id);

  // Find our wanted user
  User.findOne({id: userID}, function(err, user) {
    // Handle error
    if(err) {
      return reply.render('404', {url: req.url});
    }

    // We have here friends of friends array
    // We'll use it to find their friends info

    let friendsOfFriendsList = [];

    _.forEach(user.friends, (friend, i) => {
      User.findOne({id: friend}, (err, friendOfAFriend) => {
        if(err) {
          return reply.render('404', {url: req.url});
        }

        _.forEach(friendOfAFriend.friends, (item, j) => {
          if(userID !== item) {
            friendsOfFriendsList.push(item);
          }

          if(i === user.friends.length - 1 && j === friendOfAFriend.friends.length - 1) {
            friendsOfFriendsList = _.difference(friendsOfFriendsList, user.friends);
            friendsOfFriendsList = _.uniq(friendsOfFriendsList);

            var friendsOfFriendsData = [];

            _.forEach(friendsOfFriendsList, (id, iterator) => {
              User.findOne({id: id}, (err, friendData) => {
                if(err) {
                  return reply.render('result', {data: err});
                }
                friendsOfFriendsData.push(friendData)

                if(iterator === (friendsOfFriendsList.length - 1)) {
                  console.log('calling')
                  return reply.render("results", {data: friendsOfFriendsData});
                }
              })
            })

          }
        });
      });
    });
  });
});


module.exports = router;