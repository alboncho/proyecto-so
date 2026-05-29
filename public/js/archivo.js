import { GestionArchivos } from "./data/GestionArchivos.js";
import { MapaBloques } from "./ui/MapaBloques.js";
import { ListaArcvhivos } from "./ui/ListaArchivos.js";

const archivos = new GestionArchivos();
const mapa = new MapaBloques(document.querySelector(".bxCardBloques"));
const lista = new ListaArcvhivos(document.querySelector(".listaArchivos"), eliminarArchivo);

mapa.actualizar(archivos.obtenerArchivos());

// -- BOTONES --
// -- CREAR ARCHIVO --
document.querySelector("#btn-crear-archivo").addEventListener("click", () => {
   let nombre = window.prompt("Escribe el nombre: ", "archivo.txt");
   let nro_bloques = parseInt(window.prompt("¿Cuántos bloques necesita? (máximo libres: 11)", 5));

   const bloques = mapa.obtenerBloques(nro_bloques);

   archivos.agregarArchivo({ nombre, bloques });
   const id = archivos.obtenerId();
   lista.agregarItem(nombre, bloques, id);
   mapa.actualizar(archivos.obtenerArchivos());
});

// -- ELIMINAR ARCHIVOS --
function eliminarArchivo() {
   let itemArchivo = this.closest(".itemArchivo");
   let id = parseInt(itemArchivo.dataset.id);

   archivos.eliminarArchivo(id);
   mapa.actualizar(archivos.obtenerArchivos());
   itemArchivo.remove();
};

document.querySelectorAll("#btn-eliminar-archivo").forEach(button => {
   button.addEventListener("click", eliminarArchivo)
}); 
