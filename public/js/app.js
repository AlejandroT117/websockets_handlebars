const tbodyTable = document.getElementById('tbody')

const nombreInput = document.getElementById('nombre')
const precioInput = document.getElementById('precio')
const urlInput = document.getElementById('img')
const stockInput = document.getElementById('stock')
const submitBtn = document.getElementById('submit-product')
const form = document.getElementById('form-new-product')

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

const objProductos = [];

getProducts().then((res) => {
  console.log(res)
  objProductos.push(res);
  //detect new products
  user.socket.emit('products', res)
});

//deploy products on data.json
user.socket.on('producto', renderProduct)

function renderProduct(p) {
  console.log(p)
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
  tbodyTable.scrollTop = tbodyTable.scrollHeight

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





