import { Algoritmo } from "./Algoritmo.js";

export class SJNAlgoritmo extends Algoritmo {
   calcular(datos) {
      let copia = datos.map(d => ({ ...d }));
      let datos_ordenados = [];

      // ORDENANDO DATOS SEGUN TIEMPO DE EJECUCION
      while (copia.length != 0) {
         let proceso_ant = copia.shift();
         let tmp = [];
         tmp.push(proceso_ant);

         while (copia.length != 0) {
            let proceso_act = copia.shift();

            if (proceso_act.ti === proceso_ant.ti) {
               tmp.push(proceso_act);
            } else {
               copia.unshift(proceso_act);
               break;
            }
         }

         this.ordenarPorTiempoEjecucion(tmp);
         datos_ordenados = [...datos_ordenados, ...tmp];
      }

      // EMPEZANDO A CALCULAR
      let resultado = [];
      let tiempo = 0;

      let proceso = datos_ordenados.shift();

      while (true) {
         if (proceso.ti <= tiempo) {
            let inicio = tiempo;
            tiempo += proceso.t;

            let T = tiempo - proceso.ti;
            let E = T - proceso.t;
            let I = parseFloat((proceso.t / T).toFixed(2));

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

            if (datos_ordenados.length == 0) break;
            proceso = datos_ordenados.shift();
         } else 
            tiempo++;
      }

      return resultado;
   }

   ordenarPorTiempoEjecucion(tmp) {
      for (let i=0; i<tmp.length-1; i++) {
         for (let j=i+1; j<tmp.length; j++) {
            if (tmp[i].t > tmp[j].t) {
               let aux = tmp[i];
               tmp[i] = tmp[j];
               tmp[j] = aux;
            }
         }
      }
   }
}