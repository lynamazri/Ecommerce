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

module.exports = {
  createDiscount,
  addDiscountToProduct,
};
