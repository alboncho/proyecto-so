export class RenderTabla {
   constructor(tablas) {
      this.tablas = tablas; 
   }

   renderProcesos(datos) {
      let copia = [...datos];

      const campos = ["id", "ti", "t", "prioridad"];
      let i = 0;
      let flag = true;

      this.tablas.forEach(function(tabla) {
         let tbody = tabla.querySelector('tbody');

         while (copia.length != 0) {
            let tr = document.createElement('tr');
            let proceso = copia.shift();

            for (let j=0; j<8; j++) {
               let td = document.createElement('td');

               if (proceso[campos[j]] != undefined) 
                  td.textContent = proceso[campos[j]];
               else 
                  td.textContent = "";

               tr.appendChild(td);
            }
            tbody.appendChild(tr);
            
            i++;
            if (i === Math.ceil(datos.length / 2) && flag) {
               flag = false;
               break;
            }
         }
         tabla.appendChild(tbody);
      });
   }

   limpiar() {
      this.tablas.forEach(function(tabla) {
         const tbody = tabla.querySelector('tbody');
         const filas= tbody.children;

         [...filas].forEach((fila) => {
            if (!isNaN(parseInt(fila.children[0].textContent))) {
               const columnas = fila.children;
               let index = 0;
               
               [...columnas].forEach((columna) => {
                  if (index >= 4) 
                     columna.textContent = "";

                  index++; 
               });
            }
         });
      });
   }

   renderResultado(resultado) {
      this.limpiar();

      let copia = [...resultado];
      let index = 0;

      this.tablas.forEach((tabla) => {
         const tbody = tabla.querySelector('tbody');
         const filas = tbody.children;

         [...filas].forEach((fila) => {
            if (!isNaN(parseInt(fila.children[0].textContent))) {
               const columnas = fila.children;
               
               let campos = ["tf", "T", "E", "I"];

               [...columnas].forEach(columna => {
                  if (columna.textContent === "") {
                     columna.textContent = copia.find(c => c.id === index)[campos.shift()];
                  }
               });

               index++;
            }
         });
      });
   }
}