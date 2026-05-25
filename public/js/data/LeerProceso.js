// SOLO LEER EL ARCHIVO
export class LeerProceso {
   async read(url = '../../datos.txt') {
      const respuesta = await fetch(url);
      const lector = respuesta.body.getReader();
      const decodificador = new TextDecoder();

      let acumulador = '';
      let lineas;
      let {value: chunk, done} = await lector.read();

      while (!done) {
         acumulador += decodificador.decode(chunk, { stream: true });
         lineas = acumulador.split('\n');
         acumulador = lineas.pop();

         ({ value: chunk, done } = await lector.read());
      }

      if (acumulador) lineas.push(acumulador);

      return this.parsearProcesos(lineas);

   }

   parsearProcesos(lineas) {
      return lineas.map((p, index) => (
         { 
            id: index, 
            ti: parseInt(p.split(' ')[0]), 
            t: parseInt(p.split(' ')[1]), 
            prioridad: parseInt(p.split(' ')[2])
         }
      ));
   }
}