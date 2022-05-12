const {Router} = require('express')
const Devices = require('../modules/devices.js')
const router = Router()

router.get('/',(req,res)=>{
  res.render('add',{
    title:'ADD DEVICES',
    isAdd:true,
  })
})

router.post('/', async (req,res)=>{
  const device = new Devices(req.body.type, req.body.price, req.body.img)
  await device.save()
  res.redirect('/devices')
})

module.exports = router