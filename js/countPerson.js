const inputPersonas = document.getElementById("numPersonas");
const btnMas = document.getElementById("btnMas");
const btnMenos = document.getElementById("btnMenos");

const min = 1;
const max = 10;

function leerPersonas() {
  const valor = parseInt(inputPersonas.value, 10);
  return Number.isNaN(valor) ? min : valor;
}

btnMas.addEventListener("click", () => {
  const valor = leerPersonas();
  if (valor < max) {
    inputPersonas.value = valor + 1;
  }
});

btnMenos.addEventListener("click", () => {
  const valor = leerPersonas();
  if (valor > min) {
    inputPersonas.value = valor - 1;
  }
});