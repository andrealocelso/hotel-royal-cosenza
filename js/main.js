/* =========================================================
   HOTEL ROYAL COSENZA — interazioni e animazioni
   Dati: hotelroyalcosenza.it
   ========================================================= */
const HOTEL = {
  phone: "+39 0984 412165",
  phoneHref: "tel:+390984412165",
  mobile: "+39 376 041 2155",
  whatsapp: "https://wa.me/393760412155",
  email: "direzione@hotelroyalsas.it",
  address: "Via delle Medaglie d'Oro, 87100 Cosenza",
  booking: "https://booking.slope.it/fa4448fa-8cdc-4372-9fef-4f1ab25cd155",
  quote: "https://booking.slope.it/fa4448fa-8cdc-4372-9fef-4f1ab25cd155/quote-request",
  tour: "https://my.matterport.com/show/?m=qAsuZwDXsB5",
};

const NAV = [
  ["index.html", "Home", "img/GCF_0015.jpg"],
  ["camere.html", "Camere & Suite", "img/Hotel-Royal-Camere-Matrimoniale-2.jpg"],
  ["index.html#ristorante", "Ristorante", "img/Hotel-Royal-Sala-Ristorante-1.jpg"],
  ["index.html#meeting", "Meeting", "img/Hotel-Royal-Sala-Convegni-2.jpg"],
  ["gallery.html", "Gallery", "img/Hotel-Royal-Hall-Bar-4-1.jpg"],
  ["dove-info.html", "Dove & Info", "img/Hotel-Royal-Hall-Bar-3-1.jpg"],
];

const ARROW = `<svg class="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 8h14M9 2l6 6-6 6"/></svg>`;
const page = document.body.dataset.page;
const hasGSAP = typeof window.gsap !== "undefined";
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const animate = hasGSAP && !reduce;
const store = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- Chrome: header, menu, footer ---------- */
function renderChrome() {
  document.getElementById("site-header").innerHTML = `
    <header class="header"><div class="wrap">
      <a href="index.html" class="logo" aria-label="Hotel Royal Cosenza"><img src="img/logo_royal-white.png" alt="Hotel Royal Cosenza ****"></a>
      <div class="header-right">
        <a class="tel link-u" href="${HOTEL.phoneHref}">${HOTEL.phone}</a>
        <a class="btn btn-gold magnetic" href="${HOTEL.booking}" target="_blank" rel="noopener">Prenota ${ARROW}</a>
        <button class="menu-btn" aria-expanded="false" aria-controls="menu"><span class="menu-txt">Menu</span><span class="bars"><i></i><i></i></span></button>
      </div>
    </div></header>
    <nav class="menu" id="menu" aria-label="Menu principale">
      <div class="menu-links">${NAV.map(([h, l, img]) => `<a href="${h}" data-img="${img}"><span>${l}</span></a>`).join("")}</div>
      <div class="menu-media">${NAV.map(([, l, img], i) => `<img src="${img}" alt="" loading="lazy"${i === 0 ? ' class="on"' : ""}>`).join("")}</div>
      <div class="menu-foot">
        <span>${HOTEL.address}</span>
        <a href="${HOTEL.phoneHref}">${HOTEL.phone}</a>
        <a href="mailto:${HOTEL.email}">${HOTEL.email}</a>
        <a href="${HOTEL.tour}" target="_blank" rel="noopener">Virtual Tour 3D ↗</a>
      </div>
    </nav>`;

  document.getElementById("site-footer").innerHTML = `
    <section class="cta-final">
      <div class="bg" data-parallax="0.2" style="background-image:url(img/Hotel-Royal-Hall-Bar-5.jpg)"></div>
      <div class="wrap">
        <span class="label">Viaggio a Cosenza?</span>
        <h2 class="display h-lg" data-split>La migliore tariffa <span class="it gold">è sempre qui</span></h2>
        <p data-fade>Controlla subito le disponibilità in base alle date del tuo viaggio: sul nostro sito troverai sempre la migliore tariffa disponibile.</p>
        <span class="magnetic"><a class="btn btn-gold" href="${HOTEL.booking}" target="_blank" rel="noopener">Verifica disponibilità ${ARROW}</a></span>
      </div>
    </section>
    <footer class="footer"><div class="wrap">
      <div class="cols">
        <div>
          <img class="flogo" src="img/logo_royal-white.png" alt="Hotel Royal Cosenza">
          <p>Hotel 4 stelle nel cuore di Cosenza, a pochi passi da Corso Mazzini, dal MAB e dal Duomo.</p>
        </div>
        <div><h4>Contatti</h4><ul>
          <li>${HOTEL.address}</li>
          <li><a class="link-u" href="${HOTEL.phoneHref}">Tel. ${HOTEL.phone}</a></li>
          <li><a class="link-u" href="${HOTEL.whatsapp}" target="_blank" rel="noopener">WhatsApp ${HOTEL.mobile}</a></li>
          <li><a class="link-u" href="mailto:${HOTEL.email}">${HOTEL.email}</a></li>
        </ul></div>
        <div><h4>Esplora</h4><ul>${NAV.map(([h, l]) => `<li><a class="link-u" href="${h}">${l}</a></li>`).join("")}</ul></div>
        <div><h4>Prenota</h4><ul>
          <li><a class="link-u" href="${HOTEL.booking}" target="_blank" rel="noopener">Verifica disponibilità</a></li>
          <li><a class="link-u" href="${HOTEL.quote}" target="_blank" rel="noopener">Richiedi preventivo</a></li>
          <li><a class="link-u" href="${HOTEL.tour}" target="_blank" rel="noopener">Virtual Tour 3D</a></li>
        </ul></div>
      </div>
      <div class="giant" data-chars-footer>Royal</div>
      <div class="legal">
        <span>© ${new Date().getFullYear()} Hotel Royal Cosenza – P.IVA 01612120780</span>
        <span>Codice regionale: 078045-ALB-00004 · CIN: IT078045A1EGHN33YP</span>
      </div>
    </div></footer>
    <a class="wa" href="${HOTEL.whatsapp}" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">
      <svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>
    </a>
    <div class="cursor"><span>Vedi</span></div><div class="cursor-dot"></div>
    <div class="curtain" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>`;
}

/* ---------- Text splitting ---------- */
function splitWords(el) {
  // wraps each word (keeping inline elements like <span class="it">) in a mask
  const walk = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
          const outer = document.createElement("span");
          outer.className = "split-line";
          outer.style.display = "inline-block";
          outer.innerHTML = `<span>${part}</span>`;
          frag.appendChild(outer);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
    });
  };
  walk(el);
  return el.querySelectorAll(".split-line > span");
}
function splitChars(el) {
  const text = el.textContent;
  el.setAttribute("aria-label", text);
  el.innerHTML = [...text].map(c => `<span class="char" aria-hidden="true">${c === " " ? "&nbsp;" : c}</span>`).join("");
  return el.querySelectorAll(".char");
}
function splitScrubWords(el) {
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="word">${w}</span>`).join(" ");
  return el.querySelectorAll(".word");
}

/* ---------- Smooth scroll ---------- */
let lenis = null;
function initLenis() {
  if (!animate || typeof window.Lenis === "undefined") return;
  lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -60 }); }
  }));
}

/* ---------- Header behaviour ---------- */
function initHeader() {
  const header = document.querySelector(".header");
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 60);
    header.classList.toggle("hide", y > last && y > 400 && !document.body.classList.contains("menu-open"));
    last = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Fullscreen menu ---------- */
function initMenu() {
  const btn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  const links = menu.querySelectorAll(".menu-links a");
  const imgs = menu.querySelectorAll(".menu-media img");
  const txt = btn.querySelector(".menu-txt");
  let open = false, tl = null;

  if (hasGSAP) {
    tl = gsap.timeline({ paused: true })
      .set(menu, { visibility: "visible" })
      .to(menu, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "expo.inOut" })
      .from(links, { yPercent: 110, opacity: 0, duration: 1, stagger: .06, ease: "expo.out" }, "-=.45")
      .from(".menu-foot > *", { y: 20, opacity: 0, stagger: .05, duration: .6 }, "-=.7");
  }
  const toggle = state => {
    open = state ?? !open;
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open);
    txt.textContent = open ? "Chiudi" : "Menu";
    if (tl) open ? tl.timeScale(1).play() : tl.timeScale(1.6).reverse();
    else { menu.style.visibility = open ? "visible" : "hidden"; menu.style.clipPath = open ? "inset(0)" : ""; }
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  btn.addEventListener("click", () => toggle());
  document.addEventListener("keydown", e => { if (e.key === "Escape" && open) toggle(false); });
  links.forEach((a, i) => {
    a.addEventListener("mouseenter", () => imgs.forEach((im, j) => im.classList.toggle("on", i === j)));
    a.addEventListener("click", () => { if (a.getAttribute("href").startsWith(location.pathname.split("/").pop() + "#") || (page === "home" && a.getAttribute("href").startsWith("index.html#"))) toggle(false); });
  });
}

/* ---------- Cursor + magnetic ---------- */
function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const c = document.querySelector(".cursor"), d = document.querySelector(".cursor-dot");
  const label = c.querySelector("span");
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  window.addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; });
  const loop = () => {
    cx += (x - cx) * .16; cy += (y - cy) * .16;
    c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener("mouseover", e => {
    const v = e.target.closest("[data-cursor]");
    const l = e.target.closest("a, button, input, select, textarea, label");
    c.classList.toggle("is-view", !!v);
    c.classList.toggle("is-link", !v && !!l);
    if (v) label.textContent = v.dataset.cursor;
  });
  document.querySelectorAll(".magnetic").forEach(m => {
    m.addEventListener("mousemove", e => {
      const r = m.getBoundingClientRect();
      const mx = (e.clientX - r.left - r.width / 2) * .3, my = (e.clientY - r.top - r.height / 2) * .4;
      m.style.transform = `translate(${mx}px, ${my}px)`;
    });
    m.addEventListener("mouseleave", () => { m.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)"; m.style.transform = ""; setTimeout(() => (m.style.transition = ""), 600); });
  });
}

/* ---------- Preloader & page transitions ---------- */
function intro() {
  return new Promise(resolve => {
    const curtain = document.querySelector(".curtain");
    const bars = curtain.querySelectorAll("i");
    const first = page === "home" && !store.get("royal-visited");
    if (!animate) { document.querySelector(".preloader")?.remove(); return resolve(); }
    if (first) {
      store.set("royal-visited", "1");
      const pl = document.querySelector(".preloader");
      const count = pl.querySelector(".pl-count");
      const obj = { v: 0 };
      gsap.timeline({ onComplete: () => { pl.remove(); } })
        .to(pl.querySelector("img"), { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "expo.inOut" })
        .to(pl.querySelector(".pl-bar i"), { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
        .to(obj, { v: 100, duration: 1.8, ease: "power2.inOut", onUpdate: () => (count.textContent = String(Math.round(obj.v)).padStart(3, "0")) }, 0)
        .to(pl.querySelector(".pl-inner"), { y: -40, opacity: 0, duration: .6, ease: "power3.in" })
        .to(pl, { yPercent: -100, duration: 1.1, ease: "expo.inOut", onStart: () => setTimeout(resolve, 350) });
    } else {
      document.querySelector(".preloader")?.remove();
      gsap.set(bars, { scaleY: 1, transformOrigin: "top" });
      gsap.to(bars, { scaleY: 0, duration: .9, stagger: .06, ease: "expo.inOut", delay: .05 });
      setTimeout(resolve, 350);
    }
  });
}
function initTransitions() {
  if (!animate) return;
  const bars = document.querySelectorAll(".curtain i");
  document.addEventListener("click", e => {
    const a = e.target.closest("a");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:/.test(href)) return;
    const [path, hash] = href.split("#");
    const current = location.pathname.split("/").pop() || "index.html";
    if (hash && path === current) return;
    e.preventDefault();
    gsap.set(bars, { transformOrigin: "bottom" });
    gsap.to(bars, { scaleY: 1, duration: .7, stagger: .05, ease: "expo.inOut", onComplete: () => (location.href = href) });
  });
  window.addEventListener("pageshow", e => { if (e.persisted) gsap.set(bars, { scaleY: 0 }); });
}

/* ---------- Generic scroll animations ---------- */
function initScrollFx() {
  if (!animate) return;
  document.querySelectorAll("[data-split]").forEach(el => {
    const words = splitWords(el);
    gsap.from(words, { yPercent: 115, rotate: 4, duration: 1.3, stagger: .05, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  document.querySelectorAll("[data-fade]").forEach(el => {
    gsap.from(el, { y: 50, opacity: 0, duration: 1.3, ease: "expo.out", delay: +el.dataset.fade || 0, scrollTrigger: { trigger: el, start: "top 90%" } });
  });
  document.querySelectorAll("[data-stagger]").forEach(el => {
    gsap.from(el.children, { y: 60, opacity: 0, duration: 1.2, stagger: .08, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
  });
  document.querySelectorAll("[data-reveal]").forEach(el => {
    const img = el.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
    tl.from(el, { clipPath: "inset(100% 0 0 0)", duration: 1.6, ease: "expo.inOut" });
    if (img) tl.from(img, { scale: 1.4, duration: 2, ease: "expo.out" }, 0.2);
  });
  document.querySelectorAll("[data-parallax]").forEach(el => {
    const amt = +el.dataset.parallax || .15;
    const target = el.tagName === "IMG" || el.classList.contains("bg") ? el : el.querySelector("img") || el;
    gsap.fromTo(target, { yPercent: -amt * 50 }, { yPercent: amt * 50, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });
  document.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, obj = { v: 0 };
    const suffix = el.dataset.suffix || "";
    ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () =>
      gsap.to(obj, { v: end, duration: 2.2, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(obj.v) + suffix) }) });
  });
  document.querySelectorAll("[data-scrub-words]").forEach(el => {
    const words = splitScrubWords(el);
    gsap.to(words, { opacity: 1, stagger: .1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
  });
  const giant = document.querySelector("[data-chars-footer]");
  if (giant) {
    const chars = splitChars(giant);
    gsap.from(chars, { yPercent: 100, opacity: 0, duration: 1.4, stagger: .07, ease: "expo.out", scrollTrigger: { trigger: giant, start: "top 95%" } });
  }
}

/* ---------- Home ---------- */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-media .slide");
  const prog = document.querySelector(".hero-progress");
  if (!slides.length) return;
  let i = 0, timer;
  slides.forEach((_, n) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Immagine ${n + 1}`);
    b.innerHTML = "<i></i>";
    b.onclick = () => { go(n); restart(); };
    prog.appendChild(b);
  });
  const go = n => {
    slides[i].classList.remove("on"); prog.children[i].classList.remove("on");
    i = (n + slides.length) % slides.length;
    void prog.children[i].offsetWidth;
    slides[i].classList.add("on"); prog.children[i].classList.add("on");
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); };
  go(0); restart();
}
function heroIntro() {
  if (!animate) return;
  const h1 = document.querySelector(".hero h1");
  const lines = h1.querySelectorAll(".hl");
  const chars = [...lines].flatMap(l => [...splitChars(l)]);
  gsap.timeline()
    .from(".hero-media", { scale: 1.25, duration: 2.4, ease: "expo.out" })
    .from(chars, { yPercent: 120, rotate: 8, duration: 1.4, stagger: .045, ease: "expo.out" }, .1)
    .from(".hero-top > *", { y: 30, opacity: 0, stagger: .08, duration: 1, ease: "expo.out" }, .5)
    .from(".hero-sub > *", { y: 40, opacity: 0, stagger: .1, duration: 1.2, ease: "expo.out" }, .7)
    .from(".hero .booking", { y: 60, opacity: 0, duration: 1.3, ease: "expo.out" }, .9)
    .from(".header .wrap", { yPercent: -100, duration: 1.2, ease: "expo.out" }, .6)
    .from(".hero-scroll, .hero-progress", { opacity: 0, duration: 1 }, 1.2);
}
function heroScroll() {
  if (!animate) return;
  gsap.to(".hero-media", { scale: 1.12, yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-content", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "80% top", scrub: true } });
}
function initRoomsScroller() {
  if (!animate) return;
  const mm = gsap.matchMedia();
  mm.add("(min-width: 861px)", () => {
    const track = document.querySelector(".rooms-track");
    const bar = document.querySelector(".rooms-bar i");
    const counter = document.querySelector(".rooms-head .counter b");
    const cards = track.querySelectorAll(".room");
    const dist = () => track.scrollWidth - innerWidth;
    const tween = gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: {
        trigger: ".rooms", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: s => { bar.style.transform = `scaleX(${s.progress})`; counter.textContent = String(Math.min(cards.length, 1 + Math.floor(s.progress * cards.length))).padStart(2, "0"); },
      },
    });
    cards.forEach(card => {
      gsap.from(card.querySelector("img"), { scale: 1.3, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
    });
  });
}
function initTour() {
  if (!animate) return;
  gsap.timeline({ scrollTrigger: { trigger: ".tour", start: "top top", end: "+=120%", pin: true, scrub: 1 } })
    .to(".tour-media", { clipPath: "circle(75% at 50% 50%)", ease: "power2.inOut" })
    .from(".tour-media img", { scale: 1.5, ease: "power2.inOut" }, 0)
    .from(".tour-content > *", { y: 80, opacity: 0, stagger: .1, ease: "power2.out" }, .3);
}
function initTilt() {
  document.querySelectorAll(".offer-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateY(${(px - .5) * 14}deg) rotateX(${(.5 - py) * 14}deg)`;
      card.style.setProperty("--mx", px * 100 + "%"); card.style.setProperty("--my", py * 100 + "%");
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}
function initBooking() {
  document.querySelectorAll(".booking-form").forEach(form => {
    const inEl = form.querySelector("[name=checkin]"), outEl = form.querySelector("[name=checkout]");
    const iso = d => d.toISOString().slice(0, 10);
    inEl.min = inEl.value = iso(new Date());
    outEl.min = outEl.value = iso(new Date(Date.now() + 864e5));
    inEl.addEventListener("change", () => {
      const next = iso(new Date(new Date(inEl.value).getTime() + 864e5));
      outEl.min = next; if (outEl.value <= inEl.value) outEl.value = next;
    });
    form.addEventListener("submit", e => { e.preventDefault(); window.open(HOTEL.booking, "_blank", "noopener"); });
  });
}

/* ---------- Rooms page ---------- */
function initStack() {
  const cards = document.querySelectorAll(".stack-card");
  cards.forEach(card => {
    const imgs = card.querySelectorAll(".sc-media img");
    const dots = card.querySelector(".sc-dots");
    let i = 0;
    imgs.forEach((_, n) => { const b = document.createElement("button"); b.setAttribute("aria-label", `Foto ${n + 1}`); b.onclick = () => go(n); dots.appendChild(b); });
    const go = n => {
      imgs[i].classList.remove("on"); dots.children[i].classList.remove("on");
      i = (n + imgs.length) % imgs.length;
      imgs[i].classList.add("on"); dots.children[i].classList.add("on");
    };
    card.querySelector(".sc-prev").onclick = () => go(i - 1);
    card.querySelector(".sc-next").onclick = () => go(i + 1);
    go(0);
  });
  if (!animate) return;
  gsap.matchMedia().add("(min-width: 961px)", () => {
    cards.forEach((card, n) => {
      if (n === cards.length - 1) return;
      gsap.to(card, { scale: .9, opacity: .35, filter: "blur(2px)", ease: "none",
        scrollTrigger: { trigger: cards[n + 1], start: "top bottom", end: "top 90px", scrub: true } });
    });
  });
}

/* ---------- Gallery page ---------- */
function initGallery() {
  const bar = document.querySelector(".filters");
  if (!bar) return;
  const items = [...document.querySelectorAll(".g-item")];
  bar.querySelectorAll("button").forEach(b => {
    const cat = b.dataset.filter;
    b.insertAdjacentHTML("beforeend", `<sup>${cat === "all" ? items.length : items.filter(i => i.dataset.cat === cat).length}</sup>`);
  });
  bar.addEventListener("click", e => {
    const btn = e.target.closest("button"); if (!btn) return;
    bar.querySelectorAll("button").forEach(b => b.classList.toggle("active", b === btn));
    const cat = btn.dataset.filter;
    const state = hasGSAP && window.Flip ? Flip.getState(items) : null;
    items.forEach(it => it.classList.toggle("hidden", cat !== "all" && it.dataset.cat !== cat));
    if (state && animate) {
      Flip.from(state, { duration: .9, ease: "expo.inOut", stagger: .02, absolute: true,
        onEnter: els => gsap.fromTo(els, { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .8 }),
        onLeave: els => gsap.to(els, { opacity: 0, scale: .85, duration: .5 }),
        onComplete: () => ScrollTrigger.refresh() });
    }
  });
  if (animate) {
    ScrollTrigger.batch(items, { start: "top 92%", onEnter: b => gsap.from(b, { y: 80, opacity: 0, duration: 1.2, stagger: .08, ease: "expo.out" }), once: true });
  }
}
function initLightbox() {
  const all = [...document.querySelectorAll("[data-lb]")];
  if (!all.length) return;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.innerHTML = `<div class="lb-top"><span class="lb-count"></span><button class="lb-close">Chiudi <i>×</i></button></div>
    <div class="lb-stage"><button class="lb-nav lb-prev" aria-label="Precedente">←</button><img alt=""><button class="lb-nav lb-next" aria-label="Successiva">→</button></div>
    <div class="lb-thumbs"></div>`;
  document.body.appendChild(lb);
  const big = lb.querySelector(".lb-stage img"), count = lb.querySelector(".lb-count"), thumbs = lb.querySelector(".lb-thumbs");
  let list = [], idx = 0;
  const show = (n, dir = 1) => {
    idx = (n + list.length) % list.length;
    const src = list[idx].currentSrc || list[idx].src;
    if (animate) gsap.fromTo(big, { x: 60 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: .7, ease: "expo.out" });
    big.src = src; big.alt = list[idx].alt;
    count.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
    [...thumbs.children].forEach((t, j) => t.classList.toggle("on", j === idx));
    thumbs.children[idx]?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };
  const open = img => {
    const g = img.dataset.lb;
    list = all.filter(x => x.dataset.lb === g && !x.closest(".hidden"));
    thumbs.innerHTML = "";
    list.forEach((x, j) => { const t = new Image(); t.src = x.src; t.alt = ""; t.onclick = () => show(j, j > idx ? 1 : -1); thumbs.appendChild(t); });
    lb.classList.add("open"); lenis?.stop();
    show(list.indexOf(img), 0);
  };
  const close = () => { lb.classList.remove("open"); lenis?.start(); };
  all.forEach(img => img.addEventListener("click", () => open(img)));
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = () => show(idx - 1, -1);
  lb.querySelector(".lb-next").onclick = () => show(idx + 1, 1);
  lb.querySelector(".lb-stage").addEventListener("click", e => { if (e.target.classList.contains("lb-stage")) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1, -1);
    if (e.key === "ArrowRight") show(idx + 1, 1);
  });
  let sx = 0;
  lb.addEventListener("touchstart", e => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); });
}

/* ---------- Contact page ---------- */
function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const body = [`Nome: ${f.nome} ${f.cognome}`, `Email: ${f.email}`, `Telefono: ${f.telefono || "-"}`, `Arrivo: ${f.arrivo || "-"}  -  Partenza: ${f.partenza || "-"}`, "", f.richieste || ""].join("\n");
    location.href = `mailto:${HOTEL.email}?subject=${encodeURIComponent(`Richiesta non impegnativa - ${f.nome} ${f.cognome}`)}&body=${encodeURIComponent(body)}`;
  });
}

/* ---------- Boot ---------- */
renderChrome();
if (hasGSAP) gsap.registerPlugin(...[window.ScrollTrigger, window.Flip].filter(Boolean));
initLenis();
initHeader();
initMenu();
initCursor();
initTransitions();
initBooking();
initTilt();
initLightbox();

if (page === "home") { initHeroSlider(); heroScroll(); initRoomsScroller(); initTour(); }
if (page === "camere") initStack();
if (page === "gallery") initGallery();
if (page === "dove-info") initContact();

// page-hero intro for inner pages
function pageHeroIntro() {
  if (!animate || page === "home") return;
  const h1 = document.querySelector(".page-hero h1");
  if (!h1) return;
  const words = splitWords(h1);
  gsap.timeline()
    .from(".page-hero .bg img", { scale: 1.3, duration: 2.2, ease: "expo.out" })
    .from(words, { yPercent: 115, duration: 1.3, stagger: .06, ease: "expo.out" }, .1)
    .from(".page-hero .label, .page-hero p", { y: 30, opacity: 0, duration: 1, stagger: .1, ease: "expo.out" }, .4);
}

// prepare hidden states before the curtain lifts, then play intros
if (animate) {
  initScrollFx();
  intro().then(() => { page === "home" ? heroIntro() : pageHeroIntro(); ScrollTrigger.refresh(); });
  window.addEventListener("load", () => ScrollTrigger.refresh());
} else {
  intro();
}
