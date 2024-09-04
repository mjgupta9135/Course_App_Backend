const mongoose = require("mongoose");
const { url } = require("./private");

//connect to MongoDB
mongoose.connect(url);

//Define schema
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  imageLink: String,
});

//defining models

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

//Exports
module.exports = {
  Admin,
  User,
  Course,
};
