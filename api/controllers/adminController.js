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

module.exports = {
  getUsers,
  deleteUser,
};
