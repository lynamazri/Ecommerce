const express = require("express");
const router = express.Router();

//for private routes
//const verification = require("./verifyToken");
//add verification to the route middleware

//easier method to protect is here https://www.youtube.com/watch?v=f2EqECiTBL8 @ 4:36:40

const help = require("../data/help");

router.get("/help/buying", (req, res) => {
  let buying = help.filter((article) => {
    return article.category == "Buying";
  });

  console.log(buying);
  res.send(buying);
});

router.get("/help/selling", (req, res) => {
  let selling = help.filter((article) => {
    return article.category == "Selling";
  });

  console.log(selling);
  res.send(selling);
});
router.get("/help/account", (req, res) => {
  let account = help.filter((article) => {
    return article.category == "Account";
  });

  console.log(account);
  res.send(account);
});
router.get("/help/ship", (req, res) => {
  let ship = help.filter((article) => {
    return article.category == "Shipping & Delivery";
  });

  console.log(ship);
  res.send(ship);
});
router.get("/help/other", (req, res) => {
  let other = help.filter((article) => {
    return article.category == "Other";
  });

  console.log(other);
  res.send(other);
});
router.get("/help/return", (req, res) => {
  let refund = help.filter((article) => {
    return article.category == "Returns & Refunds";
  });

  console.log(refund);
  res.send(refund);
});

module.exports = router;
