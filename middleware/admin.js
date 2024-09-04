const { Admin } = require("../db");
async function adminMiddleware(req, res, next) {
  //Implement auth logic
  const { username, password } = req.headers;
  const data = await Admin.findOne({
    username,
    password,
  });
  if (data) {
    next();
  } else {
    res.status(403).json({
      msg: "Admin Dosen't Exist",
    });
  }
}
module.exports = adminMiddleware;
