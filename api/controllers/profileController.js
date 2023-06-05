const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {
  changePassValidation,
  updateProfileValidation,
} = require("../validation");

const updatePassword = async (req, res) => {
  const { error } = changePassValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { user } = req.params;
  const { curPassword, newPassword } = req.body;

  const pass = await bcrypt.compare(curPassword, user.password);

  if (!pass) return res.status(400).send("Wrong password.");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  const updateUser = await prisma.Users.update({
    where: {
      userId: user,
    },
    data: {
      password: hashPassword,
    },
  });
  if (updateUser) {
    res.sendStatus(200);
  } else res.status(400).send("Error updating password.");
};

const updateProfile = async (req, res) => {
  const { error } = updateProfileValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { newUsername, firstName, lastName, bankAccount } = req.body;

  const { user } = req.params;

  const curUser = await prisma.Users.findUnique({
    where: { userId: user },
  });
  if (!curUser) return res.status(400).send("Unable to find user.");
  else {
    const updateProfile = await prisma.Users.update({
      where: {
        userId: user,
      },
      data: {
        firstName: firstName ? firstName : curUser.firstName,
        lastName: lastName ? lastName : curUser.lastName,
        bankAccount: bankAccount ? bankAccount : curUser.bankAccount,
        username: newUsername ? newUsername : curUser.username,
      },
    });

    if (updateProfile) {
      res.json({ message: "success" });
    } else {
      res.status(400).send("Error updating profile.");
    }
  }
};

const createComplaint = async (req, res) => {
  const { title, type, description } = req.body;

  const { user } = req.params;

  const createComplaint = await prisma.Complaint.create({
    data: {
      type: type,
      userId: user,
      title: title,
      description: description,
    },
  });
  if (createComplaint) res.sendStatus(200);
  else res.status(400).send("Unable to create complaint.");
};

const createWish = async (req, res) => {
  const { user } = req.params;

  const createWish = await prisma.WishList.create({
    data: {
      user: {
        connect: {
          userId: user,
        },
      },
    },
  });
  if (createWish) res.sendStatus(200);
  else res.status(400).send("Unable to create wishlist.");
};

const getWishlist = async (req, res) => {
  const { user } = req.params;

  console.log(user);

  const wishes = await prisma.Wishlist.findUnique({
    where: {
      userId: user,
    },
    include: {
      products: true,
    },
  });
  if (!wishes) res.status(400).send("Unable to find wishlist.");
  else res.status(200).json(wishes);
};

module.exports = {
  updateProfile,
  updatePassword,
  createComplaint,
  createWish,
  getWishlist,
};
