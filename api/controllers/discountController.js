const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routes/authRoute");
const prisma = new PrismaClient();

const createDiscount = async (req, res) => {
  const { percentage, end } = req.body;

  const discount = await prisma.Discount.create({
    data: {
      percentage: percentage,
      dateEnd: new Date(end),
    },
  });
  if (discount) res.sendStatus(200);
  else res.status(400).send("Unable to create discount.");
};

const addDiscountToProduct = async (req, res) => {
  const { id, store } = req.params;
  const { discount } = req.body;

  const findDiscount = await prisma.Discount.findFirst({
    where: {
      name: discount,
      storeId: store,
    },
  });

  if (!findDiscount) {
    res.status(400).send("Unable to find discount.");
  } else {
    const addDiscount = await prisma.Product.update({
      where: {
        productId: id,
      },
      data: {
        discount: {
          connect: {
            discountId: findDiscount.discountId,
          },
        },
      },
    });
    if (addDiscount) res.sendStatus(200);
    else res.status(400).send("Unable to add discount.");
  }
};

const createCoupon = async (req, res) => {
  const { percentage, end, code } = req.body;

  const coupon = await prisma.Coupons.create({
    data: {
      code: code,
      percentage: percentage,
      dateEnd: new Date(end),
    },
  });
  if (coupon) res.sendStatus(200);
  else res.status(400).send("Unable to create coupon.");
};

const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  const deleteCoupon = await prisma.Coupons.delete({
    where: {
      code: id,
    },
  });
  if (deleteCoupon) res.sendStatus(200);
  else res.status(400).send("Unable to delete coupon.");
};

const getCoupons = async (req, res) => {
  const coupons = await prisma.Coupons.findMany();
  if (coupons) res.status(200).json(coupons);
  else res.status(400).send("No coupons found.");
};

const getDiscounts = async (req, res) => {
  const { store } = req.params;

  const discounts = await prisma.Discount.findMany({
    where: {
      storeId: store,
    },
  });
  if (discounts) res.status(200).json(discounts);
  else res.status(400).send("No discounts found.");
};

const deleteDiscount = async (req, res) => {
  const { id } = req.params;

  const deleteDiscount = await prisma.Discount.delete({
    where: {
      discountId: id,
    },
  });
  if (deleteDiscount) res.sendStatus(200);
  else res.status(400).send("Unable to delete Discount.");
};

module.exports = {
  createDiscount,
  addDiscountToProduct,
  createCoupon,
  deleteCoupon,
  getCoupons,
  getDiscounts,
  deleteDiscount,
};
