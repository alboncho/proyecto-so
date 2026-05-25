// SOLO ORDENA Y PARSEAR:
export class ParsearProceso {
   parse(lineas) {
      return this._ordenar(lineas);
   }

   _ordenar(datos) {
      return this.reordenarId(
         datos.sort((a, b) => a.ti - b.ti)
      );
   }

   reordenarId(datos) {
      return datos.map((d, index) => (
         { id: index, ti: d.ti, t: d.t, prioridad: d.prioridad }
      ));
   }
}