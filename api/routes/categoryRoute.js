const express = require("express");
const router = express.Router();

const {
  getCatgory,
  createCatgory,
  deleteCatgory,
  updateCatgory,
  createSubCat,
  deleteSubCat,
  updateSubCat,
  getSubCatgory,
  getCategoryById,
} = require("../controllers/categoryController");

router.get("/", getCatgory); //tested, works
router.get("/category", getSubCatgory); //tested, works
router.post("/", createCatgory); //tested, works
router.post("/sub-category", createSubCat); //tested, works
router.delete("/:id", deleteCatgory); //tested, works
router.delete("/sub-category/:id", deleteSubCat); //tested, works
router.patch("/:id", updateCatgory); //tested, works
router.patch("/sub-category/:id", updateSubCat); //tested, works
router.get("/:categoryId", getCategoryById); //tested, works

module.exports = router;
