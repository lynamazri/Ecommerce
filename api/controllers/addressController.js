const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { addressValidation } = require("../validation");

const getAddresses = async (req, res) => {
  const { user } = req.params;

  const getAddress = await prisma.Address.findMany({
    where: {
      userId: user,
    },
  });

  if (getAddress) res.status(200).json(getAddress);
  else res.status(400).send("Unable to get addresses.");
};

const createAddress = async (req, res) => {
  const { error } = addressValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { street, city, state, zip } = req.body;

  const { user } = req.params;

  const addAddress = await prisma.Address.create({
    data: {
      userId: user,
      street: street,
      city: city,
      state: state,
      zip: parseInt(zip),
    },
  });

  if (addAddress) res.sendStatus(200);
  else res.status(400).send("Unable to create address.");
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

const updateAddress = async (req, res) => {
  const { street, city, state, zip } = req.body;
  const { id } = req.params;

  const findAddress = await prisma.Address.findUnique({
    where: {
      id: id,
    },
  });

  if (!findAddress) res.status(400).send("Unable to find address");
  else {
    const updateAddress = await prisma.Address.update({
      where: {
        id: id,
      },
      data: {
        street: street ? street : findAddress.street,
        city: city ? city : findAddress.city,
        state: state ? state : findAddress.state,
        zip: zip ? parseInt(zip) : findAddress.zip,
      },
    });

    if (updateAddress) {
      res.sendStatus(200);
    } else res.status(400).send("Error updating address.");
  }
};

module.exports = {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
};
