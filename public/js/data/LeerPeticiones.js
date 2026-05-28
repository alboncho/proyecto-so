export class LeerPeticiones {
   async leer(url = "../../datos/cola-peticion.txt") {
      const respuesta = await fetch(url);
      const texto = await respuesta.text();

      return texto.split(", ");
   }
}