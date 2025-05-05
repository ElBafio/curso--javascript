// Inicialización desde localStorage
let ingresos = JSON.parse(localStorage.getItem("ingresos")) || [];
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Referencias DOM
const ingresoInput = document.getElementById("ingreso-monto");
const gastoInput = document.getElementById("gasto-monto");
const listaIngresos = document.getElementById("lista-ingresos");
const listaGastos = document.getElementById("lista-gastos");
const resultadoDiv = document.getElementById("resultado");

// Renderizar listas
function renderizar() {
  listaIngresos.innerHTML = "";
  listaGastos.innerHTML = "";

  ingresos
    .map((i) => i.toFixed(2))
    .forEach((formato) => {
      const li = document.createElement("li");
      li.textContent = `$${formato}`;
      listaIngresos.appendChild(li);
    });

  gastos
    .map((g) => g.toFixed(2))
    .forEach((formato) => {
      const li = document.createElement("li");
      li.textContent = `$${formato}`;
      listaGastos.appendChild(li);
    });
}

// Guardar en localStorage
function guardar() {
  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Agregar ingreso

document.getElementById("btn-agregar-ingreso").addEventListener("click", () => {
  const val = parseFloat(ingresoInput.value);
  if (!isNaN(val) && val > 0) {
    ingresos.push(val);
    guardar();
    renderizar();
  }
  ingresoInput.value = "";
});

// Agregar gasto

document.getElementById("btn-agregar-gasto").addEventListener("click", () => {
  const val = parseFloat(gastoInput.value);
  if (!isNaN(val) && val > 0) {
    gastos.push(val);
    guardar();
    renderizar();
  }
  gastoInput.value = "";
});

// Calcular saldo

document.getElementById("btn-calcular").addEventListener("click", () => {
  const validIngresos = ingresos.filter((i) => i > 0);
  const validGastos = gastos.filter((g) => g > 0);

  const totalIngresos = validIngresos.reduce((acc, cur) => acc + cur, 0);
  const totalGastos = validGastos.reduce((acc, cur) => acc + cur, 0);
  const saldo = totalIngresos - totalGastos;

  const hayGastoGrande = gastos.some((g) => g > totalIngresos);
  const ingresoMayor = ingresos.find((i) => i === Math.max(...ingresos));

  resultadoDiv.textContent =
    `Ingresos: $${totalIngresos.toFixed(2)} | ` +
    `Gastos: $${totalGastos.toFixed(2)} | ` +
    `Saldo: $${saldo.toFixed(2)}`;
  resultadoDiv.className = saldo >= 0 ? "positivo" : "negativo";

  if (saldo > 0)
    alert(`¡Buen trabajo! Tienes saldo positivo de $${saldo.toFixed(2)}`);
  else if (saldo < 0)
    alert(`¡Cuidado! Tienes saldo negativo de $${saldo.toFixed(2)}`);
  else alert("Has terminado el mes sin saldo restante.");

  if (hayGastoGrande)
    console.warn("Existe un gasto mayor que el total de ingresos.");
  if (ingresoMayor) console.log(`Ingreso mayor registrado: $${ingresoMayor}`);
});

// Primera renderización
renderizar();
