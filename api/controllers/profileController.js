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

  const curUser = await prisma.Users.findUnique({
    where: {
      userId: user,
    },
  });

  const pass = await bcrypt.compare(curPassword, curUser.password);

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
  const { title, description } = req.body;

  const { user } = req.params;

  const createComplaint = await prisma.Complaint.create({
    data: {
      userId: user,
      title: title,
      description: description,
    },
  });
  if (createComplaint) res.sendStatus(200);
  else res.status(400).send("Unable to create complaint.");
};

/* const getWishlist = async (req, res) => {
  const { user } = req.params;

  const wishes = await prisma.WishList.findUnique({
    where: {
      userId: user,
    },
  });

  if (!wishes) res.status(400).send("Unable to find wishlist.");
  else res.status(200).json(wishes);
}; */

const getWishlist = async (req, res) => {
  const { user } = req.params;
  const wishes = await prisma.WishList.findMany({
    where: {
      userId: user,
    },
    include: {
      product: {
        include: {
          images: true,
          subCat: true,
        },
      },
    },
  });

  if (!wishes) res.status(400).send("Unable to find wishlist.");
  else res.status(200).json(wishes);
};

const getUsernameFromId = async (req, res) => {
  const { user } = req.params;

  const username = await prisma.Users.findUnique({
    where: {
      userId: user,
    },
    select: {
      username: true,
    },
  });

  if (!username) res.status(400).send("Unable to find user.");
  else res.status(200).json(username);
};

module.exports = {
  updateProfile,
  updatePassword,
  createComplaint,
  getWishlist,
  getUsernameFromId,
};
