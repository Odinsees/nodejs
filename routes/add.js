const { Router } = require("express");
const Devices = require("../models/devices.js");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "ADD DEVICES",
    isAdd: true,
  });
});

router.post("/", async (req, res) => {
  // const device = new Devices(req.body.type, req.body.price, req.body.img)

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
    console.log(e);
  }
});

module.exports = router;
