const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { applyStoreValidation } = require("../validation");

const createStore = async (req, res) => {
  const { error } = applyStoreValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, email, phone } = req.body;

  const token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) console.log(err.message);
        else {
          const user = await prisma.Users.findUnique({
            where: { username: decoded.username },
          });

          const store = await prisma.Store.create({
            data: {
              name: name,
              description: description,
              email: email,
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

          res.sendStatus(200);
        }
      }
    );
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
  else res.status(400).send("Unable to verify product.");
};

const getStores = async (req, res) => {
  const stores = await prisma.Store.findMany();
  if (!stores) res.status(400).send("No stores available.");
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
      },
      data: {
        description: description ? description : curStore.description,
        phone: phone ? phone : curStore.phone,
        banner: upload ? upload.url : curStore.banner,
      },
    });
    if (updateStore) {
      res.sendStatus(200);
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

module.exports = {
  createStore,
  verifyStore,
  getStores,
  editStore,
  deleteStore,
};
