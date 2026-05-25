export class RenderRanking {
   array_promedios = [];

   constructor(tabla) {
      this.tabla = tabla;
   }

   actualizarTabla(datos) {
      let flag = true;
      
      for (let e of this.array_promedios) {
         if (e.nombre === datos.nombre) flag = false
      }

      if (flag) {
         this.array_promedios.push(datos);
         this.ordenarDatos(this.array_promedios);
         this.agregarNroPosicion(this.array_promedios);
   
         this.limpiarTabla();
   
         let orden = ["nro", "nombre", "T", "E", "I"]; 
   
         this.array_promedios.forEach((valor) => {
            let tr = document.createElement('tr');
   
            orden.forEach(item => {
               let td = document.createElement('td');
   
               switch (item) {
                  case "nro":
                     td.classList.add('nroRanking');
                     break;
                  case "nombre":  
                     td.classList.add('nombreRanking');
                     break;
                  default: 
                     break;
               }
   
               td.textContent = valor[item];
               tr.appendChild(td);
            });
   
            this.tabla.tBodies[0].appendChild(tr);
         });
      }
   }

   ordenarDatos(datos) { 
      datos.sort((a, b) => a.T - b.T);
   }

   agregarNroPosicion(datos) {
      datos.forEach((dato, index) => {
         dato.nro = (index + 1);
      });
   }

   limpiarTabla() {
      [...this.tabla.tBodies[0].children].forEach(tr => {
         if (!isNaN(parseInt(tr.children[0].textContent))) 
            tr.remove();
      });
   }

}