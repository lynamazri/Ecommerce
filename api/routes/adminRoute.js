const express = require("express");
const router = express.Router();

const {
  getUsers,
  deleteUser,
  getUserByUsername,
  getComplaints,
  addCredit,
  setCredit,
  handleComplaint,
  getPendingStores,
  addAdmin,
} = require("../controllers/adminController");

router.get("/", getUsers);
router.get("/stores", getPendingStores);
router.delete("/:id", deleteUser);
router.get("/users", getUserByUsername);
router.get("/complaints", getComplaints);
router.patch("/complaints/:complaint", handleComplaint);
router.patch("/credit/add", addCredit);
router.patch("/credit/set", setCredit);
router.post("/", addAdmin);

module.exports = router;
