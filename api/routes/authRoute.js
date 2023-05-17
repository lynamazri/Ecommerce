const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
              street: req.body.adresses[0].street,
              city: req.body.adresses[0].city,
              state: req.body.adresses[0].state,
              zip: parseInt(req.body.adresses[0].zip),
            },
          ],
        },
      },
    });

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

  //create tokens
  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  //store refresh token in db
  const updateUser = await prisma.Users.update({
    where: { email: req.body.email },
    data: {
      refreshToken: refreshToken,
    },
  });

  //sending the token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    //secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken }); // already sent in cookie
});

router.get("/refresh", async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await prisma.Users.findFirst({
    where: { refreshToken: refreshToken },
  });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken }); // same thing
  });
});

router.post("/logout", async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const user = await prisma.Users.findFirst({
    where: { refreshToken: refreshToken },
  });
  if (!user) {
    res.clearCookie("jwt", refreshToken, {
      httpOnly: true,
      //secure: true,
      sameSite: "None",
    });
    return res.sendStatus(204);
  }

  const updateUser = await prisma.Users.updateMany({
    where: { refreshToken: refreshToken },
    data: {
      refreshToken: "",
    },
  });

  res.clearCookie("jwt", refreshToken, {
    httpOnly: true,
    //secure: true,
    sameSite: "None",
  });

  res.sendStatus(204);
});

module.exports = router;
