const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { categoryValidation, subCatValidation } = require("../validation");

const getCatgory = async (req, res) => {
  const categories = await prisma.Category.findMany({
    include: {
      subCats: true,
    },
  });
  if (categories.length === 0)
    res.status(400).json({ message: "No categories yet." });
  else res.status(200).json(categories);
};

const createCatgory = async (req, res) => {
  const { error } = categoryValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description } = req.body;
  const createCategorie = await prisma.Category.create({
    data: {
      name: name,
      description: description,
    },
  });
  if (createCategorie) res.sendStatus(200);
  else res.status(400).send("Unable to create category.");
};

const createSubCat = async (req, res) => {
  const { error } = subCatValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, parentCat } = req.body;

  const findCat = await prisma.Category.findUnique({
    where: {
      name: parentCat,
    },
  });

  if (!findCat) res.status(400).send("Unable to find parent category.");
  else {
    const createSubCat = await prisma.SubCat.create({
      data: {
        name: name,
        catId: findCat.catId,
      },
    });
    if (createSubCat) res.sendStatus(200);
    else res.status(400).send("Unable to create category.");
  }
};

const deleteCatgory = async (req, res) => {
  const { id } = req.params;
  const deleteCategory = await prisma.Category.delete({
    where: {
      catId: parseInt(id),
    },
  });
  if (deleteCategory) res.sendStatus(200);
  else res.status(400).send("Unable to delete category.");
};

const deleteSubCat = async (req, res) => {
  const { id } = req.params;

  const deleteCategory = await prisma.SubCat.delete({
    where: {
      subCatId: parseInt(id),
    },
  });
  if (deleteCategory) res.sendStatus(200);
  else res.status(400).send("Unable to delete sub-category.");
};

const updateCatgory = async (req, res) => {};

module.exports = {
  getCatgory,
  createCatgory,
  createSubCat,
  deleteCatgory,
  updateCatgory,
  deleteSubCat,
};
