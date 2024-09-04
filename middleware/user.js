const { User } = require("../db");
const Router = require("express");
const router = Router();

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  const data = await User.findOne({
    username,
    password,
  });
  if (data) {
    next();
  } else {
    res.status(403).json({
      msg: "User doesn't exist",
    });
  }
}
module.exports = userMiddleware;
