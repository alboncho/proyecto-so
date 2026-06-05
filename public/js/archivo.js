import { GestionArchivos } from "./data/GestionArchivos.js";
import { MapaBloques } from "./ui/MapaBloques.js";
import { ListaArcvhivos } from "./ui/ListaArchivos.js";
import { Historial } from "./ui/Historial.js";

const archivos = new GestionArchivos();
const mapa = new MapaBloques(document.querySelector(".bxCardBloques"));
const lista = new ListaArcvhivos(document.querySelector(".listaArchivos"), eliminarArchivo);
const bxHistorial = new Historial(document.querySelector(".bxHistorial"));

mapa.actualizar(archivos.obtenerArchivos());

// -- HISTORIAL --
const historial = [];

// -- BOTONES --
// -- CREAR ARCHIVO --
document.querySelector("#btn-crear-archivo").addEventListener("click", () => {
   let nombre = window.prompt("Escribe el nombre: ", "archivo.txt");
   let nro_bloques = parseInt(window.prompt("¿Cuántos bloques necesita?", 5));

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

   let archivo_eliminado = archivos.eliminarArchivo(id);
   historial.pop();
   historial.push(archivo_eliminado);
   bxHistorial.agregarBackup(archivo_eliminado);

   mapa.actualizar(archivos.obtenerArchivos());
   itemArchivo.remove();
};

document.querySelectorAll("#btn-eliminar-archivo").forEach(button => {
   button.addEventListener("click", eliminarArchivo)
}); 

// -- RECUPEARA ULTIMO ARCHIVO --
document.querySelector("#btn-recuperar-archivo").addEventListener("click", (e) => {
   if (historial.length === 0) return;

   let item = historial.pop();

   if (mapa.bloquesSobrescritos(item)) {
      alert("Los bloques ya fueron sobrescritos.")
      return;
   }

   bxHistorial.limpiar();


   archivos.agregarArchivo(item);
   const id = archivos.obtenerId();
   lista.agregarItem(item.nombre, item.bloques, id);
   mapa.actualizar(archivos.obtenerArchivos());
});