const express = require("express");
const router = express.Router();
const verification = require("./verifyToken");

const {
  createStore,
  verifyStore,
  getStores,
  editStore,
  deleteStore,
} = require("../controllers/storeController");

router.post("/", verification, createStore);
router.patch("/:id", verifyStore);
router.get("/", getStores);
router.patch("/", verification, editStore);
router.delete("/:id", verification, deleteStore);

module.exports = router;
