let tabla_algoritmo = document.querySelectorAll(".tabla-algoritmo");
async function leerLineaPorLinea() {
   const respuesta = await fetch('datos.txt');
   const lector = respuesta.body.getReader();
   const decodificador = new TextDecoder();

   let { value: chunk, done: doneReading } = await lector.read();

   let lineas;
   let acumulador = "";

   while (!doneReading) {
      acumulador += decodificador.decode(chunk, { stream: true });
      
      lineas = acumulador.split('\n');
      acumulador = lineas.pop();

      ({ value: chunk, done: doneReading } = await lector.read());
   }

   let index = 0;
   let tablaUno = Math.ceil(lineas.length/2);
   let tabalDos = Math.floor(lineas.length/2);
   let tablaNumero = tablaUno;

   tabla_algoritmo.forEach(function(tabla) {
      for (let i=index; i<(index+tablaNumero); i++) {
         let tr = document.createElement('tr');
         let datos = lineas.shift();
         for (let j=0; j<7; j++) {
            let td = document.createElement('td');
            if (j == 0) {
               td.textContent = (i+1);
            } else {
               td.textContent = datos.split(' ')[j-1];
            }
            tr.appendChild(td);
         }
         tabla.appendChild(tr);
      }
      index = tablaUno;
      tablaNumero = tabalDos;
   });
}


leerLineaPorLinea();


function cambiarActive(e) {
   algoritmos.forEach(function(algoritmo) {
      algoritmo.classList.remove('active');
   })
   e.currentTarget.classList.toggle('active');
}

let algoritmos = document.querySelectorAll('.algoritmo');

algoritmos.forEach(algoritmo => {
    algoritmo.addEventListener('click', cambiarActive);
});

let btnCorrer = document.querySelector('btnCorrer');

btnCorrer.addEventListener('click', function(e) {
   
})