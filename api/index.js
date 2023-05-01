const express = require("express");
const cors = require("cors");

const products = require("./products");
const help = require("./help");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

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

app.get("/help", (req, res) => {
  //const { q } = req.query

  let buying = help.filter((article) => {
    return article.category == "buying";
  });

  console.log(buying);
  res.send(buying);
});

const ourPort = 3001;
const port = process.env.PORT || ourPort;

app.listen(port, () => console.log(`Running expresss server on port ${port}!`));
