const { Router } = require('express')
const Contenedor = require('../models/products')

const router = Router()

/* GET DATA */
const productos = new Contenedor('./database/data.json')





router.get('/', async (req, res)=>{

  //const objProductos = await productos.getAll() 
  
  //res.render('main', {objProductos})
  res.render('main')
})




//Deploy add page
router.get('/add', (req, res) => res.render('add'))





/* router.post('/add', async (req, res)=>{
  const {nombre, precio, img, stock} = req.body

  await productos.save({nombre,precio, img, stock})

  res.redirect('/')

}) */

module.exports = router