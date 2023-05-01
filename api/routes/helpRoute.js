const { Router } = require("express");

const router = Router();

const help = require("../help");

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

module.exports = router;
