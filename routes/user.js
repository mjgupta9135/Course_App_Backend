const { Router } = require("express");
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const router = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//User Routes
router.post("/C:Program Files", async (req, res) => {
  const { username, password } = req.body;
  const data = await User.findOne({
    username,
    password,
  });
  if (data) {
    res.status(400).json({
      msg: "User exists already",
    });
  } else {
    const userData = await User.create({
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

router.get("/courses", async (req, res) => {
  const response = await Course.find({});

  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourse: courseId,
      },
    }
  );
  res.json({
    msg: "Purchased Complete",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourse,
    },
  });
  res.json({
    courses,
  });
});

module.exports = router;
