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

      sumT = (sumT / copia_resultado.length).toFixed(3);
      sumE = (sumE / copia_resultado.length).toFixed(3);
      sumI = (sumI / copia_resultado.length).toFixed(3);

      this.ctnT.textContent = sumT;
      this.ctnE.textContent = sumE;
      this.ctnI.textContent = sumI;

      return { T: sumT, E: sumE, I: sumI };
   }
}