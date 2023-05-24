const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  updateProfile,
  updatePassword,
  createComplaint,
} = require("../controllers/profileController");

router.patch("/password", verification, updatePassword);
router.patch("/", verification, updateProfile);
router.post("/", verification, createComplaint);

module.exports = router;
