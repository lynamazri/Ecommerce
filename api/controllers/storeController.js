const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const {
  applyStoreValidation,
  storeUpdateValidation,
} = require("../validation");

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
    console.log(upload);
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
            create: { url: upload.url },
          },
          phone: parseInt(phone),

          user: {
            connect: {
              userId: user,
            },
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
  const { error } = storeUpdateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { store } = req.params;
  const { description, phone, workingHours } = req.body;

  const curStore = await prisma.Store.findUnique({
    where: {
      storeId: store,
    },
  });

  const updateStore = await prisma.Store.update({
    where: {
      storeId: store,
    },
    data: {
      description: description ? description : curStore.description,
      workingHours: workingHours ? workingHours : curStore.workingHours,
      phone: phone ? parseInt(phone) : curStore.phone,
    },
  });
  if (updateStore) {
    res.status(200).json(updateStore);
  } else {
    res.status(400).send("Unable to edit store.");
  }
};

const editBanner = async (req, res) => {
  const { store } = req.params;
  const img = req.files?.banner;
  let upload;

  try {
    if (img) {
      upload = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "banners",
      });

      const newBanner = await prisma.StoreImage.update({
        where: {
          storeId: store,
        },
        data: {
          url: upload.url,
        },
      });

      if (newBanner) res.sendStatus(200);
      else res.status(400).send("Unable to update banner.");
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
    select: {
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
    select: {
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
  const { id } = req.params;
  const { answer } = req.body;

  const answerQuestion = await prisma.Questions.update({
    where: {
      questionId: parseInt(id),
    },
    data: {
      answer: answer,
    },
  });
  if (!answerQuestion) {
    res.status(400).send("Unable to answer question.");
  } else {
    res.status(200).json(answerQuestion);
  }
};

const getStoreBanner = async (req, res) => {
  const { store } = req.params;

  const banner = await prisma.StoreImage.findUnique({
    where: {
      storeImgId: parseInt(store),
    },
  });
  if (!banner) {
    res.status(400).send("Unable to find store banner.");
  } else {
    res.status(200).json(banner);
  }
};

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  const category = await prisma.Category.findUnique({
    where: {
      catId: parseInt(categoryId),
    },
  });
  if (!category) {
    res.send(400).send("Unable to find category")
  } else {
    res.status(200).json(category)
  }
}

module.exports = {
  createStore,
  verifyStore,
  getStores,
  editStore,
  deleteStore,
  getReviews,
  getQuestions,
  answerQuestion,
  editBanner,
  getStoreBanner,
  getCategoryById,
};
