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
  const { user } = req.params;

  const orders = prisma.Order.findMany({
    where: {
      userId: user,
    },
  });
  if (!orders) res.status(400).send("No orders yet.");
  else res.status(200).json(orders);
};

const createOrder = async (req, res) => {
  const { total, method, cart, address, coupon, street, city, state, zip } =
    req.body;
  const currentdate = new Date();
  const { user } = req.params;
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
        if (!user) {
          res.status(400).send("Cannot find user.");
        } else {
          const order = await prisma.Order.create({
            total: total,
            payMethod: method,
            userId: user,
            coupon: coupon,
            address: {
              connectOrCreate: {
                where: {
                  id: address,
                },
                create: [
                  {
                    street: street,
                    city: city,
                    state: state,
                    zip: parseInt(zip),
                  },
                ],
              },
            },
            items: {
              create: {
                cart,
              },
            },
          });
          if (order) res.status(200).json(order);
          else res.status(400).send("Unable to complete order");
        }
      }
    }
  } else {
    const order = await prisma.Order.create({
      total: total,
      payMethod: method,
      userId: user,
      coupon: coupon,
      address: {
        connectOrCreate: {
          where: {
            id: address,
          },
          create: [
            {
              street: street,
              city: city,
              state: state,
              zip: parseInt(zip),
            },
          ],
        },
      },
      items: {
        create: cart,
      },
    });
    if (order) res.status(200).json(order);
    else res.status(400).send("Unable to complete order");
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
  if (!returnItem) res.status(400).send("Unable to return item.");
  else res.status(200);
};

module.exports = {
  getStoreOrders,
  getUserOrders,
  createOrder,
  cancelOrder,
  handleOrder,
  refuseOrder,
  returnItem,
};
