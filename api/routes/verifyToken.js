const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied.");

  try {
    const verification = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verification;
    next();
  } catch (error) {
    res.status(400).send("Invalid Access Token.");
  }
}

module.exports = auth;
