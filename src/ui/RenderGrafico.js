export class RenderGrafico {
   constructor(_elemento) {
      this.elemento = _elemento;
   }

   mostrarGrafico(resultado) {
      let columnas = parseInt(resultado[resultado.length-1].fin);
      let matriz = [];

      let copia_resultado = [...resultado].reverse();

      for (let i=resultado.length; i>0; i--) {
         let filas = [];
         let item = this.traerContenido(copia_resultado, i);
         for (let j=0; j<columnas; j++) {
            if (this.isRango(item, j)) {
               if (this.isFinal(item, j)) {
                  filas.push("x");
               } else {
                  filas.push("#");
               }
            } else {
               filas.push(0);
            }
         }
         matriz.push(filas);
      }

      this.elemento.style.gridTemplateColumns = `repeat(${columnas}, 11px)`;
      this.elemento.style.gridTemplateRows = `repeat(${resultado.length}, 11px)`

      let contador_id = resultado.length;

      matriz.forEach(fila => {
         fila.forEach(columna => {
            let div = document.createElement('div');
            div.setAttribute('data-id', contador_id);
            div.classList.add('celda');
            
            div.addEventListener('click', (e) => {this.mostrarInfo(e, copia_resultado)});
            
            if (columna === "#") 
               div.classList.add('bloque');
            else if (columna === "x") 
               div.classList.add('final');
            else 
               div.classList.add('oculto');
            
            this.elemento.appendChild(div);
         })
         contador_id--;
      })
      
      this.ilumiinarFila();
      // this.mostrarEjes(resultado);
   }

   ilumiinarFila() {
      const bloques = document.querySelectorAll('.celda');

      bloques.forEach(bloque => {
         bloque.addEventListener('mouseenter', () => {
            const id = bloque.dataset.id;

            document.querySelectorAll(`.celda[data-id="${id}"]`).forEach(e => {
               if (!e.classList.contains('bloque') && !e.classList.contains('final')) e.classList.add('hover-activo');
            });
         })

         bloque.addEventListener('mouseleave', () => {
            document.querySelectorAll('.hover-activo').forEach(e => e.classList.remove('hover-activo'));
         })
      })
   }

   isFinal(item, j) {
      if (j === parseInt(item.fin-1)) return true;
      return false;
   }

   mostrarInfo(e, copia) {
      let txtNroProceso = document.querySelector('.txtNroProceso');
      let txtInicio = document.querySelector('.txtInicio');
      let txtEjecucion = document.querySelector('.txtEjecucion');
      let txtPrioridad = document.querySelector('.txtPrioridad');
      let txtFinal = document.querySelector('.txtFinal');
      let txtT = document.querySelector('.txtT');
      let txtE = document.querySelector('.txtE');
      let txtI = document.querySelector('.txtI');


      console.log("id ", e.target.getAttribute('data-id'));
      txtNroProceso.textContent = this.traerContenido(copia, e.target.getAttribute('data-id')).id;
      txtInicio.textContent = this.traerContenido(copia, e.target.getAttribute('data-id')).llegada;
      txtEjecucion.textContent =this.traerContenido(copia, e.target.getAttribute('data-id')).rafaga;
      txtPrioridad.textContent = this.traerContenido(copia, e.target.getAttribute('data-id')).prioridad;
      txtFinal.textContent = this.traerContenido(copia, e.target.getAttribute('data-id')).fin;
      txtT.textContent = this.traerContenido(copia, e.target.getAttribute('data-id')).T;
      txtE.textContent = this.traerContenido(copia, e.target.getAttribute('data-id')).E;
      txtI.textContent = this.traerContenido(copia, e.target.getAttribute('data-id')).I;
   }

   isRango(item, j) {
      if (typeof item.inicio === "string") {
         let array = item.inicio.split(',');
         for (let i=0; i<array.length; i++) {
            if (parseInt(array[i]) == j && j < item.fin) return true;
         }
         return false;
      } else {
         if (j >= parseInt(item.inicio) && j < (item.fin)) return true;
         return false;
      }
   }

   traerContenido(copia, index) {
      for (let i=0; i<copia.length; i++) {
         if (copia[i].id == index) {
            return copia[i];
         }
      }
   }

   mostrarEjes(resultado) {
      let bxEjeY = document.querySelector('.ejeY');
      bxEjeY.style.gridTemplateRows = `repeat(${resultado.length}, 10px)`;
      let numeros = [];

      for (let i=resultado.length; i>0; i--) {
         numeros.push(i);
      }

      numeros.forEach(numero => {
         let div = document.createElement('div');
         div.classList.add('celdaNumero');
         div.textContent = numero;

         bxEjeY.appendChild(div);
      })
   }

   limpiar() {
      [...this.elemento.children].forEach(hijos => {
         hijos.remove();
      });
   }
}