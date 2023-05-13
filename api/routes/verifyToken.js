const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  /*   const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied.");

  try {
    const verification = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verification;
    next();
  } catch (error) {
    res.status(400).send("Invalid Access Token.");
  } */

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.id;
    next();
  });
}

module.exports = auth;
