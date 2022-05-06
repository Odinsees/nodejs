const {Router} = require('express')
const Partners = require('../modules/partners')
const router = Router()

router.get('/', async (req,res)=>{
  const partners = await Partners.getAll()
  res.render('partners',{
    title:'PARTNERS',
    isPartners:true,
    partners
  })
})

module.exports = router