const { Router } = require("express");
const router = Router();
const Devices = require("../models/devices");


function mapCardItems(card){
 return card.items.map(item=>({
   ...item.deviceId._doc,
   count:item.count,
 }))
}

function computePrices(devices){
  return devices.reduce((total, device)=>{
    return total += device.price * device.count
  },0)
}

router.post("/add", async (req, res) => {
  const device = await Devices.findById(req.body.id);
  await req.user.addToCard(device);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  const device = await Card.remove(req.params.id);
  res.status(200).json(device);
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("card.items.deviceId");
  const devices = mapCardItems(user.card)
  console.log(user.card.items);
  res.render("card", {
    title: "Basket",
    isCard: true,
    devices: devices,
    sumPrice: computePrices(devices),
  });
});

module.exports = router;
