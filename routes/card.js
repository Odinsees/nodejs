const { Router } = require("express");
const router = Router();
const Card = require("../models/card");
const Devices = require("../models/devices");

router.post("/add", async (req, res) => {
  const device = await Devices.getById(req.body.id);
  await Card.add(device);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Basket",
    isCard: true,
    devices: card.devices,
    sumPrice: card.sumPrice,
  });
});

module.exports = router;
