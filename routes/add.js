const { Router } = require("express");
const Devices = require("../models/devices.js");
const router = Router();

const authMiddleware = require('../middleware/auth')

router.get("/", authMiddleware , (req, res) => {
  res.render("add", {
    title: "ADD DEVICES",
    isAdd: true,
  });
});

router.post("/", authMiddleware, async (req, res) => {
  const device = new Devices({
    type: req.body.type,
    price: req.body.price,
    img: req.body.img,
    userId: req.user,
  });
  try {
    await device.save();
    res.redirect("/devices");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
