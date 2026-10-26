// Consentimiento para el mapa de Google.
// El mapa NO se carga hasta que la persona pulsa "Cargar mapa".
// La decisión se recuerda en el navegador (localStorage) y se puede retirar desde aviso-legal.html#cookies
(function () {
  "use strict";

  var KEY = "mv_map_consent";
  var MAP_PREFIX = "https://www.google.com/maps/embed";

  var TEXTS = {
    es: {
      title: "Mapa de Google",
      body: "Para mostrar el mapa se cargan servicios de Google, que pueden instalar cookies y recibir tu dirección IP. Solo se cargará si lo aceptas.",
      load: "Cargar mapa",
      info: "Más información sobre cookies",
      mapTitle: "Mapa de ubicación de Mallorca Vibes"
    },
    en: {
      title: "Google Map",
      body: "To show the map, Google services are loaded, which may set cookies and receive your IP address. It will only load if you accept.",
      load: "Load map",
      info: "More information about cookies",
      mapTitle: "Location map of Mallorca Vibes"
    }
  };

  function currentLang() {
    var l = (document.documentElement.lang || "es").slice(0, 2);
    return TEXTS[l] ? l : "es";
  }

  function readConsent() {
    try { return localStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }

  function saveConsent() {
    try { localStorage.setItem(KEY, "1"); } catch (e) { /* sin almacenamiento: vale solo para esta visita */ }
  }

  function policyUrl() {
    var inSubfolder = window.location.pathname.indexOf("/html/") !== -1;
    return (inSubfolder ? "" : "html/") + "aviso-legal.html#cookies";
  }

  // ---------- Mapa ----------
  var slot = document.getElementById("map-slot");
  var placeholder = null;

  function loadMap() {
    var src = slot.getAttribute("data-map-src") || "";
    if (src.indexOf(MAP_PREFIX) !== 0) return; // solo se admite el mapa de Google

    var iframe = document.createElement("iframe");
    iframe.id = "map-frame";
    iframe.src = src;
    iframe.width = "100%";
    iframe.height = "400";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");
    iframe.title = TEXTS[currentLang()].mapTitle;

    slot.textContent = "";
    slot.appendChild(iframe);
    placeholder = null;
  }

  function renderPlaceholder() {
    var t = TEXTS[currentLang()];

    if (!placeholder) {
      placeholder = document.createElement("div");
      placeholder.className = "map-consent";

      var h = document.createElement("h3");
      h.setAttribute("data-part", "title");
      var p = document.createElement("p");
      p.setAttribute("data-part", "body");

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-primary";
      btn.setAttribute("data-part", "load");
      btn.addEventListener("click", function () {
        saveConsent();
        loadMap();
      });

      var a = document.createElement("a");
      a.setAttribute("data-part", "info");
      a.href = policyUrl();

      placeholder.appendChild(h);
      placeholder.appendChild(p);
      placeholder.appendChild(btn);
      placeholder.appendChild(a);

      slot.textContent = "";
      slot.appendChild(placeholder);
    }

    placeholder.querySelector('[data-part="title"]').textContent = t.title;
    placeholder.querySelector('[data-part="body"]').textContent = t.body;
    placeholder.querySelector('[data-part="load"]').textContent = t.load;
    placeholder.querySelector('[data-part="info"]').textContent = t.info;
  }

  if (slot) {
    if (readConsent()) {
      loadMap();
    } else {
      renderPlaceholder();
    }

    // Si cambia el idioma de la página, se actualiza el texto del aviso
    new MutationObserver(function () {
      if (placeholder) renderPlaceholder();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  // ---------- Retirar el consentimiento (botón en aviso-legal.html) ----------
  var btnRetirar = document.getElementById("btnRetirarMapa");
  if (btnRetirar) {
    btnRetirar.addEventListener("click", function () {
      var msg = document.getElementById("msgRetirar");
      var ok = true;
      try { localStorage.removeItem(KEY); } catch (e) { ok = false; }
      if (msg) {
        msg.textContent = ok
          ? "Consentimiento retirado. El mapa dejará de cargarse automáticamente."
          : "No se pudo acceder al almacenamiento del navegador. Puedes borrar los datos del sitio desde los ajustes de tu navegador.";
      }
    });
  }
})();