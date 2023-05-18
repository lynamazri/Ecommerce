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

            res.sendStatus(200);
          }
        }
      }
    );
  }
};

const updateProfile = async (req, res) => {
  const { error } = updateProfileValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { newUsername, firstName, lastName } = req.body;

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

          if (newUsername) {
            const updateUsername = await prisma.Users.update({
              where: {
                username: decoded.username,
              },
              data: {
                username: newUsername,
              },
            });
          }

          if (firstName) {
            const updateUserfname = await prisma.Users.update({
              where: {
                username: decoded.username,
              },
              data: {
                firstName: firstName,
              },
            });
          }

          if (lastName) {
            const updateUserlname = await prisma.Users.update({
              where: {
                username: decoded.username,
              },
              data: {
                lastName: lastName,
              },
            });
          }

          res.sendStatus(200);
        }
      }
    );
  }
};

module.exports = {
  updateProfile,
  updatePassword,
};
