const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//const cloudinary = require("../config/cloudinary");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//
const { reviewValidation, questionValidation } = require("../validation");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getProducts = async (req, res) => {
  const products = await prisma.Product.findMany({
    where: {
      verified: true,
    },
    include: {
      store: true,
      subCat: true,
      images: true,
      options: true,
      reviews: true,
      discount: true,
    },
  });
  if (!products) res.status(400).send("No products found.");
  else res.status(200).json(products);
};

const getProductsFromStore = async (req, res) => {
  const { store } = req.params;

  const productsInStore = await prisma.Product.findMany({
    where: {
      storeId: store,
      verified: true,
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

  const product = await prisma.Product.findFirst({
    where: {
      productId: id,
      AND: {
        verified: true,
      },
    },
    include: {
      images: true,
      store: true,
      subCat: true,
      options: true,
      reviews: true,
      discount: true,
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
      verified: true,
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
  /* const { name, description, price, subCat, quantity, options } = req.body;
  img1 = req.files?.img1;
  img2 = req.files?.img2;
  img3 = req.files?.img3;
  img4 = req.files?.img4;
  img5 = req.files?.img5;
  const { store } = req.params;
  console.log(req.body);
  let upload1;
  let upload2;
  let upload3;
  let upload4;
  let upload5;

  const findStore = await prisma.store.findFirst({
    where: {
      storeId: store,
      approved: true,
    },
  });

  if (!findStore) res.status(400).send("Cannot find store.");

  const findSubCat = await prisma.SubCat.findUnique({
    where: {
      name: subCat,
    },
  });
  console.log(findSubCat);

  if (!findSubCat) {
    res.status(400).send("Product sub-category doesn't exist.");
  } else {
    try {
      upload1 = await cloudinary.uploader.upload(img1.tempFilePath, {
        folder: "products",
      });
      var images = [{ url: upload1.url }];

      if (img2) {
        upload2 = await cloudinary.uploader.upload(img2.tempFilePath, {
          folder: "products",
        });
        images.push({ url: upload2.url });
      }

      if (img3) {
        upload3 = await cloudinary.uploader.upload(img3.tempFilePath, {
          folder: "products",
        });
        images.push({ url: upload3.url });
      }

      if (img4) {
        upload4 = await cloudinary.uploader.upload(img4.tempFilePath, {
          folder: "products",
        });
        images.push({ url: upload4.url });
      }

      if (img5) {
        upload5 = await cloudinary.uploader.upload(img5.tempFilePath, {
          folder: "products",
        });
        images.push({ url: upload5.url });
      }

      const product = await prisma.Product.create({
        data: {
          name: name,
          description: description,
          price: parseInt(price),
          subCat: {
            connect: {
              subCatId: findSubCat.subCatId,
            },
          },
          quantity: parseInt(quantity),
          store: {
            connect: {
              storeId: findStore.storeId,
            },
          },
          images: {
            create: Array.from(images),
          },
          options: {
            create: Array.from(options),
          },
        },
      });

      if (!product) {
        res.status(400).send("Unable to create product");
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
  */

  const { name, description, price, quantity, subCat } = req.body;
  const { store } = req.params;

  image1 = req.files?.img1;
  image2 = req.files?.img2;
  image3 = req.files?.img3;
  image4 = req.files?.img4;

  const findSubCat = await prisma.subCat.findUnique({
    where: {
      name: subCat,
    },
  });

  if (!findSubCat) return res.status(400).send("Unable to find sub-category.");

  let uploadImage2;
  let uploadImage3;
  let uploadImage4;
  try {
    const uploadImage1 = await cloudinary.uploader.upload(image1.tempFilePath, {
      folder: "products",
    });
    if (image2) {
      uploadImage2 = await cloudinary.uploader.upload(image2.tempFilePath, {
        folder: "products",
      });
    }
    if (image3) {
      uploadImage3 = await cloudinary.uploader.upload(image3.tempFilePath, {
        folder: "products",
      });
    }
    if (image4) {
      uploadImage4 = await cloudinary.uploader.upload(image4.tempFilePath, {
        folder: "products",
      });
    }
    let images = [{ url: uploadImage1.url }];
    if (uploadImage2) {
      images.push({ url: uploadImage2.url });
    }
    if (uploadImage3) {
      images.push({ url: uploadImage3.url });
    }
    if (uploadImage4) {
      images.push({ url: uploadImage4.url });
    }
    /*   const product = await prisma.Product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        store: {
          connect: {
            storeId: store,
          },
        },
        subCat: {
          connect: {
            subCatId: findSubCat.subCatId,
          },
        },
        //subCatId: findSubCat.subCatId,
        quantity: parseInt(quantity),
        images: {
          create: Array.from(images),
        },
        options: {
          create: Array.from(options),
        },
      },
    }); */

    const product = await prisma.Product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        quantity: parseInt(quantity),
        store: {
          connect: {
            storeId: store,
          },
        },
        subCat: {
          connect: {
            subCatId: findSubCat.subCatId,
          },
        },

        images: {
          create: Array.from(images),
        },
      },
    });

    if (product) {
      res.status(200).json(product);
    } else res.status(400).send("Unable to create product.");
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const updateProduct = async (req, res) => {
  const { name, price, quantity, description } = req.body;
  const { id } = req.params;

  const curProduct = await prisma.Product.findUnique({
    where: {
      productId: id,
    },
  });

  if (!curProduct) res.status(400).send("Unable to find product.");
  else {
    const updateProduct = await prisma.Product.update({
      where: {
        productId: id,
      },
      data: {
        name: name ? name : curProduct.name,
        description: description ? description : curProduct.description,
        price: price ? parseInt(price) : curProduct.price,
        quantity: quantity ? parseInt(quantity) : curProduct.quantity,
      },
    });
    if (!updateProduct) {
      res.status(400).send("Unable to update product.");
    } else {
      res.status(200).json(updateProduct);
    }
  }
};
const createReview = async (req, res) => {
  const { error } = reviewValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { content, stars } = req.body;
  const { product, user } = req.params;

  /*   const findReview = prisma.Reviews.findUnique({
    where: {
      AND: [{ userId: user }, { productId: product }],
    },
  });

  if (findReview) return res.status(400).send("Product Already reviewed.");
 */
  const createReview = await prisma.Reviews.create({
    data: {
      content: content,
      stars: parseInt(stars),
      user: {
        connect: {
          userId: user,
        },
      },
      product: {
        connect: {
          productId: product,
        },
      },
    },
  });
  if (!createReview) {
    res.status(400).send("Unable to review product.");
  } else {
    res.status(200).json(createReview);
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  const deleteReview = await prisma.Reviews.delete({
    where: {
      reviewId: parseInt(id),
    },
  });
  if (deleteReview) res.sendStatus(200);
  else res.status(400).send("Unable to delete Review.");
};

const createQuestion = async (req, res) => {
  const { error } = questionValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { content } = req.body;
  const { product, user } = req.params;

  const createQuestion = await prisma.Questions.create({
    data: {
      content: content,
      user: {
        connect: {
          userId: user,
        },
      },
      product: {
        connect: {
          productId: product,
        },
      },
    },
  });
  if (createQuestion) res.sendStatus(200);
  else res.status(400).send("Unable to post question.");
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  const deleteQuestion = await prisma.Questions.delete({
    where: {
      questionId: parseInt(id),
    },
  });
  if (deleteQuestion) res.sendStatus(200);
  else res.status(400).send("Unable to delete Question.");
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deleteProduct = await prisma.Product.delete({
    where: {
      productId: id,
    },
  });
  if (deleteProduct) res.sendStatus(200);
  else res.status(400).send("Unable to delete Product.");
};

const verifyProduct = async (req, res) => {
  const { id } = req.params;

  const verifyProduct = await prisma.Product.update({
    where: {
      productId: id,
    },
    data: {
      verified: true,
    },
  });
  if (verifyProduct) res.sendStatus(200);
  else res.status(400).send("Unable to verify product.");
};

const createReport = async (req, res) => {
  const { type } = req.body;
  const { review, user } = req.params;
  const createReport = await prisma.Report.create({
    data: {
      type: type,
      user: {
        connect: {
          userId: user,
        },
      },
      review: {
        connect: {
          reviewId: parseInt(review),
        },
      },
    },
  });
  if (createReport) res.sendStatus(200);
  else res.status(400).send("Unable to create report.");
};

const searchProducts = async (req, res) => {
  const { fsearch, category } = req.body;

  var string = fsearch;
  string = string.split(" ");
  //string = string.join(" | ");
  string = string.map((i) => "+" + i + "*");
  string = string.join(" ");
  //const search = fsearch + "*";

  //console.log(search, fsearch);

  console.log(string);

  if (category) {
    const findSubCat = await prisma.subCat.findUnique({
      where: {
        name: category,
      },
    });

    if (!findSubCat)
      return res.status(400).send("Unable to find sub-category.");

    const products = await prisma.Product.findMany({
      where: {
        verified: true,
        subCatId: findSubCat.subCatId,
        name: {
          search: string,
        },
        description: {
          search: string,
        },
      },
      include: {
        store: true,
        images: true,
      },
    });
    if (products.length == 0) res.status(400).send("No products found.");
    else res.status(200).json(products);
  } else {
    const products = await prisma.Product.findMany({
      where: {
        verified: true,
        name: {
          search: string,
        },
        description: {
          search: string,
        },
      },
      include: {
        store: true,

        images: true,
      },
    });
    if (products.length == 0) res.status(400).send("No products found.");
    else res.status(200).json(products);
  }
};

const addProductWish = async (req, res) => {
  const { user, product } = req.params;

  const addWish = await prisma.WishList.create({
    data: {
      user: {
        connect: {
          userId: user,
        },
      },
      product: {
        connect: {
          productId: product,
        },
      },
    },
  });

  if (addWish) res.sendStatus(200);
  else res.status(400).send("Unable to add product to wishlist.");
};

const deleteProductWish = async (req, res) => {
  const { user, product } = req.params;

  const findWish = await prisma.WishList.findFirst({
    where: {
      userId: user,
      productId: product,
    },
  });

  if (!findWish) {
    return res.status(400).send("Unable to find wishlist item.");
  } else {
    const deleteWish = await prisma.WishList.delete({
      where: {
        wishlistId: findWish.wishlistId,
      },
    });

    if (deleteWish) {
      res.sendStatus(200);
    } else {
      res.status(400).send("Unable to remove product from wishlist.");
    }
  }
};

const deleteProductImage = async (req, res) => {
  const { imgId } = req.params;

  const deleteImg = await prisma.ProductImage.delete({
    where: {
      prodImgId: parseInt(imgId),
    },
  });
  if (deleteImg) res.sendStatus(200);
  else res.status(400).send("Unable to remove product image.");
};

const addProductImage = async (req, res) => {
  const { product } = req.params;

  const image = req.files?.image;
  let upload;

  try {
    if (image) {
      upload = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "products",
      });
    }

    const addImg = await prisma.ProductImage.create({
      data: {
        productId: product,
        url: upload.url,
      },
    });
    if (addImg) res.sendStatus(200);
    else res.status(400).send("Unable to upload product image.");
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to upload file.");
  }
};

module.exports = {
  getProducts,
  getProductsFromStore,
  getProductById,
  getProductByName,
  createProduct,
  createReview,
  deleteReview,
  createQuestion,
  deleteQuestion,
  deleteProduct,
  verifyProduct,
  createReport,
  updateProduct,
  searchProducts,
  addProductWish,
  deleteProductWish,
  deleteProductImage,
  addProductImage,
};
