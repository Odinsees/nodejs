const express = require("express");
const exphbs = require("express-handlebars");
const homeRoutes = require( './routes/home')
const cardRoutes = require( './routes/card')
const addRoutes = require( './routes/add')
const devicesRoutes = require( './routes/devices')

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use('/',homeRoutes)
app.use('/add',addRoutes)
app.use('/devices',devicesRoutes)
app.use('/card',cardRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
