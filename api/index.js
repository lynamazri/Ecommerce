const express = require("express");
const cors = require("cors");

const products = require("./products");

//const helpRoute = require("./routes/help");
const help = require("./help");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
//app.use("/help", helpRoute);
app.get("/", (req, res) => {
  const { q } = req.query;

  const keys = ["title", "description"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };
  q ? res.json(search(products).slice(0, 10)) : res.json(products.slice(0, 10));
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/help/buying", (req, res) => {
  let buying = help.filter((article) => {
    return article.category == "Buying";
  });

  console.log(buying);
  res.send(buying);
});

app.get("/help/selling", (req, res) => {
  let selling = help.filter((article) => {
    return article.category == "Selling";
  });

  console.log(selling);
  res.send(selling);
});
app.get("/help/account", (req, res) => {
  let account = help.filter((article) => {
    return article.category == "Account";
  });

  console.log(account);
  res.send(account);
});
app.get("/help/ship", (req, res) => {
  let ship = help.filter((article) => {
    return article.category == "Shipping & Delivery";
  });

  console.log(ship);
  res.send(ship);
});
app.get("/help/other", (req, res) => {
  let other = help.filter((article) => {
    return article.category == "Other";
  });

  console.log(other);
  res.send(other);
});
app.get("/help/return", (req, res) => {
  let refund = help.filter((article) => {
    return article.category == "Returns & Refunds";
  });

  console.log(refund);
  res.send(refund);
});

const ourPort = 3001;
const port = process.env.PORT || ourPort;

app.listen(port, () => console.log(`Running expresss server on port ${port}!`));
