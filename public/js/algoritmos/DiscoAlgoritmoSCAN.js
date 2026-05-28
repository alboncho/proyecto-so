import { Algoritmo } from './Algoritmo.js';

export class DiscoAlgoritmoSCAN extends Algoritmo {
   calcular(cola, P, direccion, max_cilindro) {
      let copia = [...cola].sort((a, b) => a-b);
      P = parseInt(P);

      return this.recorrerDisco(copia, P, direccion, parseInt(max_cilindro));
   }

   recorrerDisco(cola, P, dir, max_cil) {
      let resultado = [];
      let seek = 0;
      let index = this.indexAEmpezar(cola, P, dir);

      if (dir === "arriba") {
         // -- AVAZNAR ADELANTE --
         for (let i=index; i<cola.length; i++) {
            if (cola[i] <= max_cil) { 
               resultado.push(cola[i]);

               seek += Math.abs(P - cola[i]);
               P = cola[i];
            }
         }

         seek += Math.abs(P - max_cil);
         P = max_cil;

         // -- VOLVER --
         for (let i=index-1; i>=0; i--) {
            resultado.push(cola[i]);
            
            seek += Math.abs(P - cola[i]);
            P = cola[i];
         }
      } else {
         // -- RETROCEDER --
         for (let i=index; i>=0; i--) {
            resultado.push(cola[i]);

            seek += Math.abs(P - cola[i]);
            P = cola[i];
         }

         seek += cola[0];
         P = 0;

         // -- AVANZAR ADELANTE --
         for (let i=index+1; i<cola.length; i++) {
            if (cola[i] <= max_cil) {
               resultado.push(cola[i]);
   
               seek += Math.abs(P - cola[i]);
               P = cola[i];
            }
         }
      }

      return { cola: resultado, seek };
   } 

   indexAEmpezar(cola, P, dir) {
      if (dir === "arriba") {
         for (let i=0; i<cola.length-1; i++) {
            if (P === cola[i])
               return i;
            if (cola[i] < P && P < cola[i+1]) 
               return i+1;
         }
      } else {
         for (let i=0; i<cola.length-1; i++) {
            if (P === cola[i] || (cola[i] < P && P < cola[i+1])) 
               return i;
         }
      }
   }
}