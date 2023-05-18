const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getProducts = async (req, res) => {
  const products = await prisma.Product.findMany({
    include: {
      store: true,
      subCatId: true,
      images: true,
    },
  });
  if (!products) res.status(400).send("No products found.");
  else res.status(200).json(products);
};

const getProductsFromStore = async (req, res) => {
  const { store } = req.body;

  const productsInStore = await prisma.Product.findMany({
    where: {
      storeId: store,
    },
    include: {
      images: true,
      SubCatId: true,
    },
  });
  if (!products) {
    res.status(400).send("No products in store.");
  } else {
    res.status(200).json(productsInStore);
  }
};

module.exports = {
  getProducts,
  getProductsFromStore,
};
