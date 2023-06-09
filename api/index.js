//imports
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./credentials");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const products = require("./data/products");

//route consts
const helpRoute = require("./routes/helpRoute");
const authRoute = require("./routes/authRoute");
const storeRoute = require("./routes/storeRoute");
const productRoute = require("./routes/productRoute");
const profileRoute = require("./routes/profileRoute");
const addressRoute = require("./routes/addressRoute");
const categoryRoute = require("./routes/categoryRoute");
const adminRoute = require("./routes/adminRoute");
const discountRoute = require("./routes/discountRoute");
const orderRoute = require("./routes/orderRoute");

//app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

//routes
app.use("/", helpRoute);
app.use("/auth", authRoute);
app.use("/store", storeRoute);
app.use("/address", addressRoute);
app.use("/category", categoryRoute);
app.use("/profile", profileRoute);
app.use("/productss", productRoute);
app.use("/admin", adminRoute);
app.use("/discount", discountRoute);
app.use("/order", orderRoute);

//port
const ourPort = 3001;
const port = process.env.PORT || ourPort;

//console log port
app.listen(port, () => console.log(`Running expresss server on port ${port}!`));
