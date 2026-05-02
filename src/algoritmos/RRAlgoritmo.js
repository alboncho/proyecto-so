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


      // EMPEZAR A CALCULAR
      let resultado = [];
      datos = datos.map((dato, index) => {return dato += " "  + (index + 1).toString()});

      let copia = [...datos];
      let tiempo = 0;
      let cola = [];

      while (true) {
         if (copia.length == 0) break;

         this.actualizarCola(cola, copia, tiempo);

         if (cola.length != 0) {
            while (true) {
               let proceso = cola.shift();

               
               if (parseInt(proceso.split(' ')[1]) > quantum) {
                  let nueva_rafaga = parseInt(proceso.split(' ')[1]) - quantum;
                  
                  let array_proceso = proceso.split(' ');
                  array_proceso[1] = nueva_rafaga;
                  proceso = array_proceso.join(' ');
                  
                  if (proceso.split(' ').length < 5) {
                     for (let i=tiempo; i<(tiempo + quantum); i++) {
                        if (i == tiempo) {
                           proceso += " " + i;
                        } else {
                           proceso += "," + i;
                        }
                     }
                  } else {
                     for (let i=tiempo; i<(tiempo + quantum); i++) {
                        proceso += "," + i;
                     }
                  }

                  tiempo += quantum;

                  this.actualizarCola(cola, copia, tiempo);

                  cola.push(proceso);
               } else {
                  let array_proceso = proceso.split(' ');
                  let aux_rafaga = parseInt(proceso.split(' ')[1]);
                  array_proceso[1] = 0;
                  proceso = array_proceso.join(' ');

                  let rafaga = parseInt(proceso.split(' ')[1]);
                  let prioridad = parseInt(proceso.split(' ')[2]);

                  if (proceso.split(' ').length < 5) {
                     for (let i=tiempo; i<(tiempo + aux_rafaga); i++) {
                        if (i == tiempo) {
                           proceso += " " + i;
                        } else {
                           proceso += "," + i;
                        }
                     }
                  } else {
                     for (let i=tiempo; i<(tiempo +  aux_rafaga); i++) {
                        proceso += "," + i;
                     }
                  }

                  tiempo += aux_rafaga;

                  let inicio = proceso.split(' ')[4];
                  let llegada = parseInt(array_proceso[0]);
                  let id = parseInt(array_proceso[3]);
                  const T = tiempo - parseInt(array_proceso[0]);
                  const E = T - this.traerRafaga(datos, array_proceso[3]);
                  const I = (this.traerRafaga(datos, array_proceso[3]) / T).toFixed(3);

                  resultado.push({ fin: tiempo, T, E, I, inicio, llegada, id, rafaga, prioridad });
                  this.actualizarCola(cola, copia, tiempo);
               }

               if (cola.length == 0) break;
            }
         } else {
            tiempo++;
         }
      }

      console.log("resultado ", resultado);
      return resultado;
   }

   traerRafaga(datos, id) {
      for (let i=0; i<datos.length; i++) {
         if (datos[i].split(' ')[3] == parseInt(id)) {
            return parseInt(datos[i].split(' ')[1]);
         }
      }
   }

   actualizarCola(cola, copia, tiempo) {
      while (copia.length != 0) {
         let item = copia.shift();

         if (parseInt(item.split(' ')[0]) <= tiempo) {
            cola.push(item);
         } else {
            copia.unshift(item);
            break;
         }
      }
   }
}