const tbodyTable = document.getElementById('tbody')

//Producto
const nombreInput = document.getElementById('nombre')
const precioInput = document.getElementById('precio')
const urlInput = document.getElementById('img')
const stockInput = document.getElementById('stock')
const submitBtn = document.getElementById('submit-product')
const form = document.getElementById('form-new-product')

//Mensaje
const emailInput = document.getElementById('email-msg')
const mensajeInput = document.getElementById('mensaje')
const mesForm = document.getElementById('mensajes-form')

const macroCard = document.getElementById('macro-card')

const user = {}
//iniciar socket i
user.socket = io()


//get products

async function getProducts() {
  let url = "/static/database/data.json";

  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

getProducts().then((res) => {
  console.log(res)
  //detect new products
  user.socket.emit('products', res)
});

//deploy products on data.json
user.socket.on('producto', renderProduct)

function renderProduct(p) {
  //console.log(p)
  const trEl = document.createElement('tr')
  //nombre
  const thNombre = document.createElement('th')
  thNombre.innerHTML = p.nombre
  //precio
  const thPrecio = document.createElement('td')
  thPrecio.innerHTML = p.precio
  //img
  const thImg = document.createElement('td')
  const thUrlImg = document.createElement('img')
  thUrlImg.src=p.img
  thImg.appendChild(thUrlImg)

  trEl.appendChild(thNombre)
  trEl.appendChild(thPrecio)
  trEl.appendChild(thImg)

  tbodyTable.appendChild(trEl)
  
  window.scrollTo(0,document.body.scrollHeight);

}

form.addEventListener('submit', (e)=>{
  e.preventDefault()

  const new_product = {
    nombre:nombreInput.value, 
    precio:precioInput.value,
    img:urlInput.value,
    stock: stockInput.value
  }
  nombreInput.value = null
  precioInput.value= null
  urlInput.value= null
  stockInput.value= null


  user.socket.emit('new_product', new_product)
})

/* Mensajes */

async function getMessages(){
  let url = "/static/database/messages.json";

  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

getMessages().then((res) => {
  console.log(res)
  //detect new products
  user.socket.emit('messages', res)
});


user.socket.on('mensaje', renderMensaje)

function renderMensaje(m) {
  //console.log(m)
  //body Div
  const bodyDiv = document.createElement('div')
  bodyDiv.classList.add('card-body')
  //title
  const titleDiv = document.createElement('h5')
  titleDiv.classList.add('card-title')
  titleDiv.innerHTML = `${m.email} - ${m.fecha}`
  //message
  const pDiv = document.createElement('p')
  pDiv.classList.add('card-text')
  pDiv.innerHTML = m.mensaje

  bodyDiv.appendChild(titleDiv)
  bodyDiv.appendChild(pDiv)

  macroCard.appendChild(bodyDiv)

}

mesForm.addEventListener('submit', (e)=>{
  e.preventDefault()

  const new_message = {
    email: emailInput.value,
    mensaje: mensajeInput.value,
    fecha: moment().format('DD/MM/YYYY HH:mm:ss'),
  }
  emailInput.value = null
  mensajeInput.value= null

  user.socket.emit('new_message', new_message)
})