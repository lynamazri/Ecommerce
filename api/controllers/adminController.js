const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  const users = await prisma.Users.findMany({
    select: {
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      birthDate: true,
      gender: true,
      bankAccount: true,
      credit: true,
    },
  });
  if (!users) res.status(400).send("No users found.");
  else res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleteUser = await prisma.Users.delete({
    where: {
      userId: id,
    },
  });
  if (!deleteUser) res.status(400).send("Unable to delete user.");
  else res.status(200);
};

const getUserByUsername = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  const user = await prisma.Users.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) res.status(400).send("Unable to find user.");
  else res.status(200).json(user);
};

const getComplaints = async (req, res) => {
  const complaints = await prisma.Complaint.findMany();
  if (!complaints) res.status(400).send("No Complaints found.");
  else res.status(200).json(complaints);
};

const addCredit = async (req, res) => {
  const { amount, bankAccount } = req.body;

  const user = await prisma.Users.findUnique({
    where: {
      bankAccount: bankAccount,
    },
  });

  const newBalance = user.credit + parseInt(amount);
  console.log(newBalance);

  if (!user) res.status(400).send("Unable to find user.");
  else {
    const addCredit = await prisma.Users.update({
      where: {
        bankAccount: bankAccount,
      },
      data: {
        credit: newBalance,
      },
    });

    if (addCredit) res.sendStatus(200);
    else res.status(400).send("Unable to add credit.");
  }
};

const setCredit = async (req, res) => {
  const { amount, bankAccount } = req.body;

  const user = prisma.Users.findUnique({
    where: {
      bankAccount: bankAccount,
    },
  });

  if (!user) res.status(400).send("Unable to find user.");
  else {
    const setCredit = await prisma.Users.update({
      where: {
        bankAccount: bankAccount,
      },
      data: {
        credit: parseInt(amount),
      },
    });

    if (setCredit) res.sendStatus(200);
    else res.status(400).send("Unable to set credit.");
  }
};

const handleComplaint = async (req, res) => {
  const { id } = req.params;

  const complaint = await prisma.Complaint.update({
    where: {
      complaintId: parseInt(id),
    },

    data: {
      handled: true,
    },
  });

  if (complaint) res.sendStatus(200);
  else res.status(400).send("Unable to confirm.");
};

const getPendingStores = async (req, res) => {
  const stores = await prisma.Store.findMany({
    where: {
      approved: false,
    },
  });
  if (stores.length === 0) res.status(400).send("No pending stores available.");
  else res.status(200).json(stores);
};

const addAdmin = async (req, res) => {
  const { email, username, firstName, lastName, password } = req.body;

  const emailExist = await prisma.Admin.findUnique({
    where: { email: email },
  });
  if (emailExist) return res.status(400).send("Email has already been used.");

  const usernameExist = await prisma.Admin.findUnique({
    where: { username: username },
  });
  if (usernameExist) return res.status(400).send("Username is already taken.");

  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //adding user to db
  try {
    const admin = await prisma.Admin.create({
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,

        password: hashPassword,
      },
    });

    console.log(admin);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//get unverfied stores and products

module.exports = {
  getUsers,
  deleteUser,
  getUserByUsername,
  getComplaints,
  addCredit,
  setCredit,
  handleComplaint,
  getPendingStores,
  addAdmin,
};
