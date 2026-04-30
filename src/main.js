import { LeerProceso } from './data/LeerProceso.js';
import { ParsearProceso } from './data/ParsearProceso.js';
import { FCFSAlgoritmo }   from './algoritmos/FCFSAlgoritmo.js';
import { SJNAlgoritmo }    from './algoritmos/SJNAlgoritmo.js';
import { RenderTabla }   from './ui/RenderTabla.js';
import { ModalController } from './ui/ModalController.js';
import { RenderPromedio }  from './ui/RenderPromedio.js';

const reader = new LeerProceso();
const parser = new ParsearProceso();
const modal = new ModalController(document.querySelector('.bxModal'));
const table = new RenderTabla(document.querySelectorAll('.tablaProcesos'));
const results = new RenderPromedio();

// Mapa de algoritmos: agregar uno nuevo = una linea aqui
const algoritmos = {
   FCFS: new FCFSAlgoritmo(),
   SJN: new SJNAlgoritmo(),
};

const datos = parser.parse(await reader.read());
table.renderProcesos(datos);

let bxsAlgoritmos = document.querySelectorAll('.algoritmo');
let textoAlgoritmo;

[...bxsAlgoritmos].forEach(algoritmo => {
   algoritmo.addEventListener('click', (e) => { 

      [...bxsAlgoritmos].forEach(algoritmo => {
         algoritmo.classList.remove('active');
      })

      e.target.classList.toggle('active') 
      textoAlgoritmo = e.target.textContent;
   });
});

document.querySelector('.btnCorrer').addEventListener('click', () => {
  const seleccionado = textoAlgoritmo;

  if (!seleccionado) { modal.mostrar(); return; }

  const resultado = algoritmos[seleccionado].calcular(datos);

  table.limpiar();
  table.renderResultado(resultado);
  results.mostrarPromedio(resultado);
});

document.querySelector('.btnLimpiar').addEventListener('click', () => {
   table.limpiar();
});