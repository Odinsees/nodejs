const { Router } = require("express");
const Order = require("../models/order");
const router = Router();

router.get("/", async (req, res) => {
  try{
    const orders = await Order.find({
      'user.userId' : req.user.id
    })
    .populate('user.userId')
    res.render("order", {
      title: "Order",
      isOrder: true,
      orders:orders.map(order=>{
        return{
          ...order._doc,
          price: order.devices.reduce((total, item)=>{
            return total += item.count * item.device.price
          },0)
        }
      })
    });
  }
  catch(err){
    console.log(err)
  }
  
});

router.post("/", async (req, res) => {
  try{
    const user = await req.user.populate("card.items.deviceId");
    const devices = user.card.items.map((item) => ({
      count: item.count,
      device: {...item.deviceId._doc}
    }));
  
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      devices: devices,
    });
    await order.save()
    await req.user.clearCard()
  
    res.redirect("order");
  }
  catch(err){
    console.log(err);
  }
});

module.exports = router;
