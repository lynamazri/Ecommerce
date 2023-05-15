const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const verification = require("./verifyToken");
const { changePassValidation } = require("../validation");

router.post("/profile/edit/changepass", verification, async (req, res) => {
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
    );
  }

  /*   const user = await prisma.Users.findUnique({
    where: { email: email },
  }); */
});

module.exports = router;
