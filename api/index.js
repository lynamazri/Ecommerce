//imports
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./credentials");
const cookieParser = require("cookie-parser");
const products = require("./data/products");
const helpRoute = require("./routes/helpRoute");
const authRoute = require("./routes/authRoute");
const storeRoute = require("./routes/storeRoute");
const profileRoute = require("./routes/profileRoute");
const addressRoute = require("./routes/addressRoute");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());

//routes
app.use("/", helpRoute);
app.use("/", authRoute);
app.use("/", profileRoute);
app.use("/", storeRoute);
app.use("/", addressRoute);

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

//port
const ourPort = 3001;
const port = process.env.PORT || ourPort;

//console log port
app.listen(port, () => console.log(`Running expresss server on port ${port}!`));
