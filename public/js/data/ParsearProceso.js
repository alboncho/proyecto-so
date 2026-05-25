// SOLO ORDENA Y PARSEAR:
export class ParsearProceso {
   parse(lineas) {
      return this._ordenar(lineas);
   }

   _ordenar(datos) {
      return [...datos].sort((a, b) => parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0])
      );
   }
}