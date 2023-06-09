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
  editBanner,
  getStoreBanner,
  getStoreFromUser,
} = require("../controllers/storeController");

router.patch("/:id", verifyStore); //tested, works
router.get("/", getStores); //tested, works
router.get("/mystore/:user", getStoreFromUser); //tested, works
router.get("/banner/:store", getStoreBanner); //tested, works
router.patch("/edit/:store", editStore); //tested, works
router.get("/reviews/:id", getReviews); //tested, works
router.get("/questions/:id", getQuestions); //tested, works
router.patch("/questions/answer/:id", answerQuestion); //tested, works
router.delete("/:id", verification, deleteStore); //tested, works
router.post("/open/:user", verification, createStore); //tested, works
router.patch("/edit/banner/:store", editBanner); //tested, works

module.exports = router;
