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

router.get("/coupons", getCoupons);
router.delete("/coupons/:id", deleteCoupon);
router.post("/coupons", createCoupon);

router.post("/", createDiscount);
router.delete("/:id", deleteDiscount);
router.get("/:store/:id", addDiscountToProduct);

router.get("/:store", getDiscounts);

module.exports = router;
