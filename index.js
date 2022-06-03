const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { attachHbs, attachStatic, attachRoutes } = require('./server');

const app = express();
dotenv.config();

attachStatic(app);
attachRoutes(app);
attachHbs(app);

const MONGODB_URI = process.env.PUBLIC_MONGODB_URI;
const DB_USER = process.env.DB_USER_NAME;
const DB_PWD = process.env.DB_USER_PWD;
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      user: DB_USER,
      pass: DB_PWD,
    });
    console.log('successfully connected to the database');
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
