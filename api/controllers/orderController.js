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

const cancelOrder = async (req, res) => {
  const { order } = req.params;
  const currentdate = new Date();

  const findOrder = prisma.Order.findUnique({
    where: {
      orderId: order,
    },
  });

  if (!deleteOrder) res.status(400).send("No orders yet.");
  else {
    let diff = currentdate.getTime() - findOrder.orderDate.getTime(); //res in milliseconds
    if (diff > 172800000) {
      //two days
      res.status(400).send("Cannot cancel orders older than 2 days.");
    } else {
      const deleteOrder = prisma.Order.delete({
        where: {
          orderId: order,
        },
      });
      if (!deleteOrder) res.status(400).send("No orders yet.");
      else res.sendStatus(200);
    }
  }
};

const handleOrder = async (req, res) => {
  const { order } = req.params;
  const { state } = req.body;

  const handleOrder = prisma.OrderItems.update({
    where: {
      itemId: order,
    },
    data: {
      state: state,
    },
  });
  if (!handleOrder) res.status(400).send("Unable to update order.");
  else res.status(200);
};

const refuseOrder = async (req, res) => {
  const { order } = req.params;

  const refuseOrder = prisma.OrderItems.delete({
    where: {
      itemId: order,
    },
  });
  if (!refuseOrder) res.status(400).send("Unable to refuse order.");
  else res.status(200);
};

const returnItem = async (req, res) => {
  const { order } = req.params;

  const returnItem = prisma.OrderItems.update({
    where: {
      itemId: order,
    },
    data: {
      state: "Returned",
    },
  });
};

module.exports = {
  createOrderWithOldAddress,
  getStoreOrders,
  getUserOrders,
  createOrder,
  cancelOrder,
  handleOrder,
  refuseOrder,
  returnItem,
};
