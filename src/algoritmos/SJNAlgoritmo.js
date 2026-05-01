import { Algoritmo } from "./Algoritmo.js";

export class SJNAlgoritmo extends Algoritmo {
   calcular(datos) {
      let datos_copia = [...datos];
      let datos_ordenados = [];

      let _id = 0;

      while (true) {
         let proceso_ant = datos_copia.shift();

         _id++;
         proceso_ant += " " + _id.toString();

         let tmp = [];
         tmp.push(proceso_ant);

         while (true) {
            if (datos_copia.length == 0) break;

            let item = datos_copia.shift();

            if (item.split(' ')[0] === proceso_ant.split(' ')[0]) {
               _id++;
               item += " " + _id.toString();
               tmp.push(item);
            } else {
               datos_copia.unshift(item);
               break;
            }
         }

         this.ordenarPorTiempoEjecucion(tmp);
         datos_ordenados.push(...tmp);

         if (datos_copia.length === 0) break;
      }

      let resultado = [];
      let tiempo = 0;
      // let sumT = 0, sumE = 0, sumI = 0;

      let proceso = datos_ordenados.shift();

      while (true) {
         if (parseInt(proceso.split(' ')[0]) <= tiempo) {
            let id = parseInt(proceso.split(' ')[3]);
            let inicio = tiempo;
            let llegada = parseInt(proceso.split(' ')[0]);
            tiempo += parseInt(proceso.split(' ')[1]);

            let T = tiempo - parseInt(proceso.split(' ')[0]);
            let E = T - parseInt(proceso.split(' ')[1]);
            let I = parseFloat((parseInt(proceso.split(' ')[1]) / T).toFixed(2));

            resultado.push({ fin: tiempo, T, E, I, inicio, llegada, id });

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