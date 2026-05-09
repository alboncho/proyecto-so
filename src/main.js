import { LeerProceso } from './data/LeerProceso.js';
import { ParsearProceso } from './data/ParsearProceso.js';
import { FCFSAlgoritmo }   from './algoritmos/FCFSAlgoritmo.js';
import { SJNAlgoritmo }    from './algoritmos/SJNAlgoritmo.js';
import { RRAlgoritmo } from './algoritmos/RRAlgoritmo.js';
import { RenderTabla }   from './ui/RenderTabla.js';
import { ModalController } from './ui/ModalController.js';
import { RenderPromedio }  from './ui/RenderPromedio.js';
import { RenderGrafico } from './ui/RenderGrafico.js';
import { PrioridadAlgoritmo } from './algoritmos/PrioridadAlgoritmo.js';
import { RenderRanking } from './ui/RenderRanking.js';

const reader = new LeerProceso();
const parser = new ParsearProceso();
const modal = new ModalController(document.querySelector('.bxModal'));
const table = new RenderTabla(document.querySelectorAll('.tablaProcesos'));
const promedio = new RenderPromedio();
const grafico = new RenderGrafico(document.querySelector('.cuadriculas'));
const ranking = new RenderRanking(document.querySelector('.tablaRanking'));

// Mapa de algoritmos: agregar uno nuevo = una linea aqui
const algoritmos = {
   FCFS: new FCFSAlgoritmo(),
   SJN: new SJNAlgoritmo(),
   RR: new RRAlgoritmo(),
   Prioridad: new PrioridadAlgoritmo()
};

const datos = parser.parse(await reader.read());
table.renderProcesos(datos);

let bxsAlgoritmos = document.querySelectorAll('.algoritmo');
let nombre_algoritmo;

[...bxsAlgoritmos].forEach(algoritmo => {
   algoritmo.addEventListener('click', (e) => { 

      [...bxsAlgoritmos].forEach(algoritmo => {
         algoritmo.classList.remove('active');
      })

      e.target.classList.toggle('active') 
      nombre_algoritmo = e.target.textContent;
   });
});

document.querySelector('.btnCorrer').addEventListener('click', () => {
   const seleccionado = nombre_algoritmo;

   if (!seleccionado) { modal.mostrar(); return; }

   const resultado = algoritmos[seleccionado].calcular(datos);

   table.limpiar();
   table.renderResultado(resultado);
   let promedio_resultado = promedio.mostrarPromedio(resultado);

   ranking.actualizarTabla(nombre_algoritmo, promedio_resultado);

   grafico.limpiar();
   grafico.mostrarGrafico(resultado);
});

document.querySelector('.btnLimpiar').addEventListener('click', () => {
   table.limpiar();
});

document.querySelector('.spriteDownload').addEventListener('click', (e) => {
   e.target.style.backgroundPosition = `0 0`;
   e.target.classList.add('activeSprite');
})

document.querySelector('.iconoMenu').addEventListener('click', () => {
   document.querySelector('.contenidoMenu').classList.toggle('active');
});