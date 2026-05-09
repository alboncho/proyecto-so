export class RenderRanking {
   array_promedios = [];

   constructor(_elemento) {
      this.elemento = _elemento;
   }

   actualizarTabla(nombre, datos) {
      datos.nombre = nombre;

      this.array_promedios.push(datos);
      this.ordenarDatos(this.array_promedios);

      this.agregarNroPosicion(this.array_promedios);

      
      if (this.elemento.children['0'].children.length > 1) {
         this.borrarTr();

         let orden = ["nro", "nombre", "T", "E", "I"]; 

         this.array_promedios.forEach((valor) => {
            let tr = document.createElement('tr');

            orden.forEach(item => {
               let td = document.createElement('td');
               if (item === "nro") {
                  td.classList.add('nroRanking');
                  td.textContent = valor[item];
               } else if (item === "nombre")  {
                  td.classList.add('nombreRanking');
                  td.textContent = valor[item];
               } else {
                  td.textContent = valor[item];
               }

               tr.appendChild(td);
            });

            this.elemento.tBodies[0].appendChild(tr);
         });
      } else {
         let tr = document.createElement('tr');

         let orden = ["nro", "nombre", "T", "E", "I"];

         orden.forEach(item => {
            let td = document.createElement('td');

            if (item === "nro") {
               td.classList.add('nroRanking');
               td.textContent = this.array_promedios[0][item];
            } else if (item === "nombre") {
               td.classList.add('nombreRanking');
               td.textContent = this.array_promedios[0][item];
            } else {
               td.textContent = this.array_promedios[0][item];
            }

            tr.appendChild(td);
         });

         this.elemento.tBodies[0].appendChild(tr);
      }
   }

   agregarNroPosicion(datos) {
      datos.forEach((dato, index) => {
         dato.nro = (index + 1);
      });
   }

   ordenarDatos(datos) { 
      console.log("ordenar datos ", datos);

      datos.sort((a, b) => a.T - b.T);
   }

   borrarTr() {
      let flag = 0;

      [...this.elemento.tBodies[0].children].forEach(tr => {
         if (flag === 1) {
            tr.remove()
         } else {
            flag = 1;
         }
      });

   }

}