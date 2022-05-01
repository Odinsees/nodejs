const express = require("express");
const exphbs = require("express-handlebars");
const homeRoutes = require( './routes/home')
const addRoutes = require( './routes/add')
const partnersRoutes = require( './routes/partners')

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
app.use('/partners',partnersRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
