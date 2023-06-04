const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  updateProfile,
  updatePassword,
  createComplaint,
  createWish,
  getWishlist,
} = require("../controllers/profileController");

router.patch("/password", verification, updatePassword);
router.patch("/:userId", verification, updateProfile);
router.post("/", verification, createComplaint);
router.post("/wishlist", verification, createWish);
router.get("/:user/wishlist", verification, getWishlist);

module.exports = router;
