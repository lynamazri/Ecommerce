const express = require("express");
const router = express.Router();

const {
  getStoreOrders,
  getUserOrders,
  createOrder,
  cancelOrder,
  handleOrder,
  refuseOrder,
  returnItem,
} = require("../controllers/orderController");

router.get("/:store", getStoreOrders);
router.get("/completed/:user", getUserOrders);
router.post("/checkout/:user", createOrder);
router.delete("/:order", cancelOrder);
router.patch("/:order", handleOrder);
router.delete("/refuse/:order", refuseOrder);
router.patch("/return/:order", returnItem);

module.exports = router;
