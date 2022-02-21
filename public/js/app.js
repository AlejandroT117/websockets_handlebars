const tbodyTable = document.getElementById('tbody')

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
  user.socket.emit('products', res)
});


user.socket.on('producto', renderProduct)

function renderProduct(p) {
  console.log(p)
  const trEl = document.createElement('tr')
  //nombre
  const thNombre = document.createElement('th')
  thNombre.innerHTML = p.nombre
  //precio
  const thPrecio = document.createElement('th')
  thPrecio.innerHTML = p.precio
  //img
  const thImg = document.createElement('th')
  const thUrlImg = document.createElement('img')
  thUrlImg.src=p.img
  thImg.appendChild(thUrlImg)

  trEl.appendChild(thNombre)
  trEl.appendChild(thPrecio)
  trEl.appendChild(thImg)

  tbodyTable.appendChild(trEl)
  tbodyTable.scrollTop = tbodyTable.scrollHeight

}





