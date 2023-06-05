const express = require("express");
const router = express.Router();
const verification = require("./verifyToken");

const {
  createStore,
  verifyStore,
  getStores,
  editStore,
  deleteStore,
  getReviews,
  getQuestions,
  answerQuestion,
} = require("../controllers/storeController");

router.post("/:user", verification, createStore);
router.patch("/:id", verifyStore);
router.get("/", getStores); //tested, works
router.patch("/", verification, editStore);
router.delete("/:id", verification, deleteStore);
router.get("/reviews/:id", getReviews);
router.get("/questions/:id", getQuestions);
router.patch("/:question", answerQuestion);

module.exports = router;
