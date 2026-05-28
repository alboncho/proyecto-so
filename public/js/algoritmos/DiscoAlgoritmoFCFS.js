import { Algoritmo } from './Algoritmo.js';

export class DiscoAlgoritmoFCFS extends Algoritmo {
   calcular(cola, P) {
      P = parseInt(P);

      let seek = cola.reduce((acc, act, i) => {
         if (i === 0) return acc + Math.abs(P - cola[i]);

         return acc + Math.abs(cola[i-1] - act);
      }, 0);

      return { cola, seek }
   }
}