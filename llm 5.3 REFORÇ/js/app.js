const contenedor = document.querySelector("#tiendaContainer");



window.onload = function () {
    cogerRopa();
};

function cogerRopa(){
    fetch("./data/tenda.xml")
                .then(response => response.text())
                //.then(texto => (new window.DOMParser()).parseFromString(texto, "text/xml"))
                .then(texto => {
                    let parser = new window.DOMParser();
                    return parser.parseFromString(texto, "text/xml");
                })
                .then(data => {
                    const listaRopa = data.querySelectorAll("producto");
                    listaRopa.forEach(producto => {
                        let nombreProducto = producto.querySelector("nombreProducto").textContent;
                        let precioAct = producto.querySelector("precioInicial").textContent;
                        let precioDesp = producto.querySelector("precioDescuento").textContent;
                        let img = producto.querySelector("foto").textContent;
                        contenedor.innerHTML +=`
                        <div class="card" style="width: 12rem;">
                        <img src="${img}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${nombreProducto}</h5>
                          <p class="card-text">${precioAct}</p>
                          <p class="card-text">${precioDesp}</p>
                          <a href="#" class="btn btn-primary">Compralo!</a>
                        </div>
                      </div>
                        `;
                    });
                   
                })
                .catch(Error => {
                    alert("Archivo no encontrado")
                    console.log(Error)
                });
        }
