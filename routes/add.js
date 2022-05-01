const {Router} = require('express')
const router = Router()

router.get('/',(req,res)=>{
  res.render('add',{
    title:'ADD PARTNER',
    isAdd:true,
  })
})

router.post('/',(req,res)=>{
  console.log(req.body);
  res.redirect('/partners')
})

module.exports = router