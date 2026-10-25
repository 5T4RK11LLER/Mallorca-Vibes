const numeroRestaurante = "34682168079"

const MAX_NOMBRE = 60;
const MIN_PERSONAS = 1;
const MAX_PERSONAS = 10;

// Quita saltos de línea, caracteres de control y espacios repetidos
function limpiarTexto(texto, max) {
  return texto
    .replace(/[\p{Cc}\p{Cf}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

// Comprueba formato dd/mm/aaaa, que exista de verdad y que no sea pasada
function fechaValida(texto) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return false;
  const [d, m, y] = texto.split("/").map(Number);
  const f = new Date(y, m - 1, d);
  if (f.getFullYear() !== y || f.getMonth() !== m - 1 || f.getDate() !== d) return false;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return f >= hoy;
}

const formReservacion = document.getElementById("formReservacion");

formReservacion.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = limpiarTexto(document.getElementById("inputName").value, MAX_NOMBRE);
  const fecha = document.getElementById("fecha").value.trim();
  const hora = document.getElementById("hora").value.trim();
  const personas = parseInt(document.getElementById("numPersonas").value, 10);

  if (
    !nombre ||
    !fechaValida(fecha) ||
    !TODOS_LOS_HORARIOS.includes(hora) ||
    !Number.isInteger(personas) ||
    personas < MIN_PERSONAS ||
    personas > MAX_PERSONAS
  ) {
    mostrarAviso("Por favor revisa los datos de la reserva.", "warning");
    return;
  }

  const mensaje =
    `Nueva reserva:\n` +
    `Nombre: ${nombre}\n` +
    `Fecha: ${fecha}\n` +
    `Hora: ${hora}\n` +
    `Personas: ${personas}`;

  const url = `https://wa.me/${numeroRestaurante}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});