const express = require("express");
const router = express.Router();

const {
  getCatgory,
  createCatgory,
  deleteCatgory,
  updateCatgory,
  createSubCat,
  deleteSubCat,
} = require("../controllers/categoryController");

router.get("/", getCatgory);

router.post("/", createCatgory);
router.post("/sub-category", createSubCat);

router.delete("/:id", deleteCatgory);
router.delete("/sub-category/:id", deleteSubCat);

router.patch("/:id", updateCatgory);

module.exports = router;
