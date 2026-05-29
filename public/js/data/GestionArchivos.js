export class GestionArchivos {
   archivos = [];
   id = 1;

   constructor() {
      let a_1 = { id: this.id++, nombre: "archivo.txt", bloques: [25, 26, 55] };
      let a_2 = { id: this.id++, nombre: "archivo.txt", bloques: [1, 2, 10] };

      this.archivos.push(a_1);
      this.archivos.push(a_2); 
   }

   obtenerArchivos() {
      return this.archivos;
   }

   agregarArchivo(archivo) {
      this.archivos.push({ id: this.id++, ...archivo });
   }

   obtenerId() {
      return this.archivos[this.archivos.length-1].id;
   }

   eliminarArchivo(id) {
      this.archivos = this.archivos.filter(a => a.id != id);
   }
}