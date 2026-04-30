import { Algoritmo } from './Algoritmo.js';

export class FCFSAlgoritmo extends Algoritmo {
   calcular(datos) {
      const copia = [...datos];
      const resultado = [];
      let tiempo = 0;
      let proceso = copia.shift();

      while (true) {
         if (parseInt(proceso.split(' ')[0]) <= tiempo) {
            tiempo += parseInt(proceso.split(' ')[1]);

            const T = tiempo - parseInt(proceso.split(' ')[0]);
            const E = T - parseInt(proceso.split(' ')[1]);
            const I = (parseInt(proceso.split(' ')[1]) / T).toFixed(2);

            resultado.push({ fin: tiempo, T, E, I });

            if (!copia.length) break;

            proceso = copia.shift();
         } else {
            tiempo++;
         }
      }

      return resultado;
   }
}