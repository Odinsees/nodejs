const {Router} = require('express')
const router = Router()

router.get('/',(req,res)=>{
  res.render('partners',{
    title:'PARTNERS',
    isPartners:true,
  })
})

module.exports = router