export class ModalController {
   constructor(elemento) {
      this.el = elemento;
      this.el.addEventListener('click', () => this.ocultar());
   }

   mostrar() { 
      this.el.style.display = 'flex'; 
      this.el.style.justifyContent = 'center'; 
      this.el.style.alignItems = 'center'; 
   };

   ocultar() { this.el.style.display = 'none' };
}