const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const {
  changePassValidation,
  updateProfileValidation,
} = require("../validation");

const updatePassword = async (req, res) => {
  const { error } = changePassValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { curPassword, newPassword } = req.body;

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

          if (!user) {
            res.status(400).send("Cannot find user.");
          } else {
            const pass = await bcrypt.compare(curPassword, user.password);

            if (!pass) return res.status(400).send("Wrong password.");

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);

            const updateUser = await prisma.Users.update({
              where: {
                username: decoded.username,
              },
              data: {
                password: hashPassword,
              },
            });
            if (updateUser) {
              res.sendStatus(200);
            } else res.status(400).send("Error updating password.");
          }
        }
      }
    );
  }
};

const updateProfile = async (req, res) => {
  const { error } = updateProfileValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { newUsername, firstName, lastName, bankAccount } = req.body;

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
          if (!user) res.status(400).send("Unable to find user.");
          else {
            const updateProfile = await prisma.Users.update({
              where: {
                userId: user.userId,
              },
              data: {
                firstName: firstName ? firstName : user.firstName,
                lastName: lastName ? lastName : user.lastName,
                bankAccount: bankAccount ? bankAccount : user.bankAccount,
                username: newUsername ? newUsername : user.username,
              },
            });

            if (updateProfile) {
              res.sendStatus(200);
            } else res.status(400).send("Error updating profile.");
          }
        }
      }
    );
  }
};

module.exports = {
  updateProfile,
  updatePassword,
};
