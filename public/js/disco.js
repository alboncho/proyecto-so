import { LeerPeticiones } from "./data/LeerPeticiones.js";
import { DiscoAlgoritmoFCFS } from "./algoritmos/DiscoAlgoritmoFCFS.js";
import { DiscoAlgoritmoSCAN } from "./algoritmos/DiscoAlgoritmoSCAN.js";
import { DiscoAlgoritmoSSFS } from "./algoritmos/DiscoAlgoritmoSSTF.js";
import { DiscoResultado } from "./ui/DiscoResultado.js";

const leer = new LeerPeticiones();
const datos = await leer.leer();
const disco_resultado = new DiscoResultado();

// -- OBJETO ALGORITMOS --
const algoritmos = {
   FCFS: new DiscoAlgoritmoFCFS(),
   SSTF: new DiscoAlgoritmoSSFS(),
   SCAN: new DiscoAlgoritmoSCAN(),
}

// -- AGREGANDO DATOS AL TEXTAREA --
document.querySelector("#cola-peticiones").value = datos.join(",");

// -- RECUPERANDO ELEMENTOS --
const bxScanDireccion = document.querySelector("#scan-direccion");
const bxAlgoritmos = document.querySelector("#algoritmos");
const textarea = document.querySelector("#cola-peticiones");
const posicionCabezal = document.querySelector("#posicion-cabezal");
const direccionScan = document.querySelector("#direccion-scan");
const cilindroMaximo = document.querySelector("#cilindro-maximo");
const bxOrdenAtencion = document.querySelector(".ordenAtencion");

let algoritmo = "";

// -- FUNCION PARA ALGORITMO SCAN --
function intercambiarScanDireccion () {
   algoritmo = bxAlgoritmos.value;
   bxScanDireccion.style.display = algoritmo === 'scan' ? 'flex' : 'none';
}
intercambiarScanDireccion();
bxAlgoritmos.addEventListener("change", intercambiarScanDireccion);

// -- EJECUTAR ALGORITMOS -- 
document.querySelector(".btnCorrer").addEventListener("click", (e) => {
   let cola = textarea.value.split(",").map(e => parseInt(e.trim())).filter(e => !isNaN(e));

   let resultado;

   if (algoritmo === "scan") {

      resultado = algoritmos[algoritmo.toUpperCase()].calcular(cola, posicionCabezal.value, direccionScan.value, cilindroMaximo.value);
   } else {
       resultado = algoritmos[algoritmo.toUpperCase()].calcular(cola, posicionCabezal.value);
   }

   disco_resultado.mostrar(resultado);
});

// -- LIMPIAR --
document.querySelector(".btnLimpiar").addEventListener("click", () => {
   disco_resultado.limpiar(document.querySelector(".ordenAtencion"), document.querySelector(".xSeek"));
})