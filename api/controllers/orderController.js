const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getStoreOrders = async (req, res) => {
  const { store } = req.params;
  const orders = prisma.OrderItems.findMany({
    where: {
      storeId: store,
    },
  });
  if (!orders) res.status(400).send("No orders yet.");
  else res.status(200).json(orders);
};

const getUserOrders = async (req, res) => {
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
            const orders = prisma.Order.findMany({
              where: {
                userId: user.userId,
              },
            });
            if (!orders) res.status(400).send("No orders yet.");
            else res.status(200).json(orders);
          }
        }
      }
    );
  }
};

const createOrder = async (req, res) => {
  const { total, method, cart, address, coupon } = req.body;
  const currentdate = new Date();
  const token = req.cookies.jwt;
  if (coupon) {
    const checkCoupon = await prisma.Coupon.findUnique({
      where: {
        code: coupon,
      },
    });
    if (!checkCoupon) {
      res.status(400).send("Invalid coupon.");
    } else {
      if (currentdate > checkCoupon.endDate) {
        res.status(400).send("Expired coupon.");
      } else {
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
                  const order = await prisma.Order.create({
                    state: "Pending.",
                    total: total,
                    payMethod: method,
                    userId: user.userId,
                    coupon: coupon,
                    address: {
                      connect: {
                        id: address,
                      },
                    },
                    items: {
                      create: {
                        cart,
                      },
                    },
                  });
                }
              }
            }
          );
        }
      }
    }
  } else {
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
              const order = await prisma.Order.create({
                state: "Pending.",
                total: total,
                payMethod: method,
                userId: user.userId,
                coupon: coupon,
                address: {
                  connect: {
                    id: address,
                  },
                },
                items: {
                  create: cart,
                },
              });
            }
          }
        }
      );
    }
  }
};

module.exports = {
  createOrderWithOldAddress,
  getStoreOrders,
  getUserOrders,
  createOrder,
};
