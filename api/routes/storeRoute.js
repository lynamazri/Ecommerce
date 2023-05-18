const express = require("express");
const router = express.Router();
const verification = require("./verifyToken");

const { createStore } = require("../controllers/storeController");

router.post("/", verification, createStore);

module.exports = router;
