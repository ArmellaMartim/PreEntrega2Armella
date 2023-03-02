function $(selector) {
  return document.querySelector(selector);
}
function Carrito() {
  this.catalogo = [
    {
      id: "P01",
      nombre: "Andador",
      precio: 3000,
      imagen: "Andador.png",
      descripcion:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "P02",
      nombre: "Silla de ducha",
      precio: 5000,
      imagen: "silla de ducha.jpg",
      descripcion:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "P03",
      nombre: "Silla de ruedas",
      precio: 13000,
      imagen: "silla de rueda.jpg",
      descripcion:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "P04",
      nombre: "Guantes",
      precio: 1500,
      imagen: "guantes.jpg",
      descripcion:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "P06",
      nombre: "Venda",
      precio: 750,
      imagen: "venda.jpg",
      descripcion:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: "P07",
      nombre: "Nebulizador",
      precio: 12000,
      imagen: "nebulizador.jpg",
      descripcion:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  this.constructor = function () {
    if (!localStorage.getItem("carrito")) {
      localStorage.setItem("carrito", "[]");
    }
  };
  this.getCarrito = JSON.parse(localStorage.getItem("carrito"));
  this.agregarItem = function(item){
    for(i of this.catalogo){
      if(i.id === item){
        let registro = i
      }
    }
    if(!registro){
      return
    }

    for(i of this.getCarrito){
      if(i.id === item){
        i.cantidad++;
        localStorage.setItem("carrito",JSON.stringify(this.getCarrito))
        return
      }
    }
    registro.cantidad = 1;
    this.getCarrito.push(registro);
    localStorage.setItem("carrito",JSON.stringify(this.getCarrito))
  }
}

function VerCarrito() {
  this.renderCatalogo = function () {
    let template = ``;
    for (let i in carrito.catalogo) {
      template += `
            <div class="column is-one-quarter">
            <div class="card">
                <div class="card-image">
                    <img src="../img/${carrito.catalogo[i].imagen}" alt="Placeholder">
                </div>
                <div class="card-content">
                    <h2 class="title is-3">${carrito.catalogo[i].nombre}</h2>
                    <p>${carrito.catalogo[i].descripcion}</p>
                    <br>
                    <h3 class="subtitle is-4">Precio: <strong>$${carrito.catalogo[i].precio}</strong></h3>
                </div>
                <div class="card-footer">
                    <a href="#" class="card-footer-item" id="addItem" data-producto="${carrito.catalogo[i].id}">Agregar al Carrito</a>
                </div>
                </div>
            </div>
            `;
    }
    $("#catalogo").innerHTML = template;
  };
}

let carrito = new Carrito();
let carritoVer = new VerCarrito();

document.addEventListener("DOMContentLoaded", function () {
  carritoVer.renderCatalogo();
  carrito.constructor();
  $("#catalogo").addEventListener("click", function(ev){
    ev.preventDefault();
    if(ev.target.id == "addItem"){
      let id = ev.target.dataset.producto;
      carrito.agregarItem(id);
    }
  })
});
