const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 8080;

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

const Contenedor = require('./models/products')
const productos = new Contenedor('./public/database/data.json')

const Cont_Mensajes = require('./models/messages')
const mensajes = new Cont_Mensajes('./public/database/messages.json')

//Routes set
const homeRouter = require("./routes/home");

//Handlebars set
const { engine } = require("express-handlebars");
app.engine(
  "handlebars",
  engine({
    layoutDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "index",
  })
);
app.set("view engine", "handlebars");

/* express */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "/public")));

/* Router al home */
app.use("/", homeRouter);


//socket io
io.on("connection", (socket) => {
  console.log(`An user is connected: ${socket.id}`);

  socket.on('products', (objProductos)=>{

    for (const p of Object.entries(objProductos)) {
      socket.emit("producto", {
        nombre: p[1].nombre,
        precio: p[1].precio,
        img: p[1].img,
      });
    }
  })

  socket.on('new_product', (product)=>{
    productos.save({...product})
    socket.emit('producto', {...product})
  })

  socket.on('messages', (ObjMensajes)=>{
    for (const m of Object.entries(ObjMensajes)) {
      //console.log(m)
      socket.emit("mensaje", {
        email:m[1].email,
        fecha:m[1].fecha,
        mensaje:m[1].mensaje
      })
      
    }
  })

  socket.on('new_message', (message)=>{
    mensajes.save({...message})
    socket.emit('mensaje', {...message})
    socket.broadcast.emit('mensaje', {...message})
  })

});

//manejo de errores
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Error en middleware");
});

server.listen(PORT, () =>
  console.log(`Escuchando en: http://localhost:${PORT}`)
);
