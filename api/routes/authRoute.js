const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await prisma.Users.findUnique({
    where: { email: req.body.email },
  });
  if (emailExist) return res.status(400).send("Email has already been used.");

  const usernameExist = await prisma.Users.findUnique({
    where: { username: req.body.username },
  });
  if (usernameExist) return res.status(400).send("Username is already taken.");

  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //adding user to db
  try {
    const user = await prisma.Users.create({
      data: {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthDate: new Date(req.body.birthDate),
        gender: req.body.gender,

        password: hashPassword,
        adresses: {
          create: [
            {
              street: req.body.street,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
            },
          ],
        },
      },
    });
    /*     const address = await prisma.address.create({
      data: {
        street: req.body.street, 
        city: req.body.city, 
        state: req.body.state,
        zip: req.body.zip
      }
    }) */
    console.log(user);
    res.send(200);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await prisma.Users.findUnique({
    where: { email: req.body.email },
  });
  if (!user)
    return res
      .status(400)
      .send(
        "Email or password is incorrect. Please try again or click on 'Forgot password'."
      );
  const pass = await bcrypt.compare(req.body.password, user.password);
  if (!pass)
    return res
      .status(400)
      .send(
        "Email or password is incorrect. Please try again or click on 'Forgot password'."
      );

  //token
  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;