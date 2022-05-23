const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session')
const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const orderRoutes = require("./routes/order");
const addRoutes = require("./routes/add");
const devicesRoutes = require("./routes/devices");
const authRoutes = require("./routes/auth");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const varMiddleware = require('./middleware/variables')

const DB_USER = process.env.DB_USER_NAME;
const DB_PWD = process.env.DB_USER_PWD;

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req,res,next)=>{
  try{
    const user = await User.findById('627e97fd015688b9f71797d3')
    req.user = user
    next()
  }
  catch(err){
    console.log(err);
  }
})

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:'some secret value',
  resave:false,
  saveUninitialized:false,
}))
app.use(varMiddleware)
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
      .connect("mongodb://localhost:27017/mydbbone", {
        user: DB_USER,
        pass: DB_PWD,
      })
      .then(() => {
        console.log("successfully connected to the database");
      });
    const userCandidate = await User.findOne();
    if (!userCandidate) {
      
      const user = new User({
        email: "pavel.o.lebedev@gmail.com",
        name: "Pavel",
        card:{
          items:[]
        }
      });
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
