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
  getAllStores,
  addAdmin,
  getAllProducts,
  getAdmins,
} = require("../controllers/adminController");

router.get("/", getUsers); //tested, works
router.get("/admins", getAdmins); //tested, works
router.get("/stores", getAllStores); //tested, works
router.get("/products", getAllProducts); //tested, works
router.delete("/:id", deleteUser); //tested, works
router.get("/users", getUserByUsername); //tested, works
router.get("/complaints", getComplaints); //tested, works
router.patch("/complaints/:id", handleComplaint); //tested, works
router.patch("/credit/add", addCredit); //tested, works
router.patch("/credit/set", setCredit); //tested, works
router.post("/", addAdmin); //tested, works

module.exports = router;
