export class RenderPromedio {
   constructor() {
      this.ctnT = document.querySelector(`.resultadoT`);
      this.ctnE = document.querySelector(`.resultadoE`);
      this.ctnI = document.querySelector(`.resultadoI`);
   }

   mostrarPromedio(resultado) {
      let sumT = 0;
      let sumE = 0;
      let sumI = 0;

      resultado.forEach(resultado => {
         sumT += resultado.T;
         sumE += resultado.E;
         sumI += resultado.I;
      });

      sumT = (sumT / resultado.length).toFixed(3);
      sumE = (sumE / resultado.length).toFixed(3);
      sumI = (sumI / resultado.length).toFixed(3);

      this.ctnT.textContent = sumT;
      this.ctnE.textContent = sumE;
      this.ctnI.textContent = sumI;

      return { T: sumT, E: sumE, I: sumI };
   }
}