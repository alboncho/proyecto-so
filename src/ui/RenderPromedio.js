export class RenderPromedio {
   constructor() {
      this.ctnT = document.querySelector(`.resultadoT`);
      this.ctnE = document.querySelector(`.resultadoE`);
      this.ctnI = document.querySelector(`.resultadoI`);
   }

   mostrarPromedio(resultado) {
      let copia_resultado = [...resultado];
      let sumT = 0;
      let sumE = 0;
      let sumI = 0;

      resultado.forEach(resultado => {
         sumT += parseInt(resultado.T);
         sumE += parseInt(resultado.E);
         sumI += parseInt(resultado.I);
      });

      this.ctnT.textContent = (sumT / copia_resultado.length).toFixed(2);
      this.ctnE.textContent = (sumE / copia_resultado.length).toFixed(2);
      this.ctnI.textContent = (sumI / copia_resultado.length).toFixed(2);
   }
}