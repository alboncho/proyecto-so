export class RankingTP {
   array = [];

   constructor(_elemento) {
      this.elemento = _elemento;
   }

   actualizarRanking(datos) {
      this.limpiar();
      
      let index = this.array.findIndex(a => a.nombre === datos.nombre);
      
      if (index != -1) {
         this.array[index] = datos;
      } else {
         this.array.push(datos);
      }

      this.ordenar();
      this.ponerPosicion();

      this.array.forEach(a => {
         let div = document.createElement("div");
         div.classList.add("itemRanking");

         const { div_nroR, div_nombre, div_rend } = this.generarElementosDiv();

         div_nroR.textContent = "#" + a.posicion;
         div_nombre.textContent = a.nombre;
         div_rend.textContent = a.rendimiento + "%";

         div.append(div_nroR);
         div.append(div_nombre);
         div.append(div_rend);

         this.elemento.append(div);
      });
   }

   limpiar() {
      [...this.elemento.children].forEach(c => {
         c.remove();
      })
   }

   ordenar() {
      this.array.sort((a, b) => b.rendimiento - a.rendimiento );
   }

   ponerPosicion() {
      this.array.forEach((a, index) => a.posicion = (index + 1));
   }

   generarElementosDiv() {
      let div_nroR = document.createElement('div');
      div_nroR.classList.add("nroRanking");

      let div_nombre = document.createElement("div");
      div_nombre.classList.add("nombreAlgoritmo");

      let div_rend = document.createElement("div");
      div_rend.classList.add("txtRendimiento");

      return { div_nroR, div_nombre, div_rend };
   }
}