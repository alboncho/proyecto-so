export class Historial {
   constructor(_elemento) {
      this.elemento = _elemento;
   }

   agregarBackup(archivo) {
      this.limpiar();

      const backup = document.createElement("div");
      backup.classList.add("backup");
      backup.innerHTML = `Documento: ${archivo.nombre} <p>Bluques: [${archivo.bloques.join(",")}]`;

      this.elemento.append(backup);
   }  

   limpiar() {
      let backup = this.elemento.querySelector(".backup");
      
      if (backup) {
         backup.remove();
      }
   }
}