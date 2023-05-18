const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  updateProfile,
  updatePassword,
} = require("../controllers/profileController");

router.patch("/password", verification, updatePassword);

router.patch("/", verification, updateProfile);

module.exports = router;
