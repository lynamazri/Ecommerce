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

router.patch("/password/:user", verification, updatePassword);
router.patch("/:user", verification, updateProfile);
router.post("/:user", verification, createComplaint);
router.post("/:user/wishlist", verification, createWish);
router.get("/:user/wishlist", verification, getWishlist);

module.exports = router;
