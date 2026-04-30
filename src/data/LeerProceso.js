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

      return lineas;
   }
}