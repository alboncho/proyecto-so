let tabla_algoritmo = document.querySelectorAll(".tabla-algoritmo");
let index = 0;

tabla_algoritmo.forEach(tabla => {
   for (i=index; i<index+50; i++) {
      let tr = document.createElement('tr');
      for (let j=0; j<7; j++) {
         let td = document.createElement('td');
         let numero_random = Math.random() * 15;
         let tr_contenido = [Math.floor(numero_random), Math.floor(numero_random / 2), Math.floor(numero_random / 1.5)];
         if (j == 0) {
            td.textContent = i + 1;
         } else {
            td.textContent = tr_contenido[j-1];
         }
         tr.appendChild(td)
      }
      tabla.appendChild(tr);
   }
   index = i;
}) 

