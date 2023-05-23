const express = require("express");
const router = express.Router();

const {
  getUsers,
  deleteUser,
  getUserByUsername,
  getComplaints,
} = require("../controllers/adminController");

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/users", getUserByUsername);
router.get("/complaints", getComplaints);

module.exports = router;
