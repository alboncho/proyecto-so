// INTERFAZ BASE
export class Algoritmo {
   // Contrato que todos los algoritmos deben cumplir
   calcular(procesos) {
      throw new Error('Implementa calcular()');
   }
}