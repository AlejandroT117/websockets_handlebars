const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 8080;

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

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
        id: p[1].id,
        nombre: p[1].nombre,
        precio: p[1].precio,
        img: p[1].img,
      });
    }
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
