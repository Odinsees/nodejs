const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const orderRoutes = require("./routes/order");
const addRoutes = require("./routes/add");
const devicesRoutes = require("./routes/devices");
const authRoutes = require("./routes/auth");
const path = require("path");
const mongoose = require("mongoose");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");

const DB_USER = process.env.DB_USER_NAME;
const DB_PWD = process.env.DB_USER_PWD;
const MONGODB_URI = "mongodb://localhost:27017/mydbbone";

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const store = new MongoStore({
  collection: "sessions",
  uri: MONGODB_URI,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "some secret value",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(varMiddleware);
app.use(userMiddleware);
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/devices", devicesRoutes);
app.use("/card", cardRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose
      .connect(MONGODB_URI, {
        user: DB_USER,
        pass: DB_PWD,
      })
      .then(() => {
        console.log("successfully connected to the database");
      });
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
