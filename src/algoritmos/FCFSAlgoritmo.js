import { Algoritmo } from './Algoritmo.js';

export class FCFSAlgoritmo extends Algoritmo {
   calcular(datos) {
      const copia = [...datos];
      const resultado = [];
      let tiempo = 0;
      let proceso = copia.shift();

      let id = 0;

      while (true) {
         if (parseInt(proceso.split(' ')[0]) <= tiempo) {
            id++;
            let inicio = tiempo;
            let llegada = parseInt(proceso.split(' ')[0]);
            tiempo += parseInt(proceso.split(' ')[1]);

            const T = tiempo - parseInt(proceso.split(' ')[0]);
            const E = T - parseInt(proceso.split(' ')[1]);
            const I = parseFloat(
               (parseInt(proceso.split(' ')[1]) / T).toFixed(2)
            );

            resultado.push({ fin: tiempo, T, E, I, inicio, llegada, id });

            if (!copia.length) break;

            proceso = copia.shift();
         } else {
            tiempo++;
         }
      }

      return resultado;
   }
}