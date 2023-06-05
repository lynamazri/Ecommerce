const express = require("express");
const router = express.Router();

const {
  createDiscount,
  addDiscountToProduct,
  createCoupon,
  deleteCoupon,
  getCoupons,
  getDiscounts,
  deleteDiscount,
} = require("../controllers/discountController");

router.get("/coupons", getCoupons); //tested, works
router.delete("/coupons/:id", deleteCoupon); //tested, works
router.post("/coupons", createCoupon); //tested, works
router.post("/store/:store", createDiscount); //tested, works
router.delete("/:id", deleteDiscount); //tested, works
router.post("/:store/products/:productId", addDiscountToProduct); //tested, works
router.get("/:store", getDiscounts); //tested, works

//removeDiscountFromProduct

module.exports = router;
