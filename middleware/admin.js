require("dotenv").config();
const jwt = require("jsonwebtoken");

async function adminMiddleware(req, res, next) {
  const data = req.headers.authorization;
  const word = data.split(" ");
  const token = word[1];
  const verifiedData = jwt.verify(token, process.env.jwt_secret);
  if (verifiedData.username) {
    next();
  } else {
    res.status(403).json({
      msg: "You are not authenticated",
    });
  }
}
module.exports = adminMiddleware;
