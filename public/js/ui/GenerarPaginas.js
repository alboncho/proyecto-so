export class GenerarPaginas {
   constructor(_elemento) {
      this.elemento = _elemento;
      this.paginas = null;
   }
   
   crearPaginasVacias(datos) {
      // const colores = ['#e2316c', '#df4e7e'];
      const colores = ['#6364aa', '#6B6DC2'];
   
      for (let i=0; i<datos.length; i++) {
         let div = document.createElement('div');
         div.classList.add('bxPagina');
         div.style.background = colores[i%2];
         div.setAttribute('data-id', i);
   
         this.elemento.append(div);
      }


      this.paginas = this.elemento.children;
   }

   limpiar() {
      [...this.paginas].forEach(p => {
         [...p.children].forEach(c => {
            c.remove();
         });
      });
   }

   // limpiarPaginas(paginas) {
   //    [...paginas].forEach(p => {
   //       [...p.children].forEach(c => {
   //          c.textContent = "";
   //       });
   //    });
   // }

   crearMarcos(nro) {
      let paginas = document.querySelectorAll('.bxPagina');

      [...paginas].forEach(p => {
         for (let i=0; i<nro; i++) {
            let div = document.createElement('div');
            div.classList.add('item');

            p.append(div);
         }
      });
   }

   mostrarResultado(resultado) {
      let fallos = [];

      [...this.paginas].forEach(p => {
         let items = p.children;

         let id = parseInt(p.getAttribute('data-id'));
         let objeto = resultado[id];
         let pintar = objeto.pintar;
         let cola = objeto.paginas;
         let index = 0;

         fallos.push(objeto.fallo);

         [...items].forEach(i => {   
            if (cola[index] != undefined) {
               if (pintar != -1 && index === pintar) 
                  i.classList.add("pintar");

               i.textContent = cola[index];
            } 
            index++;
         });

      });

      return fallos;
   }
}