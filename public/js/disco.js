import { LeerPeticiones } from "./data/LeerPeticiones.js";

const leer = new LeerPeticiones();
const datos = await leer.leer();

document.querySelector("#cola-peticiones").value = datos.join(",");

document.querySelector(".btnCorrer").addEvenetListener("click", (e) => {
   
});