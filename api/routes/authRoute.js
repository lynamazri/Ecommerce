const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await prisma.Users.findUnique({
    where: { email: req.body.email },
  });
  if (emailExist) return res.status(400).send("Email has already been used.");

  /* const usernameExist = await prisma.Users.findUnique({
    where: { username: req.body.username },
  });
  if (usernameExist) return res.status(400).send("Username is already taken.");
 */

  //hashing passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //adding user to db
  try {
    const user = await prisma.Users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      },
    });
    console.log(user.id);
    res.send(200);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
