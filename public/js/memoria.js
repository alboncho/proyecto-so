import { GenerarCola } from "./ui/GenerarCola.js";
import { GenerarFA } from "./ui/GenerarFA.js";
import { GenerarPaginas } from "./ui/GenerarPaginas.js";
import { AlgoritmoRPFCFS } from "./algoritmos/AlgoritmoRPFCFS.js";
import { AlgoritmoRPLRU } from "./algoritmos/AlgoritmoRPLRU.js";
import { AlgoritmoRPOPT } from "./algoritmos/AlgoritmoRPOPT.js";
import { LeerPaginas } from "./data/LeerPaginas.js";
import { MostrarEficiencia } from "./ui/MostrarEficiencia.js";
import { RankingTP } from "./ui/RankingTP.js";

const cola = new GenerarCola(document.querySelector('.bxCola'));
const paginas = new GenerarPaginas(document.querySelector('.bxPaginas'));
const fa = new GenerarFA(document.querySelector('.bxFA'));
const leer = new LeerPaginas();
const eficiencia = new MostrarEficiencia();
const rankingTP = new RankingTP(document.querySelector(".tablaRanking"));

const datos = await leer.leer();

cola.crearCola(datos);
paginas.crearPaginasVacias(datos);
fa.crearColaVacia(datos);

const algoritmos = {
   FCFS: new AlgoritmoRPFCFS(),
   LRU: new AlgoritmoRPLRU(),
   OPT: new AlgoritmoRPOPT()
}

document.querySelector('.btnCorrer').addEventListener('click', () => {
   const input = document.querySelector('.nroMarco');
   const algoritmo_seleccionado = document.querySelector("#algoritmos").value;

   if (isNaN(input.value) || !algoritmo_seleccionado) {
      alert('Inserte un valor valido');
      return;
   }

   paginas.limpiar();
   fa.limpiar();

   let nro_marcos = parseInt(input.value);
   paginas.crearMarcos(nro_marcos);


   const cola_paginas = cola.traerCola();
   const resultado = algoritmos[algoritmo_seleccionado].calcular(cola_paginas, nro_marcos);

   let fallos = paginas.mostrarResultado(resultado);

   let eficiencia_datos = fa.mostrarResultado(fallos);

   let ranking_datos = eficiencia.mostrar(eficiencia_datos, algoritmo_seleccionado);

   rankingTP.actualizarRanking(ranking_datos);
});

// <--- SCROLL --->
const contenedor_cola = document.querySelector(".bxCola");
const contenedor_paginas = document.querySelector(".bxPaginas");
const contenedor_fA = document.querySelector(".bxFA");

const elementos_scroll = [contenedor_cola, contenedor_fA, contenedor_paginas];

let flag = false;

elementos_scroll.forEach(el_actual => {
   el_actual.addEventListener('scroll', (e) => {
      if (flag) return;

      flag = true;

      const scroll_left = e.target.scrollLeft;
      
      elementos_scroll.forEach(el => {
         if (el != el_actual) {
            el.scrollLeft = scroll_left;
         }
      });

      window.requestAnimationFrame(() => {
         flag = false;
      });
   });
});

