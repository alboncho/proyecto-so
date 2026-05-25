import { Algoritmo } from './Algoritmo.js';

export class FCFSAlgoritmo extends Algoritmo {
   calcular(datos) {
      const copia = datos.map(d => ({ ...d }));
      const resultado = [];

      let tiempo = 0;
      let proceso = copia.shift();

      while (true) {
         if (proceso.ti <= tiempo) {
            let inicio = tiempo;

            tiempo += proceso.t;

            const T = tiempo - proceso.ti;
            const E = T - proceso.t;
            const I = parseFloat((proceso.t / T).toFixed(3));

            resultado.push(
               { 
                  ...proceso,
                  tf: tiempo, 
                  T, 
                  E, 
                  I, 
                  inicio 
               }
            );

            if (!copia.length) break;
            proceso = copia.shift();
         } else 
            tiempo++;
      }

      return resultado;
   }
}