const { Router } = require("express");
const Devices = require("../models/devices");
const router = Router();
const authMiddleware = require("../middleware/auth");

router.get("/", async (req, res) => {
  const devices = await Devices.find()
    .populate("userId", "email name")
    .select("price type img");
  const fixedDevices = devices.map((i) => i.toObject());
  res.render("devices", {
    title: "DEVICES",
    isDevices: true,
    devices: fixedDevices,
  });
});

router.get("/:id/edit", authMiddleware, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const device = await Devices.findById(req.params.id);
  res.render("device-edit", {
    title: "Edit device info",
    device: device.toObject(),
  });
});

router.get("/:id", async (req, res) => {
  const device = await Devices.findById(req.params.id);
  res.render("device", {
    layout: "empty",
    title: `Device ${device.type}`,
    device: device.toObject(),
  });
});

router.post("/edit", authMiddleware, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Devices.findByIdAndUpdate(id, req.body);
  res.redirect("/devices");
});

router.post("/remove", authMiddleware, async (req, res) => {
  try {
    await Devices.deleteOne({
      _id: req.body.id,
    });
    res.redirect("/devices");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
