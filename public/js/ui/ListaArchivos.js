export class ListaArcvhivos {
   constructor(_elemento, eventoEliminar) {
      this.elemento = _elemento;
      this.eventoEliminar = eventoEliminar;
   }

   agregarItem(nombre, bloques, id) {
      const item = document.createElement("div");
      item.classList.add("itemArchivo");
      item.setAttribute("data-id", id);

      let { itemHeader, itemBody } = this.crearDivs(nombre, bloques);

      item.append(itemHeader, itemBody);
      this.elemento.append(item);
   }


   crearDivs(nombre, bloques) {
      // -- HEADER --
      const itemHeader = document.createElement("div");
      itemHeader.classList.add("itemHeader");
      
      const span = document.createElement("span");
      const button = document.createElement("button");
      span.id = "nombre"
      span.textContent = "📄" + nombre;
      button.id = "btn-eliminar-archivo";
      button.textContent = "Eliminar";
      button.addEventListener("click", this.eventoEliminar);

      itemHeader.append(span, button);
      
      // -- BODY --
      const itemBody = document.createElement("div");
      itemBody.classList.add("itemBody");
      
      const spanBloques = document.createElement("span");
      spanBloques.id = "bloques-ocupados";
      spanBloques.textContent = "[" + bloques.join(",") + "]"

      itemBody.append("Bloques: ", spanBloques);

      return { itemHeader, itemBody };
   }  
}