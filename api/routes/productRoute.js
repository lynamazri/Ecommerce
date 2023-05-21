const express = require("express");
const router = express.Router();

const verification = require("./verifyToken");

const {
  getProducts,
  getProductsFromStore,
  getProductById,
  getProductByName,
  createProduct,
  createReview,
  deleteReview,
  createQuestion,
  deleteQuestion,
  deleteProduct,
  verifyProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:store", getProductsFromStore);
router.get("/store/:id", getProductById);
router.get("/allProducts/:name", getProductByName);
router.post("/:store", createProduct);
router.post("/:product/review", verification, createReview);
router.delete("/review/:id", verification, deleteReview);
router.post("/:product/question", verification, createQuestion);
router.delete("/question/:id", verification, deleteQuestion);
router.delete("/:id", deleteProduct);
router.patch("/:id", verifyProduct);

module.exports = router;
