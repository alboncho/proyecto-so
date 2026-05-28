import { Algoritmo } from './Algoritmo.js';

export class DiscoAlgoritmoSSFS extends Algoritmo {
   calcular(cola, P) {
      let copia = [...cola];
      let resultado = [];
      P = parseInt(P);
      let seek = 0;

      while (copia.length != 0) {
         let index = this.buscarPeticionCerca(copia, P);
         
         seek += Math.abs(copia[index] - P); 
         P = copia[index]

         resultado.push(copia[index]);
         copia.splice(index, 1);
      }

      return { cola: resultado, seek };
   }

   buscarPeticionCerca(copia, P) {
      let menor = 10000;
      let index = -1;

      for (let i=0; i<copia.length; i++) {
         if (Math.abs(copia[i] - P) < menor) {
            menor = Math.abs(copia[i] - P);
            index = i;
         }
      }

      return index;
   }
}