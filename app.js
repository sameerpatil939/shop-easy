const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

const api = process.env.API_URL;

const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");
const authJwt = require("./helpers/jwt");
const cors = require("cors");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//Midleware
app.use(express.json());
//To know the method type and endpoint from frontend
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    //useFindAndModify: false,
    // dbName: "shopeasy",
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database Connection is ready..");
  })
  .catch((err) => {
    console.log(err);
  });

//For development
// app.listen(3000, () => {
//   console.log(api);
//   console.log("server started on port 3000");
// });

// for Production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port  " + port);
});
