const { Router } = require("express");
const Devices = require("../models/devices");
const router = Router();

router.get("/", async (req, res) => {
  const devices = await Devices.getAll();
  res.render("devices", {
    title: "DEVICES",
    isDevices: true,
    devices,
  });
});

router.get("/:id/edit", async (req, res) => {
  if(!req.query.allow){
    return res.redirect('/')
  }
  const device = await Devices.getById(req.params.id)
  res.render('device-edit',{
    title:"Edit device info",
    device
  })
});

router.post('/edit', async (req,res)=>{
  await Devices.update(req.body)
  res.redirect('/devices')
})

router.get("/:id", async (req, res) => {
  const device = await Devices.getById(req.params.id)
  res.render("device",{
    layout:'empty',
    title:`Device ${device.type}`,
    device
  });
});

module.exports = router;
