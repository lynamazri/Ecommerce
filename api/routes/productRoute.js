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
  createReport,
  updateProduct,
  addProductWish,
  searchProducts,
  deleteProductWish,
  deleteProductImage,
  addProductImage,
} = require("../controllers/productController");

router.get("/", getProducts); //tested, works
router.get("/search/:fsearch/category/:category", searchProducts); //tested, works
router.get("/:store", getProductsFromStore); //tested, works
router.get("/store/:id", getProductById); //tested, works
router.get("/allProducts/:name", getProductByName); //tested, works
router.post("/:product/review/:user", createReview); //tested, works, could be improved (can't review twice)
router.post("/:product/report/:review/user/:user", verification, createReport); //tested, works, could be improved (can't report self)
router.delete("/review/:id", deleteReview); //tested, works
router.post("/:product/question/:user", verification, createQuestion); //tested, works
router.delete("/question/:id", verification, deleteQuestion); //tested, works
router.patch("/verify/:id", verifyProduct); //tested, works, could be improved (don't verify already verified products)
router.post("/:user/product/:product", addProductWish); //tested, works
router.delete("/:id", deleteProduct); //tested, works
router.patch("/:id", updateProduct); //tested, works
router.post("/:store", createProduct); //tested, works
router.delete("/:user/product/:product", deleteProductWish); //tested, works
router.delete("/product/images/:imgId", deleteProductImage); //tested, works
router.post("/:product/images", addProductImage); //tested, works

module.exports = router;
