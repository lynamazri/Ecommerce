const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;

const { applyStoreValidation } = require("../validation");

const createStore = async (req, res) => {
  const { error } = applyStoreValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, email, phone, category, workingHours } = req.body;
  const { user } = req.params;
  const img = req.files?.banner;
  let upload;

  try {
    if (img) {
      upload = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "banners",
      });
    }

    const findCat = await prisma.Category.findUnique({
      where: {
        name: category,
      },
    });

    if (!findCat) return res.status(400).send("Unable to find category.");
    else {
      const store = await prisma.Store.create({
        data: {
          name: name,
          description: description,
          email: email,
          workingHours: workingHours,
          mainCat: {
            connect: {
              catId: findCat.catId,
            },
          },
          banner: {
            create: [{ url: upload.url }],
          },
          phone: parseInt(phone),
          owners: {
            create: [
              {
                user: {
                  connect: {
                    userId: user.userId,
                  },
                },
              },
            ],
          },
        },
      });

      if (store) res.status(200).json(store);
      else res.status(400).send("Unable to create store.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const verifyStore = async (req, res) => {
  const { id } = req.params;

  const store = await prisma.Store.update({
    where: {
      storeId: id,
    },

    data: {
      approved: true,
    },
  });

  if (store) res.sendStatus(200);
  else res.status(400).send("Unable to verify store.");
};

const getStores = async (req, res) => {
  const stores = await prisma.Store.findMany({
    where: {
      approved: true,
    },
  });
  if (stores.length === 0) res.status(400).send("No stores available.");
  else res.status(200).json(stores);
};

const editStore = async (req, res) => {
  const { error } = categoryValidationOnUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id } = req.params;
  const { description, phone } = req.body;
  const img = req.files?.banner;
  let upload;

  const curStore = await prisma.Store.findUnique({
    where: {
      storeId: id,
    },
  });

  try {
    if (img) {
      upload = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "banners",
      });
    }

    const updateStore = await prisma.Store.update({
      where: {
        storeId: id,
        approved: true,
      },
      data: {
        description: description ? description : curStore.description,
        phone: phone ? phone : curStore.phone,
        banner: upload ? upload.url : curStore.banner,
      },
    });
    if (updateStore) {
      res.sendStatus(200);
    } else {
      res.status(400).send("Unable to edit store.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error uploading files.");
  }
};

const deleteStore = async (req, res) => {
  const { id } = req.params;

  const deleteStore = await prisma.Store.delete({
    where: {
      storeId: id,
    },
  });
  if (deleteStore) res.sendStatus(200);
  else res.status(400).send("Unable to delete store.");
};

const getReviews = async (req, res) => {
  const { id } = req.params;

  const reviewsOnStoreProducts = await prisma.Product.findMany({
    where: {
      storeId: id,
      verified: true,
    },
    include: {
      reviews: true,
    },
  });
  if (!reviewsOnStoreProducts) {
    res.status(400).send("Unable to find reviews.");
  } else {
    res.status(200).json(reviewsOnStoreProducts);
  }
};

const getQuestions = async (req, res) => {
  const { id } = req.params;

  const questionsOnStoreProducts = await prisma.Product.findMany({
    where: {
      storeId: id,
      verified: true,
    },
    include: {
      questions: true,
    },
  });
  if (!questionsOnStoreProducts) {
    res.status(400).send("Unable to find questions.");
  } else {
    res.status(200).json(questionsOnStoreProducts);
  }
};

const answerQuestion = async (req, res) => {
  const { question } = req.params;
  const { answer } = req.body;

  const answerQuestion = prisma.Questions.update({
    where: {
      questionId: question,
    },
    data: {
      answer: answer,
    },
  });

  if (!answerQuestion) res.status(400).send("Unable to post answer.");
  else res.sendStatus(200);
};

module.exports = {
  createStore,
  verifyStore,
  getStores,
  editStore,
  deleteStore,
  getReviews,
  getQuestions,
  answerQuestion,
};
