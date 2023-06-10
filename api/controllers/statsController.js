const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//admin stats

const nUsers = async (req, res) => {
  const nUsers = await prisma.Users.count();
  if (!nUsers) res.sendStatus(400);
  else res.status(200).json(nUsers);
};

const nStores = async (req, res) => {
  const nStores = await prisma.Store.count();
  if (!nStores) res.sendStatus(400);
  else res.status(200).json(nStores);
};

const nProducts = async (req, res) => {
  const nProducts = await prisma.Product.count();
  if (!nProducts) res.sendStatus(400);
  else res.status(200).json(nProducts);
};

const nReports = async (req, res) => {
  const nReports = await prisma.Report.count();
  if (!nReports) res.sendStatus(400);
  else res.status(200).json(nReports);
};

const nComplaints = async (req, res) => {
  const nComplaints = await prisma.Complaint.count();
  if (!nComplaints) res.sendStatus(400);
  else res.status(200).json(nComplaints);
};

const nOrders = async (req, res) => {
  const nOrders = await prisma.Order.count();
  if (!nOrders) res.sendStatus(400);
  else res.status(200).json(nOrders);
};

const usersWithCount = async (req, res) => {
  const usersWithCount = await prisma.Users.findMany({
    include: {
      _count: {
        select: {
          reviews: true,
          questions: true,
          orders: true,
          complaints: true,
          reports: true,
        },
      },
    },
  });
  if (!usersWithCount) res.sendStatus(400);
  else res.status(200).json(usersWithCount);
};

const storesWithCount = async (req, res) => {
  const storesWithCount = await prisma.Store.findMany({
    include: {
      _count: {
        select: {
          products: true,
          orders: true,
        },
      },
    },
  });
  if (!storesWithCount) res.sendStatus(400);
  else res.status(200).json(storesWithCount);
};

//store stats

const storeWithCount = async (req, res) => {
  const { store } = req.params;
  const storeWithCount = await prisma.Store.findUnique({
    where: {
      storeId: store,
    },
    include: {
      _count: {
        select: {
          products: true,
          orders: true,
        },
      },
    },
  });
  if (!storeWithCount) res.sendStatus(400);
  else res.status(200).json(storeWithCount);
};

const storeReviews = async (req, res) => {
  const { store } = req.params;

  const storeReviews = await prisma.Product.findMany({
    where: {
      storeId: store,
    },
    include: {
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });
  if (!storeReviews) res.sendStatus(400);
  else res.status(200).json(storeReviews);
};

//user stats
const nSalesUser = async (req, res) => {
  const nSalesUser = await prisma.Order.groupBy({
    by: ["userId"],
    _sum: {
      total: true,
    },
  });
  if (!nSalesUser) res.sendStatus(400);
  else res.status(200).json(nSalesUser);
};

const nSalesUserMonth = async (req, res) => {
  const currentdate = new Date();
  currentdate.setDate(currentdate.getDate() - 30);

  const nSalesUser = await prisma.Order.groupBy({
    by: ["userId"],
    _sum: {
      total: true,
    },
    having: {
      orderDate: {
        gte: currentdate,
      },
    },
  });
  if (!nSalesUser) res.sendStatus(400);
  else res.status(200).json(nSalesUser);
};

module.exports = {
  nUsers,
  nStores,
  nProducts,
  nReports,
  nComplaints,
  nOrders,
  usersWithCount,
  storesWithCount,
  storeWithCount,
  nSalesUser,
  nSalesUserMonth,
  storeReviews,
};
