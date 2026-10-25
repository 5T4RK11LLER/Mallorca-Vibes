const TIPOS_TOAST = ["danger", "success", "warning"];

function mostrarAviso(mensaje, tipo = "danger") {
  // Solo se aceptan los tipos permitidos; cualquier otro valor cae en "danger"
  if (!TIPOS_TOAST.includes(tipo)) tipo = "danger";

  const toastEl = document.getElementById("toastAviso");
  const toastBody = document.getElementById("toastAvisoBody");
  if (!toastEl || !toastBody) return; // si la página no tiene el toast, no falla

  toastEl.classList.remove("text-bg-danger", "text-bg-success", "text-bg-warning");
  toastEl.classList.add(`text-bg-${tipo}`);

  toastBody.textContent = mensaje;

  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
  toast.show();
}