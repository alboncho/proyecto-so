import { Algoritmo } from "./Algoritmo.js";

export class AlgoritmoRPFCFS extends Algoritmo {
   calcular(cola, nro_marcos) {
      let copia = cola.map(c => ({ ...c }));
      let resultado = [];
      
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
                  array = [...array, c.nro_p];
                  fallo = "F";
               } else 
                  fallo = "A";
            } 
         }

         if (resultado.length != 0) {
            if (resultado[resultado.length-1].paginas.length == nro_marcos) {
               array = [...resultado[resultado.length-1].paginas];
               
               if (!this.falloPagina(resultado, c.nro_p)) {
                  let index = this.buscarPaginaAntigua(resultado);
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
      })

      return resultado;
   }

   buscarPaginaAntigua(cola) {
      let mayor = 0;
      let index = -1;
      let ultimo_array = cola[cola.length-1].paginas;
      
      for (let k=0; k<ultimo_array.length; k++) {
         let cantidad = 0;

         for (let i=cola.length-1; i>=0; i--) {
            if (cola[i].paginas[k] === ultimo_array[k]) {
               cantidad++;
            } else {
               break;
            }
         }

         if (cantidad > mayor) {
            mayor = cantidad;
            index = k;
         }
      }

      return index;
   }

   falloPagina(resultado, x) {
      let ultima_cola = resultado[resultado.length-1].paginas;
      return ultima_cola.includes(x);
   }
}