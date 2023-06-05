const express = require("express");
const router = express.Router();

const {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} = require("../controllers/addressController");

router.get("/all/:user", getAddresses);

router.post("/", createAddress);

router.delete("/:id", deleteAddress);
router.delete("/:id", updateAddress);
module.exports = router;
