const { Router } = require("express");
const router = Router();
const Devices = require("../models/devices");
const authMiddleware = require('../middleware/auth')

function mapCardItems(card) {
  return card.items.map((item) => ({
    ...item.deviceId._doc,
    count: item.count,
    id:item.deviceId.id
  }));
}

function computePrices(devices) {
  return devices.reduce((total, device) => {
    return (total += device.price * device.count);
  }, 0);
}

router.post("/add", authMiddleware,  async (req, res) => {
  const device = await Devices.findById(req.body.id);
  await req.user.addToCard(device);
  res.redirect("/card");
});

router.delete("/remove/:id", authMiddleware, async (req, res) => {
  await req.user.removeFromCard(req.params.id);
  const user = await req.user.populate("card.items.deviceId");
  const devices = mapCardItems(user.card);
  const price = +computePrices(devices)
  const card = {
    devices,
    sumPrice: price,
  };
  res.status(200).json(card);
});

router.get("/", authMiddleware , async (req, res) => {
  const user = await req.user.populate("card.items.deviceId");
  const devices = mapCardItems(user.card);
  res.render("card", {
    title: "Basket",
    isCard: true,
    devices: devices,
    sumPrice: computePrices(devices),
  });
});

module.exports = router;
