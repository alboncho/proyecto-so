import { Algoritmo } from "./Algoritmo.js";

export class AlgoritmoRPOPT extends Algoritmo {
   calcular(cola, nro_marcos) {
      let copia = cola.map(c => ({ ...c }));
      let resultado = [];
      let i = 0;
      
      copia.forEach(c => {
         let array;
         let fallo;
         let pintar = -1;
         
         if (resultado.length === 0) {
            array = [c.nro_p];
            fallo = "F";
         } 
         
         if (resultado.length != 0) {
            if (resultado[resultado.length-1].paginas.length < nro_marcos) {
               array = [...resultado[resultado.length-1].paginas];
   
               if (!this.falloPagina(resultado, c.nro_p)) {
                  array.push(c.nro_p);
                  fallo = "F";
               } else 
                  fallo = "A";
            } 
         }

         if (resultado.length != 0) {
            if (resultado[resultado.length-1].paginas.length === nro_marcos) {
               array = [...resultado[resultado.length-1].paginas];
               
               if (!this.falloPagina(resultado, c.nro_p)) {
                  let index = this.mirarFuturo(resultado, copia, i);
                  pintar = index;

                  array.splice(index, 1, c.nro_p);
                  fallo = "F";
               } else 
                  fallo = "A";
            }
         }

         resultado.push(
            {
               id: c.id,
               fallo,
               paginas: array,
               pintar
            }
         )

         i++;
      })

      return resultado;
   }

   mirarFuturo(cola, copia, posicion) {
      let cola_principal = copia.map(c => c.nro_p);
      let index_cola = -1;
      let index = -1;
      let ultimo_cola = cola[cola.length-1].paginas;

      for (let i=0; i<ultimo_cola.length; i++) {
         let index_tmp = -1;

         for(let j=posicion+1; j<cola_principal.length; j++) {
            if (ultimo_cola[i] === cola_principal[j]) {
               index_tmp = j;
               break;
            }
         }

         if (index_tmp > index_cola) {
            index_cola = index_tmp;
            index = i;
         }
      }

      return index;
   }

   falloPagina(resultado, x) {
      let ultima_cola = resultado[resultado.length-1].paginas;
      return ultima_cola.includes(x);
   }
}