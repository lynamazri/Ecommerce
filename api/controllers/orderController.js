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

  //check if enough coins
  if (method === "MagazaCoin") {
    const curUser = await prisma.Users.findUnique({
      where: {
        userId: user,
      },
    });

    const newBalance = curUser.credit - total;

    if (newBalance > 0) {
      const pay = await prisma.Users.update({
        where: {
          userId: user,
        },
        data: {
          credit: newBalance,
        },
      });
    } else {
      return res
        .status(400)
        .json(
          "Insufficient store credit. Please select another payment method."
        );
    }
  }

  //with new address
  if (street && zip && city && state) {
    const addAddress = await prisma.Address.create({
      data: {
        userId: user,
        street: street,
        city: city,
        state: state,
        zip: parseInt(zip),
      },
    });

    if (!addAddress) return res.status(400).send("Unable to add new address.");
    //new address + coupon
    if (coupon) {
      const checkCoupon = await prisma.Coupons.findUnique({
        where: {
          code: coupon,
        },
      });

      if (!checkCoupon) {
        return res.status(400).send("Invalid coupon.");
      } else {
        if (currentdate > checkCoupon.dataEnd)
          return res.status(400).send("Expired coupon.");
        else {
          const percentage = checkCoupon.percentage / 100;
          const newTotal = parseInt(total) - parseInt(total) * percentage;
          const finalTotal = Math.floor(newTotal);
          console.log(percentage, total, finalTotal);
          const order = await prisma.Order.create({
            data: {
              total: finalTotal,
              payMethod: method,
              userId: user,
              addressId: addAddress.id,

              items: {
                create: cart,
              },
            },
          });
          if (order) res.status(200).json(order);
          else res.status(400).send("Unable to complete order");
        }
      }
    } else {
      //new address - no coupon
      const order = await prisma.Order.create({
        data: {
          total: parseInt(total),
          payMethod: method,
          userId: user,
          addressId: addAddress.id,

          items: {
            create: cart,
          },
        },
      });
      if (order) res.status(200).json(order);
      else res.status(400).send("Unable to complete order");
    }
  } else {
    //old address

    const adrs = await prisma.Address.findUnique({
      where: {
        id: address,
      },
    });

    if (!adrs) return res.status(400).json("Unable to find address.");

    if (coupon) {
      //old address + coupon
      const checkCoupon = await prisma.Coupons.findUnique({
        where: {
          code: coupon,
        },
      });
      if (!checkCoupon) {
        return res.status(400).send("Invalid coupon.");
      } else {
        if (currentdate > checkCoupon.dataEnd)
          return res.status(400).send("Expired coupon.");
        else {
          const percentage = checkCoupon.percentage / 100;
          const newTotal = parseInt(total) - parseInt(total) * percentage;
          const finalTotal = Math.floor(newTotal);
          console.log(percentage, total, finalTotal);

          const order = await prisma.Order.create({
            data: {
              total: finalTotal,
              payMethod: method,
              userId: user,
              addressId: address,
              items: {
                create: cart,
              },
            },
          });
          if (order) res.status(200).json(order);
          else res.status(400).send("Unable to complete order");
        }
      }
    } else {
      //old address - no coupon
      const order = await prisma.Order.create({
        data: {
          total: parseInt(total),
          payMethod: method,
          userId: user,
          addressId: address,
          items: {
            create: cart,
          },
        },
      });
      if (order) res.status(200).json(order);
      else res.status(400).send("Unable to complete order");
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

  if (!findOrder) res.status(400).send("No orders yet.");
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
  const updateUser = await prisma.OrderItems.update({
    where: {
      itemId: parseInt(order),
    },
    data: {
      state: state,
    },
  });
  if (!updateUser) res.status(400).send("Unable to update status of order.");
  else res.sendStatus(200);
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
