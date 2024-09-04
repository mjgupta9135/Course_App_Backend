const { Router } = require("express");
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const router = Router();

//User Routes
router.post("/signup", async (req, res) => {
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
    await User.create({
      username,
      password,
    });
    res.json({
      msg: "User Signed Up successfully",
    });
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

router.get("/purchasedCourses", async (req, res) => {
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
