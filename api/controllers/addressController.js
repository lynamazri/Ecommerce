const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { addressValidation } = require("../validation");

const getAddresses = async (req, res) => {
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

          const getAddress = await prisma.Address.findMany({
            where: {
              userId: {
                equals: user.userId,
              },
            },
          });

          res.status(200).json(getAddress);
        }
      }
    );
  }
};

const createAddress = async (req, res) => {
  const { error } = addressValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { street, city, state, zip } = req.body;

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

          const addAddress = await prisma.Address.create({
            data: {
              userId: user.userId,
              street: street,
              city: city,
              state: state,
              zip: parseInt(zip),
            },
          });

          res.sendStatus(200);
        }
      }
    );
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;

  const deleteAddress = await prisma.Address.delete({
    where: {
      id: id,
    },
  });

  if (deleteAddress) {
    console.log(deleteAddress);
    res.sendStatus(200);
  } else res.status(400).send("Error deleting address.");
};

module.exports = {
  createAddress,
  deleteAddress,
  getAddresses,
};
