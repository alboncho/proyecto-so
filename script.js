let tabla_algoritmo = document.querySelectorAll(".tablaProcesos");
let bxModal = document.querySelector(".bxModal");

bxModal.addEventListener('click', ocultar);

function ocultar(e) {
   e.currentTarget.style.display = 'none';
}

let datos;

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

   datos = [...lineas];

   tabla_algoritmo.forEach(function(tabla) {
      for (let i=index; i<(index+tablaNumero); i++) {
         let tr = document.createElement('tr');
         let datos = lineas.shift();
         for (let j=0; j<8; j++) {
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

const algoritmo = {
   FCFS: false,
   Prioridad: false,
   RR: false,
   SJN: false,
}

function mostrarModal(e) {
   bxModal.style.display = 'block';
   bxModal.style.display = 'flex';
   bxModal.style.justifyContent = 'center';
   bxModal.style.alignItems = 'center';
}

function cambiarActive(e) {
   algoritmos.forEach(function(algoritmo) {
      algoritmo.classList.remove('active');
   })
   e.currentTarget.classList.toggle('active');

   algoritmo.FCFS = false;
   algoritmo.Prioridad = false;
   algoritmo.RR = false;
   algoritmo.SJN = false;
   algoritmo[e.target.textContent] = !false;
   textoAlgoritmo = e.target.textContent;
}

function ordenar(datos) {
   for (let i=0; i<datos.length-1; i++) {
      for (let j=i+1; j<datos.length; j++) {
         if (datos[i].split(' ')[0] > datos[j].split(' ')[0]) {
            let aux = datos[i];
            datos[i] = datos[j];
            datos[j] = aux;
         }
      }
   }
}

function asignarPosicion(datos) {
   for (let i=0; i<datos.length; i++) {
      datos[i] += ` ${i+1}`;
   }
}

function traerContenido(posicion, TEI, resultado) {
   for (let i=0; i<resultado.length; i++) {

      if (resultado[i].split(' ')[0] == posicion) {
         if (TEI === 0) {
            return resultado[i].split(' ')[1];
         } else if (TEI === 1) {
            return resultado[i].split(' ')[2];
         } else if (TEI === 2) {
            return resultado[i].split(' ')[3];
         } else {
            return resultado[i].split(' ')[4];
         }
      }
   }
}

function agregarDatosATabla(resultado) {
   tabla_algoritmo.forEach(function(tabla) {
      let filas = tabla.children;
      let indice = 0;

      [...filas].forEach((fila) => {
         if (fila.children.length > 1) {
            let columnas = fila.children;
            let TEI = 0;

            [...columnas].forEach((columna) => {
               if (columna.textContent == "") {
                  columna.textContent = traerContenido(indice, TEI, resultado);
                  TEI++;
               } 
            });

         }
         indice++;
      });
   });
}

let resultado = [];

function calcularAlgoritmo(textoAlgoritmo) {
   switch (textoAlgoritmo) {
      case 'FCFS':
         asignarPosicion(datos);
         console.log(" asignar: ", datos);
         ordenar(datos);
         console.log(" ordenar: ", datos);

         let tiempo = 0;
         let proceso = datos.shift();

         while (true) {
            if (proceso.split(' ')[3] == 27) {
               console.log(proceso);
            }
            if (proceso.split(' ')[0] == tiempo || proceso.split(' ')[0] <= tiempo) {
               tiempo += parseInt(proceso.split(' ')[1]);

               let tiempo_inicial = parseInt(proceso.split(' ')[0]);
               let tiempo_ejecucion = parseInt(proceso.split(' ')[1]);
               let T = `${tiempo - tiempo_inicial}`;
               let E = `${(tiempo - tiempo_inicial) - tiempo_ejecucion}`;
               let I = ((tiempo_ejecucion) / T).toFixed(2);

               let posicion = proceso.split(' ')[3];
               
               resultado.push(`${posicion} ${tiempo} ${T} ${E} ${I}`);

               if (datos.length == 0) {
                  break;
               } 

               proceso = datos.shift();
            } else {
               tiempo++;
            }
         }
         agregarDatosATabla(resultado);
         break;
      default:
         break;
   }
}

let algoritmos = document.querySelectorAll('.algoritmo');
let btnCorrer = document.querySelector('.btnCorrer');
let textoAlgoritmo = '';
let verificarAlgoritmo = false;

algoritmos.forEach(algoritmo => {
    algoritmo.addEventListener('click', cambiarActive);
});


btnCorrer.addEventListener('click', function(e) {
   Object.values(algoritmo).some((valor) => {
      if (valor) {
         verificarAlgoritmo = true;
      }
   })

   if (verificarAlgoritmo) {
      calcularAlgoritmo(textoAlgoritmo);
   } else {
      mostrarModal();
   }
})