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

   if (acumulador) {
      lineas.push(acumulador);
   }

   let index = 0;
   let tablaUno = Math.ceil(lineas.length/2);
   let tabalDos = Math.floor(lineas.length/2);
   let tablaNumero = tablaUno;

   lineas = ordenar(lineas);
   datos = [...lineas];

   tabla_algoritmo.forEach(function(tabla) {
      for (let i=index; i<(index+tablaNumero); i++) {
         let tr = document.createElement('tr');
         let datos_proceso = lineas.shift();
         for (let j=0; j<8; j++) {
            let td = document.createElement('td');
            if (j == 0) {
               td.textContent = (i+1);
            } else {
               td.textContent = datos_proceso.split(' ')[j-1];
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
   SRN: false
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
   algoritmo.SRN = false;

   algoritmo[e.target.textContent] = true;
   textoAlgoritmo = e.target.textContent;
}

function ordenar(datos) {
   for (let i=0; i<datos.length-1; i++) {
      for (let j=i+1; j<datos.length; j++) {
         if (parseInt(datos[i].split(' ')[0]) > parseInt(datos[j].split(' ')[0])) {
            let aux = datos[i];
            datos[i] = datos[j];
            datos[j] = aux;
         }
      }
   }

   return datos;
}

function agregarFCFS(resultado) {
   tabla_algoritmo.forEach(function(tabla) {
      let filas = tabla.children;

      [...filas].forEach((fila) => {
         if (fila.children.length > 1) {
            let columnas = fila.children;
            let TEI = 0;

            contenido = resultado.shift();
            
            [...columnas].forEach((columna) => {
               if (columna.textContent === "") {
                  columna.textContent = contenido.split(' ')[TEI];
                  TEI++;
               } 
            });
         }
      });
   });
}

function ordenarPorTiempoEjecucion(tmp) {
   for (let i=0; i<tmp.length-1; i++) {
      for (let j=i+1; j<tmp.length; j++) {
         if (parseInt(tmp[i].split(' ')[1]) > parseInt(tmp[j].split(' ')[1])) {
            let aux = tmp[i];
            tmp[i] = tmp[j];
            tmp[j] = aux;
         }
      }
   }
}

function agregarSJN(resultado) {
   tabla_algoritmo.forEach(function(tabla) {
      let filas = tabla.children;

      [...filas].forEach((fila) => {
         if (fila.children.length > 1) {
            let columnas = fila.children;
            let TEI = 0;

            contenido = resultado.shift();
            
            [...columnas].forEach((columna) => {
               if (columna.textContent === "") {
                  columna.textContent = contenido.split(' ')[TEI];
                  TEI++;
               } 
            });
         }
      });
   });
}

let resultadoT = document.querySelector('.resultadoT');
let resultadoE = document.querySelector('.resultadoE');
let resultadoI = document.querySelector('.resultadoI');

function mostrarPromedio(t, e, i) {
   resultadoT.textContent = (t / datos.length).toFixed(2);
   resultadoE.textContent = (e / datos.length).toFixed(2);
   resultadoI.textContent = (i / datos.length).toFixed(2);
}

function calcularAlgoritmo(textoAlgoritmo) {
   limpiar();

   switch (textoAlgoritmo) {
      case 'FCFS': {
         let datos_copia = [...datos];
         let resultado = [];
         let sumT = 0, sumE = 0, sumI = 0;

         let tiempo = 0;
         let proceso = datos_copia.shift();

         while (true) {
            if (parseInt(proceso.split(' ')[0]) <= tiempo) {
               tiempo += parseInt(proceso.split(' ')[1]);

               let T = tiempo - parseInt(proceso.split(' ')[0]);
               let E = T - parseInt(proceso.split(' ')[1]);
               let I = (parseInt(proceso.split(' ')[1]) / T).toFixed(2);
               
               resultado.push(`${tiempo} ${T} ${E} ${I}`);

               sumT += T;
               sumE += E;
               sumI += parseInt(I);

               if (datos_copia.length == 0) {
                  break;
               } 

               proceso = datos_copia.shift();
            } else {
               tiempo++;
            }
         }

         mostrarPromedio(sumT, sumE, sumI);
         agregarFCFS(resultado);
         break;
      }
      case 'SJN': {
         let datos_copia = [...datos];
         let datos_ordenados = [];

         while (true) {
            let proceso_ant = datos_copia.shift();
            let tmp = [];
            tmp.push(proceso_ant);

            let index = 0;

            while (true) {
               if (datos_copia.length != 0 && datos_copia[index].split(' ')[0] === proceso_ant.split(' ')[0]) {
                  tmp.push(datos_copia.shift());
                  index = 0;
               } else {
                  break;
               }
               index++;
            }

            ordenarPorTiempoEjecucion(tmp);
            datos_ordenados.push(...tmp);

            if (datos_copia.length === 0) {
               break;
            }
         }

         let resultado = [];
         let tiempo = 0;
         let sumT = 0, sumE = 0, sumI = 0;

         let proceso = datos_ordenados.shift();

         while (true) {
            if (proceso.split(' ')[0] <= tiempo) {
               tiempo += parseInt(proceso.split(' ')[1]);

               let T = tiempo - parseInt(proceso.split(' ')[0]);
               let E = T - parseInt(proceso.split(' ')[1]);
               let I = (parseInt(proceso.split(' ')[1]) / T).toFixed(2);

               resultado.push(`${tiempo} ${T} ${E} ${I}`);

               sumT += T;
               sumE += E;
               sumI += parseInt(I);

               if (datos_ordenados.length == 0) break;

               proceso = datos_ordenados.shift();
            } else {
               tiempo++;
            }
         }

         mostrarPromedio(sumT, sumE, sumI);
         agregarSJN(resultado);
         break;
      }
      default:
         break;
   }
}

function limpiar() {
   tabla_algoritmo.forEach((tabla) => {
      let filas = [...tabla.children];
      
      filas.forEach((fila) => {
         let index = 0;
         if (fila.children.length > 1) {
            let columnas = [...fila.children];

            columnas.forEach((columna) => {
               if (index >= 4) {
                  columna.textContent = "";
               }
               index++;
            })
         } 
      })
   });

   resultadoT.textContent = "...";
   resultadoE.textContent = "...";
   resultadoI.textContent = "...";
}

let algoritmos = document.querySelectorAll('.algoritmo');
let btnCorrer = document.querySelector('.btnCorrer');
let btnLimpiar = document.querySelector('.btnLimpiar');
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
});

btnLimpiar.addEventListener('click', limpiar);
