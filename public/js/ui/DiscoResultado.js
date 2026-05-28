export class DiscoResultado {
   mostrar(datos) {
      const bxOrdenAtencion = document.querySelector(".ordenAtencion");
      const xSeek = document.querySelector(".xSeek");

      this.limpiar(bxOrdenAtencion, xSeek);

      this. mostrarColaDeAtencion(bxOrdenAtencion, datos.cola);
      this. mostrarSeek(xSeek, datos.seek);
   }

   mostrarColaDeAtencion(caja, cola) {
      cola.forEach(c => {
         const div = document.createElement("div");
         div.classList.add("itemOrden");
         div.innerHTML = c;

         caja.append(div);
      })
   }

   mostrarSeek(caja, seek) {
      caja.textContent = seek + " cilindros";
   }

   limpiar(caja, xSeek) {
      [...caja.children].forEach(c => {
         c.remove();
      })

      xSeek.textContent = "";
   }
}