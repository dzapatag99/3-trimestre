const contenedor = document.querySelector("#contenidoPelis")


window.onload = function () {
    cogerPelis();
};

function cogerPelis(){
    fetch("./data/peliculas.xml")
                .then(response => response.text())
                //.then(texto => (new window.DOMParser()).parseFromString(texto, "text/xml"))
                .then(texto => {
                    let parser = new window.DOMParser();
                    return parser.parseFromString(texto, "text/xml");
                })
                .then(data => {
                    const listaPeliculas = data.querySelectorAll("pelicula");
                    listaPeliculas.forEach(pelicula => {
                        let nombrePelicula = pelicula.querySelector("nombre").textContent;
                        let director = pelicula.querySelector("director").textContent;
                        let cinematografica = pelicula.querySelector("cinematografica").textContent;
                        let duracion = pelicula.querySelector("tiempoduracion").textContent;
                        let valoracion = pelicula.querySelector("valoracion").textContent;
                        let img = pelicula.querySelector("img").textContent;
                        contenedor.innerHTML +=`

                <div class="col">
                <div class="card shadow-sm">
                <img src="${img}" id="imgRef" width="100%" height="225">
      
                  
                  <h3>${nombrePelicula} </h3>
                    <p class="card-text">${cinematografica}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${nombrePelicula}</h5>
                    <p class="card-text">${cinematografica}</p>
                    <p class="card-text">${director}</p>
                    <p class="card-text"><small class="text-muted">${duracion}</small></p>
                    <p class="card-text"><small class="text-muted">${valoracion}</small></p>
                    </div>
                  </div>
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