const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  getProducts,
  getProductsFromStore,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/store", getProductsFromStore);

module.exports = router;
