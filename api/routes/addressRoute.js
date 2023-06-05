const express = require("express");
const router = express.Router();

const {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} = require("../controllers/addressController");

router.get("/all/:user", getAddresses); //tested, works

router.post("/:user", createAddress); //tested, works

router.delete("/:id", deleteAddress); //tested, works
router.patch("/:id", updateAddress); //tested, works
module.exports = router;
