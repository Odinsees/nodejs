const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const hbsHelpers = require('./utils/hbs-helpers');

const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');

const path = require('path');
const MongoStore = require('connect-mongodb-session')(session);
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const loadFileMiddleware = require('./middleware/loadFile');

const errorPageHandler = require('./middleware/errorPage');
const apiRouter = require('./routes');

const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.PUBLIC_MONGODB_URI;
const SESSION_SECRET = process.env.PUBLIC_SESSION_SECRET;

function attachHbs(app) {
  const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: hbsHelpers,
  });

  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', 'views');
}

function attachStatic(app) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/images', express.static(path.join(__dirname, 'images')));
}

function attachRoutes(app) {
  const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI,
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store,
    }),
  );
  app.use(loadFileMiddleware.single('avatar'));
  app.use(csrf());
  app.use(flash());
  app.use(varMiddleware);
  app.use(userMiddleware);
  app.use('/', apiRouter);
  app.use(errorPageHandler);
}

module.exports = {
  attachHbs,
  attachStatic,
  attachRoutes,
};
