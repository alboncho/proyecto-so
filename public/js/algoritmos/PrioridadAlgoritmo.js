import { Algoritmo } from "./Algoritmo.js";

export class PrioridadAlgoritmo extends Algoritmo {
   calcular(datos) {
      let copia = [...datos];
      let cola = [];
      let resultado = [];
      let tiempo = 0;

      while (true) {
         if (copia.length === 0) break;
         this.actualizarCola(copia, cola, tiempo);

         while (cola.length != 0) {
            let proceso = cola.shift();

            if (proceso.t > 1) {
               proceso.t -= 1;
               proceso.inicio = [...(proceso.inicio || []), tiempo];

               tiempo++;

               cola.push(proceso);
               this.actualizarCola(copia, cola, tiempo);
            } else {
               proceso.inicio = [...(proceso.inicio || []), tiempo];

               tiempo++;

               let rafaga = this.traerRafaga(proceso.id, datos);
               proceso.t = rafaga;

               let T =  tiempo - proceso.ti;
               let E = T - proceso.t;
               let I = parseFloat((proceso.t / T).toFixed(3));
               
               resultado.push(
                  { 
                     ...proceso,
                     tf: tiempo, 
                     T, 
                     E, 
                     I
                  }
               );
               
               this.actualizarCola(copia, cola, tiempo);
            }
         }

         tiempo++;
      }

      return resultado;
   }


   ordenarCola(cola) {
      cola.sort((a, b) => b.prioridad - a.prioridad)
   }

   actualizarCola(copia, cola, tiempo) {
      while (copia.length != 0) {
         let item = copia.shift();

         if (item.t <= tiempo) {
            cola.push(item);
         } else {
            copia.unshift(item);
            break;
         }
      }

      this.ordenarCola(cola);
   }

   agregarInicio(proceso, tiempo) {
      if (proceso.split(' ').length < 5) {
         proceso += " " + (tiempo);
      } else {
         proceso += "," + (tiempo);
      }

      return proceso;
   }

   traerRafaga(id, datos) {
      for (let i=0; i<datos.length; i++) {
         if (datos[i].id === id)
            return datos[i].t;
      }
   }
}