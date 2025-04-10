// Variables y constantes
const mes = "Abril";
let ingresos = [];
let gastos = [];

// Función para agregar ingresos
function agregarIngresos() {
  let cantidad = parseInt(
    prompt("¿Cuántas fuentes de ingreso deseas registrar?")
  );

  for (let i = 0; i < cantidad; i++) {
    let ingreso = parseFloat(
      prompt("Ingresa el monto del ingreso #" + (i + 1))
    );
    ingresos.push(ingreso);
  }

  console.log("Ingresos registrados:", ingresos);
}

// Función para agregar gastos
function agregarGastos() {
  let cantidad = parseInt(prompt("¿Cuántos gastos deseas registrar?"));

  for (let i = 0; i < cantidad; i++) {
    let gasto = parseFloat(prompt("Ingresa el monto del gasto #" + (i + 1)));
    gastos.push(gasto);
  }

  console.log("Gastos registrados:", gastos);
}

// Función para calcular el resultado
function calcularSaldo() {
  let totalIngresos = 0;
  let totalGastos = 0;

  for (let ingreso of ingresos) {
    totalIngresos += ingreso;
  }

  for (let gasto of gastos) {
    totalGastos += gasto;
  }

  let saldo = totalIngresos - totalGastos;

  console.log("Total de ingresos:", totalIngresos);
  console.log("Total de gastos:", totalGastos);
  console.log("Saldo final:", saldo);

  if (saldo > 0) {
    alert("¡Buen trabajo! Tienes un saldo positivo de $" + saldo.toFixed(2));
  } else if (saldo < 0) {
    alert("¡Cuidado! Tienes un saldo negativo de $" + saldo.toFixed(2));
  } else {
    alert("Has terminado el mes sin saldo restante.");
  }
}

// Simulación
alert("Bienvenido/a al simulador de presupuesto para el mes de " + mes);
agregarIngresos();
agregarGastos();
calcularSaldo();
