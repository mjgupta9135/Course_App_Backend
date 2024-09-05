const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//Admin routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const data = await Admin.findOne({
    username,
    password,
  });
  if (data) {
    res.status(400).json({
      msg: "User exists already",
    });
  } else {
    const userData = await Admin.create({
      username,
      password,
    });
    try {
      const payload = { username: userData.username };
      const token = jwt.sign(payload, process.env.jwt_secret);
      res.json({
        token: token,
        msg: "User Signed Up successfully",
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink,
  });
  res.json({
    msg: "Course Created Successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});
  res.json({
    courses,
  });
});

module.exports = router;
