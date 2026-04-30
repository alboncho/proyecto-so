export class RenderTabla {
   constructor(tablas) {
      this.tablas = tablas; 
   }

   renderProcesos(procesos) {
      let copia = [...procesos];

      let index = 0;
      let tablaUno = Math.ceil(copia.length/2);
      let tabalDos = Math.floor(copia.length/2);
      let tablaNumero = tablaUno;

      this.tablas.forEach(function(tabla) {
      for (let i=index; i<(index+tablaNumero); i++) {
         let tr = document.createElement('tr');
         let datos_proceso = copia.shift();
         for (let j=0; j<8; j++) {
            let td = document.createElement('td');
            if (j == 0) {
               td.textContent = (i+1);
            } else {
               td.textContent = datos_proceso.split(' ')[j-1];
            }
            tr.appendChild(td);
         }
         tabla.appendChild(tr);
      }
      index = tablaUno;
      tablaNumero = tabalDos;
   });
   }

   renderResultado(resultado) {
      let resultado_copia = [...resultado];

      this.tablas.forEach(function(tabla) {
         let filas = tabla.children;

         [...filas].forEach((fila) => {
            if (fila.children.length > 1) {
               let columnas = fila.children;
               let TEI = 0;

               let contenido = resultado_copia.shift();
               let valores = [];

               for (let valor in contenido) {
                  valores.push(contenido[valor]);
               }

               [...columnas].forEach(columna => {
                  if (columna.textContent == "") {
                     columna.textContent = valores[TEI];
                     TEI++;
                  }
               });
            }
         });
      });
   }

   limpiar() {
      this.tablas.forEach(function(tabla) {
         let filas = tabla.children;

         [...filas].forEach((fila) => {
            if (fila.children.length > 1) {
               let columnas = fila.children;
               let index = 0;
               
               [...columnas].forEach((columna) => {
                  if (index >= 4) {
                     columna.textContent = "";
                  }
                  index++; 
               });
            }
         });
      });
   }
}