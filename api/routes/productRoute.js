const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  getProducts,
  getProductsFromStore,
  getProductById,
  getProductByName,
  createProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/store", getProductsFromStore);
router.get("/:id", getProductById);
router.get("/:name", getProductByName);
router.post("/:store", createProduct);
module.exports = router;
