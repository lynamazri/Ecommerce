const express = require("express");
const cors = require("cors");

const products = require("./products");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const ourPort = 3001;
const port = process.env.PORT || ourPort;

app.listen(port, () => console.log(`Running expresss server on port ${port}!`));
