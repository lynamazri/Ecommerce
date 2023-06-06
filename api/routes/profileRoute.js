const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  updateProfile,
  updatePassword,
  createComplaint,
  getWishlist,
  getUsernameFromId,
} = require("../controllers/profileController");

router.patch("/password/:user", verification, updatePassword); //tested, works
router.patch("/:user", verification, updateProfile); //tested, works
router.post("/:user", verification, createComplaint); //tested, works
//router.post("/:user/wishlist", verification, createWish); //deleted
router.get("/wishlist/:user", getWishlist); //tested, works
router.get("/username/:user", getUsernameFromId); //tested, works

module.exports = router;
