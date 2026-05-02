import { Algoritmo } from "./Algoritmo.js";

export class PrioridadAlgoritmo extends Algoritmo {
   calcular(datos) {
      datos = datos.map((dato, index) => {return dato += " " + (index+1).toString()});

      let copia = [...datos];
      let cola = [];
      let resultado = [];
      let tiempo = 0;

      while (true) {
         if (copia.length == 0) break;

         this.actualizarCola(copia, cola, tiempo);

         while (cola.length != 0) {
            let proceso = cola.shift();

            if (parseInt(proceso.split(' ')[1]) > 1) {
               let array = proceso.split(' ');
               array[1] = parseInt(array[1]) - 1;
               proceso = array.join(' ');

               proceso = this.agregarInicio(proceso, tiempo);

               tiempo++;

               cola.push(proceso);
               this.actualizarCola(copia, cola, tiempo);

            } else {
               let array = proceso.split(' ');
               array[1] = 0;
               proceso = array.join(' ');
               let id = parseInt(array[3]);

               proceso = this.agregarInicio(proceso, tiempo);

               tiempo++;
               let inicio = proceso.split(' ')[4];
               let llegada = parseInt(proceso.split(' ')[0]);
               let T =  tiempo - llegada;
               let E = T - this.traerRafaga(array[3], datos);
               let I = parseFloat((this.traerRafaga(array[3], datos) / T).toFixed(3));

               resultado.push({ fin: tiempo, T, E, I, llegada, inicio, id });

               this.actualizarCola(copia, cola, tiempo);
            }

            if (cola.length == 0) break;
         }

         tiempo++;
      }

      return resultado;
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
         if (datos[i].split(' ')[3] === id) {
            return parseInt(datos[i].split(' ')[1]);
         }
      }
   }

   actualizarCola(copia, cola, tiempo) {
      while (copia.length != 0) {
         let item = copia.shift();
         if (parseInt(item.split(' ')[0]) <= tiempo) {
            cola.push(item);
         } else {
            copia.unshift(item);
            break;
         }
      }

      this.ordenarCola(cola);
   }

   ordenarCola(cola) {
      cola.sort((a, b) => {
         return Number(b.split(' ')[2]) - Number(a.split(' ')[2]);
      })
   }
}