export class GenerarCola {
   cola = [];

   constructor(_elemento) {
      this.elemento = _elemento;
   }

   crearCola(datos) {
      this.cola = [];

      for (let i=0; i<datos.length; i++) {
         let div = document.createElement('div');
         div.setAttribute('data-id', i);

         let dato = parseInt(datos[i]);
         this.cola.push({ id: i, nro_p: dato });

         div.textContent = dato; 
         div.classList.add('nroPagina');

         this.elemento.append(div);
      }
   }

   traerCola() {
      return this.cola;
   }

   limpiarCola() {
      [...this.elemento.children].forEach(c => {
         c.remove();
      })
   }
}