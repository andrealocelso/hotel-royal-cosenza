// Hotel Royal Cosenza — interazioni del sito (nessuna libreria esterna)
const HOTEL = {
  email: "direzione@hotelroyalsas.it",
  booking: "https://booking.slope.it/fa4448fa-8cdc-4372-9fef-4f1ab25cd155",
};

/* ---------- Menu mobile ---------- */
const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "Chiudi" : "Menu";
  });
}

/* ---------- Prenotazione: le date sono il titolo ---------- */
const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
const stay = document.getElementById("stay");
if (stay) {
  const inEl = stay.querySelector("[name=checkin]");
  const outEl = stay.querySelector("[name=checkout]");
  const inTxt = document.getElementById("checkin-text");
  const outTxt = document.getElementById("checkout-text");
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const parse = v => { const [y, m, d] = v.split("-").map(Number); return new Date(y, m - 1, d); };
  const addDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

  const render = () => {
    const a = parse(inEl.value), b = parse(outEl.value);
    // "dal 4 al 5 ottobre" se stesso mese, altrimenti "dal 30 ottobre al 2 novembre"
    const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    inTxt.textContent = sameMonth ? `${a.getDate()}` : `${a.getDate()} ${MESI[a.getMonth()]}`;
    outTxt.textContent = `${b.getDate()} ${MESI[b.getMonth()]}`;
  };

  const today = new Date();
  inEl.min = inEl.value = iso(today);
  outEl.min = outEl.value = iso(addDay(today));
  render();

  inEl.addEventListener("change", () => {
    if (!inEl.value) inEl.value = iso(today);
    const next = iso(addDay(parse(inEl.value)));
    outEl.min = next;
    if (outEl.value < next) outEl.value = next;
    render();
  });
  outEl.addEventListener("change", () => {
    if (!outEl.value || outEl.value <= inEl.value) outEl.value = iso(addDay(parse(inEl.value)));
    render();
  });
  // apre il calendario anche cliccando sul testo, dove il browser lo consente
  stay.querySelectorAll(".pick").forEach(p => p.addEventListener("click", () => {
    const input = p.querySelector("input");
    try { input.showPicker(); } catch { input.focus(); }
  }));
  stay.addEventListener("submit", e => {
    e.preventDefault();
    window.open(HOTEL.booking, "_blank", "noopener");
  });
}

/* ---------- Lightbox (gallery e camere) ---------- */
const lb = document.createElement("div");
lb.className = "lightbox";
lb.setAttribute("role", "dialog");
lb.setAttribute("aria-modal", "true");
lb.setAttribute("aria-label", "Foto ingrandita");
lb.innerHTML = `
  <div class="lb-bar"><span class="lb-count"></span><button type="button" class="lb-close">Chiudi</button></div>
  <div class="lb-stage">
    <button type="button" class="lb-nav lb-prev">Precedente</button>
    <img alt="">
    <button type="button" class="lb-nav lb-next">Successiva</button>
  </div>`;
let lbList = [], lbIdx = 0, lbReturn = null;
const lbImg = lb.querySelector("img"), lbCount = lb.querySelector(".lb-count");
const lbShow = n => {
  lbIdx = (n + lbList.length) % lbList.length;
  lbImg.src = lbList[lbIdx].src;
  lbImg.alt = lbList[lbIdx].alt;
  lbCount.textContent = `Foto ${lbIdx + 1} di ${lbList.length}`;
  lb.querySelectorAll(".lb-nav").forEach(b => (b.hidden = lbList.length < 2));
};
const lbOpen = (list, idx, from) => {
  if (!lb.isConnected) document.body.appendChild(lb);
  lbList = list; lbReturn = from;
  lbShow(idx);
  lb.classList.add("open");
  document.documentElement.style.overflow = "hidden";
  lb.querySelector(".lb-close").focus();
};
const lbClose = () => {
  lb.classList.remove("open");
  document.documentElement.style.overflow = "";
  lbReturn?.focus();
};
lb.querySelector(".lb-close").addEventListener("click", lbClose);
lb.querySelector(".lb-prev").addEventListener("click", () => lbShow(lbIdx - 1));
lb.querySelector(".lb-next").addEventListener("click", () => lbShow(lbIdx + 1));
lb.addEventListener("click", e => { if (e.target.classList.contains("lb-stage")) lbClose(); });
document.addEventListener("keydown", e => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") lbClose();
  if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
  if (e.key === "ArrowRight") lbShow(lbIdx + 1);
});
let touchX = 0;
lb.addEventListener("touchstart", e => (touchX = e.touches[0].clientX), { passive: true });
lb.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) lbShow(lbIdx + (dx < 0 ? 1 : -1));
});

/* ---------- Camere: foto principale + miniature ---------- */
document.querySelectorAll(".room").forEach(room => {
  const main = room.querySelector(".room-main");
  const mainImg = main.querySelector("img");
  const thumbs = [...room.querySelectorAll(".thumbs button")];
  const photos = thumbs.map(t => ({ src: t.dataset.src, alt: t.querySelector("img").alt }));
  let current = 0;
  thumbs.forEach((t, i) => t.addEventListener("click", () => {
    current = i;
    mainImg.src = photos[i].src;
    mainImg.alt = photos[i].alt;
    thumbs.forEach(b => b.setAttribute("aria-pressed", b === t));
  }));
  main.addEventListener("click", () => lbOpen(photos, current, main));
});

/* ---------- Gallery: filtri ---------- */
const filters = document.querySelector(".filters");
if (filters) {
  const figures = [...document.querySelectorAll(".photos figure")];
  filters.querySelectorAll("button").forEach(b => {
    const cat = b.dataset.filter;
    const n = cat === "all" ? figures.length : figures.filter(f => f.dataset.cat === cat).length;
    b.insertAdjacentHTML("beforeend", `<span>${n}</span>`);
    b.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
      figures.forEach(f => (f.hidden = cat !== "all" && f.dataset.cat !== cat));
    });
  });
  figures.forEach(f => {
    const btn = f.querySelector("button");
    btn.addEventListener("click", () => {
      const visible = figures.filter(x => !x.hidden).map(x => x.querySelector("img"));
      lbOpen(visible.map(i => ({ src: i.src, alt: i.alt })), visible.indexOf(btn.querySelector("img")), btn);
    });
  });
}

/* ---------- Modulo di richiesta ---------- */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const body = [
      `Nome: ${f.nome} ${f.cognome}`,
      `Email: ${f.email}`,
      `Telefono: ${f.telefono || "-"}`,
      `Arrivo: ${f.arrivo || "-"}`,
      `Partenza: ${f.partenza || "-"}`,
      "",
      f.richieste || "",
    ].join("\n");
    const subject = `Richiesta di preventivo - ${f.nome} ${f.cognome}`;
    location.href = `mailto:${HOTEL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
