const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

//Admin routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const data = await Admin.findOne({
    username,
    password,
  });
  if (data) {
    res.status(400).json({
      msg: "Admin exists already",
    });
  } else {
    await Admin.create({
      username,
      password,
    });
    res.json({
      msg: "Admin created successfully",
    });
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
