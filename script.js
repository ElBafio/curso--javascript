// Utils
const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

// Simular operaciones asincrónicas con Promises
function guardarEnStorage(clave, datos) {
  return new Promise((resolve) => {
    localStorage.setItem(clave, JSON.stringify(datos));
    resolve();
  });
}

function obtenerDeStorage(clave) {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem(clave)) || [];
    resolve(data);
  });
}

// Estado
let ingresos = [];
let gastos = [];

// Referencias DOM
const ingresoInput = document.getElementById("ingreso-monto");
const gastoInput = document.getElementById("gasto-monto");
const listaIngresos = document.getElementById("lista-ingresos");
const listaGastos = document.getElementById("lista-gastos");
const resultadoDiv = document.getElementById("resultado");

// Renderizar listas
function renderizarLista(lista, contenedor) {
  contenedor.innerHTML = "";
  lista.forEach((monto) => {
    const li = document.createElement("li");
    li.textContent = formatter.format(monto);
    contenedor.appendChild(li);
  });
}

function renderizarTodo() {
  renderizarLista(ingresos, listaIngresos);
  renderizarLista(gastos, listaGastos);
}

// Agregar monto a una lista
async function agregarMonto(tipo, valor) {
  const val = parseFloat(valor);
  if (isNaN(val) || val <= 0) {
    alert("Por favor ingresa un número válido y mayor a 0.");
    return;
  }

  if (tipo === "ingreso") {
    ingresos.push(val);
    await guardarEnStorage("ingresos", ingresos);
  } else {
    gastos.push(val);
    await guardarEnStorage("gastos", gastos);
  }

  renderizarTodo();
}

// Eventos de ingreso y gasto
document.getElementById("btn-agregar-ingreso").addEventListener("click", () => {
  agregarMonto("ingreso", ingresoInput.value);
  ingresoInput.value = "";
});

document.getElementById("btn-agregar-gasto").addEventListener("click", () => {
  agregarMonto("gasto", gastoInput.value);
  gastoInput.value = "";
});

// Calcular saldo
document.getElementById("btn-calcular").addEventListener("click", () => {
  const totalIngresos = ingresos.reduce((acc, val) => acc + val, 0);
  const totalGastos = gastos.reduce((acc, val) => acc + val, 0);
  const saldo = totalIngresos - totalGastos;

  resultadoDiv.textContent =
    `Ingresos: ${formatter.format(totalIngresos)} | ` +
    `Gastos: ${formatter.format(totalGastos)} | ` +
    `Saldo: ${formatter.format(saldo)}`;
  resultadoDiv.className = saldo >= 0 ? "positivo" : "negativo";

  if (saldo > 0) {
    alert(`¡Buen trabajo! Tienes saldo positivo de ${formatter.format(saldo)}`);
  } else if (saldo < 0) {
    alert(`¡Cuidado! Tienes saldo negativo de ${formatter.format(saldo)}`);
  } else {
    alert("Has terminado el mes sin saldo restante.");
  }

  if (gastos.some((g) => g > totalIngresos)) {
    console.warn("Existe un gasto mayor que el total de ingresos.");
  }

  const ingresoMayor = Math.max(...ingresos);
  if (ingresoMayor) {
    console.log(`Ingreso mayor registrado: ${formatter.format(ingresoMayor)}`);
  }
});

// Inicializar app
async function init() {
  ingresos = await obtenerDeStorage("ingresos");
  gastos = await obtenerDeStorage("gastos");
  renderizarTodo();
}

init();

document.getElementById("btn-reiniciar").addEventListener("click", async () => {
  if (confirm("¿Seguro que deseas reiniciar todos los datos?")) {
    ingresos = [];
    gastos = [];
    await guardarEnStorage("ingresos", ingresos);
    await guardarEnStorage("gastos", gastos);
    renderizarTodo();
    resultadoDiv.textContent = "";
    resultadoDiv.className = "";
    alert("Todos los datos han sido reiniciados.");
  }
});
