const express = require("express");
const router = express.Router();

const {
  nUsers,
  nStores,
  nProducts,
  nReports,
  nComplaints,
  nOrders,
  usersWithCount,
  storesWithCount,
  storeWithCount,
  nSalesUser,
  nSalesUserMonth,
  storeReviews,
} = require("../controllers/statsController");

router.get("/users", nUsers); //tested, works
router.get("/store", storesWithCount); //tested, works
router.get("/store/:store", storeWithCount); //tested, works
router.get("/store/reviews/:store", storeReviews);

module.exports = router;
