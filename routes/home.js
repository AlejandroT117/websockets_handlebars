const { Router } = require('express')

const router = Router()

/* GET DATA */


router.get('/', async (req, res)=>{

  res.render('main')
})



module.exports = router