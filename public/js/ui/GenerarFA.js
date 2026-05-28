export class GenerarFA {
   constructor(_elemento) {
      this.elemento = _elemento;
      this.hijos = null;
   }

   crearColaVacia(datos) {
      for (let i=0; i<datos.length; i++) {
         let div = document.createElement('div');
         div.classList.add('FA');
         div.innerHTML = i;

         this.elemento.appendChild(div);
      }

      this.hijos = this.elemento.children;
   }

   limpiar() {
      [...this.hijos].forEach(h => {
         h.textContent = "";
      });
   }

   mostrarResultado(fallos) {
      let eficiencia_datos = { nroPaginas: fallos.length };
      let index = 0;

      [...this.hijos].forEach(h => {
         if (fallos[index] === "F") {
            h.classList.remove("ok");
            h.classList.add("fallo");
            eficiencia_datos.nroFallos = (eficiencia_datos.nroFallos || 0) + 1;
         } else {
            h.classList.remove("fallo");
            h.classList.add("ok");
         }

         h.innerHTML = fallos[index];
         index++;
      });

      return eficiencia_datos;
   }
}