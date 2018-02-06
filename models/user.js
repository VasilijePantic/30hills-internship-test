var mongoose = require("mongoose");

// db configuration and schema
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/30hills");
var userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    surname: String,
    age: Number,
    gender: String,
    friends: [
        Number
    ]
});
var User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);