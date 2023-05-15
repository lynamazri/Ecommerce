const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

require("dotenv").config();
const express = require("express");
const router = express.Router();
const { applyStoreValidation } = require("../validation");

router.post("/mystore/apply", async (req, res) => {
  const { error } = applyStoreValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, email, phone } = req.body;

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

          const store = await prisma.Store.create({
            data: {
              name: name,
              description: description,
              email: email,
              phone: parseInt(phone),

              owners: {
                create: [
                  {
                    user: {
                      connect: {
                        userId: user.userId,
                      },
                    },
                  },
                ],
              },
            },
          });

          res.sendStatus(200);
        }
      }
    );
  }
});

module.exports = router;
