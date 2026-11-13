/* App start-up: render, wire navigation, open deep links. */
(function () {
  const T = window.TCM;

  T.catalogUI.renderCounts();
  T.catalogUI.renderHero();
  T.catalogUI.renderGrid();
  T.catalogUI.applyFilters();
  T.cart.render();
  T.catalogUI.syncAddButtons();

  T.fx.observe();
  T.fx.bindTilt();
  T.fx.bindSpotlight();

  /* Search icon in header: jump to the collection and focus the field */
  T.$("#searchJump").addEventListener("click", () => {
    T.$("#books").scrollIntoView({ behavior: T.reducedMotion ? "auto" : "smooth" });
    window.setTimeout(() => T.$("#searchInput").focus({ preventScroll: true }), T.reducedMotion ? 0 : 450);
  });

  /* Mobile navigation */
  const nav = T.$("#nav");
  const menuBtn = T.$("#menuBtn");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("menu-open", open);
  }
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  T.$$("#nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

  /* Open a book directly from the URL, e.g. index.html#book/brain */
  T.detail.initFromHash();
})();
