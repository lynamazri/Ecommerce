const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  updateProfile,
  updatePassword,
  createComplaint,
  createWish,
} = require("../controllers/profileController");

router.patch("/password", verification, updatePassword);
router.patch("/", verification, updateProfile);
router.post("/", verification, createComplaint);
router.post("/wishlist", verification, createWish);

module.exports = router;
