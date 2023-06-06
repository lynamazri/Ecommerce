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
router.post("/checkout/:user", createOrder); //tested, works
router.delete("/cancel/:order", cancelOrder);
router.patch("/shop/:order", handleOrder); //tested, works
router.delete("/refuse/:order", refuseOrder);
router.patch("/return/:order", returnItem);

module.exports = router;
