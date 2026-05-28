export class MostrarEficiencia {
   mostrar(datos, nombre) {
      let nroFallos = datos.nroFallos;
      let nroPaginas = datos.nroPaginas;

      const ctn_nro_fallos = document.querySelector(".nroFallos");
      const ctn_nro_pag = document.querySelector(".nroPag");
      const ctn_frecuencia = document.querySelector(".frecuencia");
      const ctn_rendimiento = document.querySelector(".rendimiento");

      ctn_nro_fallos.textContent = nroFallos;
      ctn_nro_pag.textContent = nroPaginas;
      ctn_frecuencia.textContent = nroFallos / nroPaginas;
      ctn_rendimiento.textContent = (1 - parseFloat(ctn_frecuencia.textContent)).toFixed(2);

      let rendimiento = parseFloat(ctn_rendimiento.textContent) * 100;
      rendimiento = parseFloat(rendimiento.toFixed(2));

      return { rendimiento, nombre };
   }
}