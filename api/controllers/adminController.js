const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {
  changePassValidation,
  updateProfileValidation,
} = require("../validation");

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
      userId: true,
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

const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  const deleteUser = await prisma.Admin.delete({
    where: {
      adminId: id,
    },
  });
  if (!deleteUser) res.status(400).send("Unable to delete admin.");
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

const getAllStores = async (req, res) => {
  const stores = await prisma.Store.findMany({
    include: {
      mainCat: true,
      user: true,
    },
  });
  if (stores.length === 0) res.status(400).send("No stores available.");
  else res.status(200).json(stores);
};

const getAllProducts = async (req, res) => {
  const products = await prisma.Product.findMany({
    include: {
      store: true,
      subCat: true,
    },
  });
  if (products.length === 0) res.status(400).send("No products available.");
  else res.status(200).json(products);
};

const getAdmins = async (req, res) => {
  const admins = await prisma.Admin.findMany();
  if (admins.length === 0) res.status(400).send("No admins available.");
  else res.status(200).json(admins);
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

const updateAdminPassword = async (req, res) => {
  //const { error } = changePassValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  const { user } = req.params;
  const { curPassword, newPassword } = req.body;

  const curUser = await prisma.Admin.findUnique({
    where: {
      adminId: user,
    },
  });

  const pass = await bcrypt.compare(curPassword, curUser.password);

  if (!pass) return res.status(400).send("Wrong password.");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  const updateUser = await prisma.Admin.update({
    where: {
      adminId: user,
    },
    data: {
      password: hashPassword,
    },
  });
  if (updateUser) {
    res.json({ message: "Password Changed Successfully" });
  } else res.status(400).send("Error updating password.");
};

const updateAdminProfile = async (req, res) => {
  const { newUsername, firstName, lastName } = req.body;
  const { user } = req.params;

  const curUser = await prisma.Admin.findUnique({
    where: { adminId: user },
  });
  if (!curUser) return res.status(400).send("Unable to find user.");
  else {
    const updateProfile = await prisma.Admin.update({
      where: {
        adminId: user,
      },
      data: {
        firstName: firstName ? firstName : curUser.firstName,
        lastName: lastName ? lastName : curUser.lastName,
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

//get unverfied stores and products

module.exports = {
  getUsers,
  deleteUser,
  getUserByUsername,
  getComplaints,
  addCredit,
  setCredit,
  handleComplaint,
  getAllStores,
  addAdmin,
  getAllProducts,
  getAdmins,
  updateAdminPassword,
  deleteAdmin,
  updateAdminProfile,
};
