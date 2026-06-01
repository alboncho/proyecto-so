export class LeerPaginas {
   async leer(url = "/public/datos/cola-paginas.txt") {
      const respuesta = await fetch(url);
      const texto = await respuesta.text();
      const array_texto = texto.split(" ");

      return array_texto;
   }
}