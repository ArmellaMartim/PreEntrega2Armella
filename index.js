function $(selector) {
  return document.querySelector(selector);
}

let catalog = document.querySelector("#catalogo");
const verProductos = (catalog , elemento)=> {
  catalog.innerHTML += `
   <div class="column is-one-quarter">
     <div class="card">
       <div class="card-image">
           <img src="${elemento.images}" alt="Placeholder">
       </div>
       <div class="card-content">
           <h2 class="title is-3">${elemento.title}</h2>
           <p>${elemento.description}</p>
           <br>
           <h3 class="subtitle is-4">Precio: <strong>$${elemento.price}</strong></h3>
       </div>
       <div class="card-footer">
           <a href="#" class="card-footer-item" id="addItem" data-producto="${elemento.id}">Agregar al Carrito</a>
       </div>
     </div>
   </div>
   `;
}




function Carrito() {
   this.catalogo = async () =>{
    const data = await fetch('https://dummyjson.com/products');
    const res = await data.json();
    res.products.forEach((element) => {
      verProductos(catalog, element)
    });
   }  
  this.constructor = function () {
    if (!localStorage.getItem("carrito")) {
      localStorage.setItem("carrito", "[]");
    }
  };
  this.getCarrito = JSON.parse(localStorage.getItem("carrito"));
  this.agregarItem = function(item){
    for(i of this.catalogo.res){
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
                    <img src="${carrito.catalogo[i].images}" alt="Placeholder">
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
  carrito.catalogo();
  carrito.constructor();
  $("#catalogo").addEventListener("click", function(ev){
    ev.preventDefault();
    if(ev.target.id == "addItem"){
      let id = ev.target.dataset.producto;
      carrito.agregarItem(id);
    }
  })
});
