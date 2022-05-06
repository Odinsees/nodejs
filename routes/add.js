const {Router} = require('express')
const Partners = require('../modules/partners.js')
const router = Router()

router.get('/',(req,res)=>{
  res.render('add',{
    title:'ADD PARTNER',
    isAdd:true,
  })
})

router.post('/', async (req,res)=>{
  const partner = new Partners(req.body.name, req.body.number, req.body.img)
  await partner.save()
  res.redirect('/partners')
})

module.exports = router