export class RenderPromedio {
   constructor() {
      this.ctnT = document.querySelector(`.resultadoT`);
      this.ctnE = document.querySelector(`.resultadoE`);
      this.ctnI = document.querySelector(`.resultadoI`);
   }

   mostrarPromedio(resultado, nombre) {
      let sumT = 0;
      let sumE = 0;
      let sumI = 0;

      resultado.forEach(r => {
         sumT += r.T;
         sumE += r.E;
         sumI += r.I;
      });   

      sumT = parseFloat((sumT / resultado.length).toFixed(3));
      sumE = parseFloat((sumE / resultado.length).toFixed(3));
      sumI = parseFloat((sumI / resultado.length).toFixed(3));

      this.ctnT.textContent = sumT;
      this.ctnE.textContent = sumE;
      this.ctnI.textContent = sumI;

      return { nombre, T: sumT, E: sumE, I: sumI };
   }
}