/* Visual polish: scroll reveal, header state, progress bar,
   cover tilt, card spotlight and hero parallax.
   Everything respects prefers-reduced-motion. */
(function () {
  const T = window.TCM;
  const fx = (T.fx = {});

  /* ---- Scroll reveal ---------------------------------------------------- */
  let io = null;
  if ("IntersectionObserver" in window && !T.reducedMotion) {
    io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
  }
  fx.observe = function (root = document) {
    T.$$(".reveal:not(.in)", root).forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  };

  /* ---- Tilt (covers) + spotlight (cards) ---------------------------------- */
  fx.bindTilt = function (root = document) {
    if (!T.canHover || T.reducedMotion) return;
    T.$$(".tilt", root).forEach((el) => {
      if (el._tilt) return;
      el._tilt = true;
      const host = el.closest(".card-cover, .stage-book, .sheet-stage") || el;
      host.addEventListener("pointermove", (e) => {
        const r = host.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", (x * 14).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-y * 12).toFixed(2) + "deg");
      });
      host.addEventListener("pointerleave", () => { el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg"); });
    });
  };

  fx.bindSpotlight = function (root = document) {
    if (!T.canHover || T.reducedMotion) return;
    T.$$(".book-card", root).forEach((card) => {
      if (card._spot) return;
      card._spot = true;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  };

  /* ---- Header + progress -------------------------------------------------- */
  const header = T.$("#header");
  const progress = T.$("#progress");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Hero parallax ------------------------------------------------------- */
  const stage = T.$("#heroStage");
  if (stage && T.canHover && !T.reducedMotion) {
    const hero = stage.closest(".hero");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      stage.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      stage.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener("pointerleave", () => { stage.style.setProperty("--px", 0); stage.style.setProperty("--py", 0); });
  }
})();
