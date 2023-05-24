const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  const user = await prisma.Users.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) res.status(400).send("Unable to find user.");
  else res.sendStatus(200);
};

const getComplaints = async (req, res) => {
  const complaints = await prisma.Complaint.findMany();
  if (!complaints) res.status(400).send("No Complaints found.");
  else res.status(200).json(complaints);
};

const addCredit = async (req, res) => {
  const { amount, bankAccount } = req.body;

  const user = prisma.Users.findUnique({
    where: {
      bankAccount: bankAccount,
    },
  });

  if (!user) res.status(400).send("Unable to find user.");
  else {
    const deposit = prisma.Users.update({
      where: {
        userId: user.userId,
      },
      data: {
        credit: user.credit + amount,
      },
    });
  }
  if (!deposit) res.status(400).send("Unable to deposit credit.");
  else res.sendStatus(200);
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
    const deposit = prisma.Users.update({
      where: {
        userId: user.userId,
      },
      data: {
        credit: amount,
      },
    });
  }
  if (!deposit) res.status(400).send("Unable to deposit credit.");
  else res.sendStatus(200);
};

const handleComplaint = async (req, res) => {
  const { complaint } = req.params;

  const handleComplaint = prisma.Complaint.update({
    where: {
      complaintId: complaint,
    },
    data: {
      handled: true,
    },
  });
  if (!handleComplaint) res.status(400).send("Unable to handle complaint.");
  else res.sendStatus(200);
};

module.exports = {
  getUsers,
  deleteUser,
  getUserByUsername,
  getComplaints,
  addCredit,
  setCredit,
  handleComplaint,
};
