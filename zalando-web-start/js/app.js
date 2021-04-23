
// TODO: constantes y variables globales
const resultadoDiv = document.querySelector('#resultado');
const modaSelect = document.querySelector('#moda-filtro');
const buscarBtn = document.querySelector('#search-btn');
let ropaXML = "";

//TODO: completar función
window.onload = function () {
    cargarXMLRopa();
    buscarBtn.addEventListener("click", (event)=>{
        filtrarPrendas();
    });
};

//TODO: completar función
const cargarXMLRopa = ()=> {
    fetch("./data/ropa.xml")
        .then(response => response.text())
        .then(texto => (new window.DOMParser()).parseFromString(texto, "text/xml"))
        .then(datos => {
                ropaXML = datos;
                pintaPrendas(ropaXML.querySelectorAll('prenda'));
        })
        .catch(Error => {
            alert("Archivo no encontrado");
            console.log(Error);
        });
};

//TODO: completar función
const pintaPrendas = (listaPrendas)=>{
    resultadoDiv.innerHTML = "";
    listaPrendas.forEach(prendaRopa => {
        let categoria = prendaRopa.querySelector('categoria').textContent;
        let nombre = prendaRopa.querySelector('nombre').textContent;
        let precio = prendaRopa.getAttribute('precio');
        let color = prendaRopa.querySelector('color').textContent;
        let unidades = prendaRopa.querySelector('unidades').textContent;
        let img = prendaRopa.querySelector('img').textContent;

        resultadoDiv.innerHTML += pintaPrendaCard( {categoria, nombre, img, precio} );
    });

};

//TODO: completar función
const pintaPrendaCard = ( prenda ) =>{
    return `

<div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="img/${prenda.img}" class="img-thumbnail" width="100%" alt="">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${prenda.nombre}</h5>
                                <p class="card-text">${prenda.categoria}</p>
                                <p class="card-text"><small class="text-muted">Precio ${prenda.precio}€</small></p>
                                <a href="#" class="btn btn-primary">Comprar</a>
                            </div>
                        </div>
                    </div>
                </div>


    `
};

//TODO: completar función
const filtrarPrendas = ()=>{
    let modaSeleccionada = modaSelect.options[modaSelect.selectedIndex].value;
    if(ropaXML != ""){
        const listaPrendas = ropaXML.querySelectorAll('prenda');
        let listaFiltrada = [];
        listaPrendas.forEach(prendaRopa => {
            if (prendaRopa.querySelector('moda').textContent == modaSeleccionada){
                listaFiltrada.push(prendaRopa);
            }
        });
        pintaPrendas(listaFiltrada);
    }
};


