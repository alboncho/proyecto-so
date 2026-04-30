import { Algoritmo } from "./Algoritmo.js";

export class SJNAlgoritmo extends Algoritmo {
   calcular(datos) {
      let datos_copia = [...datos];
      let datos_ordenados = [];

      while (true) {
         let proceso_ant = datos_copia.shift();
         let tmp = [];
         tmp.push(proceso_ant);

         let index = 0;

         while (true) {
            if (datos_copia.length != 0 && datos_copia[0].split(' ')[0] === proceso_ant.split(' ')[0]) {
               tmp.push(datos_copia.shift());
            } else break;
         }

         this.ordenarPorTiempoEjecucion(tmp);
         datos_ordenados.push(...tmp);

         if (datos_copia.length === 0) {
            break;
         }
      }

      let resultado = [];
      let tiempo = 0;
      // let sumT = 0, sumE = 0, sumI = 0;

      let proceso = datos_ordenados.shift();

      while (true) {
         if (parseInt(proceso.split(' ')[0]) <= tiempo) {
            tiempo += parseInt(proceso.split(' ')[1]);

            let T = tiempo - parseInt(proceso.split(' ')[0]);
            let E = T - parseInt(proceso.split(' ')[1]);
            let I = parseInt((parseInt(proceso.split(' ')[1]) / T).toFixed(2));

            resultado.push({ fin: tiempo, T, E, I });

            if (datos_ordenados.length == 0) break;

            proceso = datos_ordenados.shift();
         } else tiempo++;
      }

      return resultado;
   }

   ordenarPorTiempoEjecucion(tmp) {
      for (let i=0; i<tmp.length-1; i++) {
         for (let j=i+1; j<tmp.length; j++) {
            if (parseInt(tmp[i].split(' ')[1]) > parseInt(tmp[j].split(' ')[1])) {
               let aux = tmp[i];
               tmp[i] = tmp[j];
               tmp[j] = aux;
            }
         }
      }
   }
}