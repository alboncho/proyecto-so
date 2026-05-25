import { Algoritmo } from "./Algoritmo.js";

export class RRAlgoritmo extends Algoritmo {
   calcular(datos) {
      // RECIBIENDO quantum
      let quantum = 0;
      
      // VALIDANDO quantum
      do {
         quantum = parseFloat(prompt("ingrese su numero de quantum"));
      } while (isNaN(quantum) || quantum <= 0);
      
      quantum = Math.round(quantum);

      // CALCULAR 
      let resultado = [];
      let copia = datos.map(d => ({ ...d }));

      let tiempo = 0;
      let cola = [];

      while (true) {
         if (copia.length == 0) break;

         this.actualizarCola(cola, copia, tiempo);

         while (cola.length != 0) {
            let proceso = cola.shift();
            
            if (proceso.t > quantum) {
               proceso.t -= quantum;
               proceso.inicio = this.agregarInicio(proceso.inicio, tiempo, quantum);

               tiempo += quantum;

               this.actualizarCola(cola, copia, tiempo);
               cola.push(proceso);
            } else {
               let rafaga = this.traerRafaga(proceso.id, datos);

               proceso.t = rafaga;
               proceso.inicio = [...(proceso.inicio || []), tiempo];

               tiempo += proceso.t;

               const T = tiempo - proceso.ti;
               const E = T - rafaga;
               const I = parseFloat((rafaga / T).toFixed(3));

               resultado.push(
                  { 
                     ...proceso,
                     tf: tiempo, 
                     T, 
                     E, 
                     I
                  }
               );

               this.actualizarCola(cola, copia, tiempo);
            }
         }
         tiempo++;
      }

      return resultado;
   }

   traerRafaga(id, datos) {
      for (let i=0; i<datos.length; i++) {
         if (datos[i].id == id) {
            return parseInt(datos[i].t);
         }
      }
   }

   actualizarCola(cola, copia, tiempo) {
      while (copia.length != 0) {
         let item = copia.shift();

         if (item.ti <= tiempo) {
            cola.push(item);
         } else {
            copia.unshift(item);
            break;
         }
      }
   }

   agregarInicio(array, tiempo, quantum) {
      if (array != undefined) {
         for (let i=0; i<(tiempo + quantum); i++) {
            array.push(i);
         }
      } else {
         array = []
         for (let i=0; i<(tiempo + quantum); i++) {
            array.push(i);
         }
      }

      return array;
   }
}