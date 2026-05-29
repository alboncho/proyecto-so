export class MapaBloques {
   constructor(_elemento) {
      this.elemento = _elemento;
   }

   actualizar(archivos) {
      this.actualizarTodosALibre();

      archivos.forEach(a => {
         const bloques = a.bloques;

         bloques.forEach(b => {
            const elemento = document.querySelector(`.bloque[data-id='${b}']`);

            elemento.classList.remove("libre");
            elemento.classList.add("ocupado");
         });
      });
   }

   actualizarTodosALibre() {
      [...this.elemento.children].forEach(c => {
         c.classList.remove("ocupado");
         c.classList.add("libre");
      });
   }

   obtenerBloques(n) {
      let bloques = [];

      [...this.elemento.children].forEach(c => {
         if (c.classList.contains("libre") && n != 0) {
            const bloque = parseInt(c.getAttribute('data-id'));
            bloques.push(bloque);
            n--;
         }
      });
      
      return bloques;
   }

   bloquesSobrescritos(archivo) {

      const bloques = archivo.bloques;

      for (const b of bloques) {
         const bloque = document.querySelector(`.bloque[data-id='${b}']`);
         
         if (bloque.classList.contains("ocupado")) 
            return true;
      }

      return false;
   }
}