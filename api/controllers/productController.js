const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getProducts = async (req, res) => {
  const products = await prisma.Product.findMany({
    include: {
      store: true,
      subCat: true,
      images: true,
      options: true,
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
      subCat: true,
      options: true,
    },
  });
  if (!productsInStore) {
    res.status(400).send("No products in store.");
  } else {
    res.status(200).json(productsInStore);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await prisma.Product.findUnique({
    where: {
      productId: id,
    },
    include: {
      images: true,
      store: true,
      subCat: true,
      options: true,
    },
  });

  if (!product) {
    res.status(400).send("No product matching that ID.");
  } else {
    res.status(200).json(product);
  }
};

const getProductByName = async (req, res) => {
  const { name } = req.params;

  const product = await prisma.Product.findFirst({
    where: {
      name: name,
    },
    include: {
      images: true,
      store: true,
      subCat: true,
      options: true,
    },
  });

  if (!product) {
    res.status(400).send("No product matching that ID.");
  } else {
    res.status(200).json(product);
  }
};

const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    subCat,
    quantity,
    options,
    img1,
    img2,
    img3,
    img4,
    img5,
  } = req.body;
  const { store } = req.params;
  var upload1, upload2, upload3, upload4, upload5;

  const findSubCat = await prisma.SubCat.findUnique({
    where: {
      name: subCat,
    },
  });

  if (!findSubCat) {
    res.status(400).send("Product sub-category doesn't exist.");
  } else {
    try {
      upload1 = await cloudinary.uploader.upload(img1, {
        folder: "products",
        crop: scale,
      });
      var images = [{ image_url: upload1.url }];

      if (img2) {
        upload2 = await cloudinary.uploader.upload(img2, {
          folder: "products",
          crop: scale,
        });
        images.push({ image_url: upload2.url });
      }

      if (img3) {
        upload3 = await cloudinary.uploader.upload(img3, {
          folder: "products",
          crop: scale,
        });
        images.push({ image_url: upload3.url });
      }

      if (img4) {
        upload4 = await cloudinary.uploader.upload(img4, {
          folder: "products",
          crop: scale,
        });
        images.push({ image_url: upload4.url });
      }

      if (img5) {
        upload5 = await cloudinary.uploader.upload(img5, {
          folder: "products",
          crop: scale,
        });
        images.push({ image_url: upload5.url });
      }

      const product = await prisma.Product.create({
        data: {
          name: name,
          description: description,
          price: price,
          subCatId: findSubCat.subCatId,
          quantity: quantity,
          store: store,
          images: {
            create: Array.from(images),
          },
          options: {
            create: Array.from(options),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (!product) {
    res.status(400).send("Unable to create product");
  } else {
    res.status(200).json(product);
  }
};

module.exports = {
  getProducts,
  getProductsFromStore,
  getProductById,
  getProductByName,
  createProduct,
};
