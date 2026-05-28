import { Algoritmo } from "./Algoritmo.js";

export class AlgoritmoRPLRU extends Algoritmo {
   calcular(cola, nro_marcos) {
      let copia = cola.map(c => ({ ...c }));
      let resultado = [];
      let historia = [];
      
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
                  let index = this.buscarPaginaMenosReciente(resultado, historia);
                  pintar = index;

                  array.splice(index, 1, c.nro_p);
                  fallo = "F";
               } else 
                  fallo = "A";
            }
         }

         historia.push(c.nro_p);
         resultado.push(
            {
               id: c.id,
               fallo,
               paginas: array,
               pintar
            }
         )
      })

      return resultado;
   }

   buscarPaginaMenosReciente(cola, historia) {
      let index_cola = 10000;
      let index = -1;
      let ultimo_cola = cola[cola.length-1].paginas;

      for (let i=0; i<ultimo_cola.length; i++) {
         let index_tmp = -1;

         for(let j=historia.length-1; j>=0; j--) {
            if (ultimo_cola[i] === historia[j]) {
               index_tmp = j;
               break;
            }
         }

         if (index_tmp < index_cola) {
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