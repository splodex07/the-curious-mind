/* Catalogue: renders the book grid + hero covers from TCM.catalog,
   and handles category filters and live search. */
(function () {
  const T = window.TCM;
  const pad = (n) => String(n).padStart(2, "0");
  const grid = T.$("#bookGrid");
  const state = { filter: "all", query: "" };

  function cardHTML(b, i) {
    return `<article class="book-card reveal" data-id="${b.id}" data-category="${b.filter}" style="--d:${(i * 0.1).toFixed(2)}s">
      <button class="card-cover" type="button" data-open="${b.id}" aria-label="View details: ${T.esc(b.title)}">
        <span class="card-glow theme-${b.theme}" aria-hidden="true"></span>
        <span class="tilt">${T.coverHTML(b)}</span>
        <span class="card-peek">View details <i>↗</i></span>
      </button>
      <div class="card-body">
        <div class="card-meta"><span>${T.esc(b.category)}</span><span class="idx">${T.esc(b.index)}</span></div>
        <h3>${T.esc(b.title)}</h3>
        <p>${T.esc(b.teaser)}</p>
        <div class="card-foot">
          <span class="price">${T.esc(T.priceText(b))}</span>
          <div class="card-actions">
            <button class="add-btn" type="button" data-add="${b.id}">Add to cart</button>
            <button class="arrow-btn" type="button" data-open="${b.id}" aria-label="View details: ${T.esc(b.title)}">↗</button>
          </div>
        </div>
      </div>
    </article>`;
  }

  function renderGrid() {
    grid.innerHTML = T.catalog.map(cardHTML).join("");
    T.fx && T.fx.observe(grid);
    syncAddButtons();
  }

  function renderHero() {
    const wrap = T.$("#heroBooks");
    const [first, second] = T.catalog;
    const one = (b, cls) => `<button class="stage-book ${cls}" type="button" data-open="${b.id}" aria-label="View details: ${T.esc(b.title)}"><span class="tilt">${T.coverHTML(b)}</span></button>`;
    wrap.innerHTML = (second ? one(second, "sb-back") : "") + (first ? one(first, "sb-front") : "");
    T.$("#stageNote").textContent = `THE COLLECTION · ${pad(T.catalog.length)} ${T.catalog.length === 1 ? "BOOK" : "BOOKS"}`;
  }

  function renderCounts() {
    T.$("#collectionCount").textContent = `${pad(T.catalog.length)} ${T.catalog.length === 1 ? "BOOK" : "BOOKS"}`;
    T.$$("[data-count]").forEach((el) => {
      const key = el.dataset.count;
      el.textContent = pad(key === "all" ? T.catalog.length : T.catalog.filter((b) => b.filter === key).length);
    });
  }

  function matches(b) {
    const okCat = state.filter === "all" || b.filter === state.filter;
    const q = state.query.trim().toLowerCase();
    const hay = [b.title, b.category, b.teaser, b.description].join(" ").toLowerCase();
    return okCat && (!q || hay.includes(q));
  }

  function applyFilters() {
    let shown = 0;
    T.$$(".book-card", grid).forEach((card) => {
      const ok = matches(T.byId(card.dataset.id));
      const wasHidden = card.hidden;
      card.hidden = !ok;
      if (ok) { shown++; if (wasHidden) { card.classList.remove("pop"); void card.offsetWidth; card.classList.add("pop"); } }
    });
    grid.classList.toggle("single", shown === 1);
    T.$("#noResults").hidden = shown !== 0;
    T.$("#resultLine").textContent = `Showing ${shown} of ${T.catalog.length} ${T.catalog.length === 1 ? "book" : "books"}`;
  }

  function syncAddButtons() {
    T.$$("[data-add]").forEach((btn) => {
      const inCart = T.cart && T.cart.has(btn.dataset.add);
      btn.classList.toggle("in-cart", !!inCart);
      btn.textContent = inCart ? "In your cart ✓" : "Add to cart";
    });
  }

  T.catalogUI = { renderGrid, renderHero, renderCounts, applyFilters, syncAddButtons };

  /* Filters + search */
  T.$$(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      T.$$(".filter").forEach((x) => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      state.filter = btn.dataset.filter || "all";
      applyFilters();
    })
  );
  T.$("#searchInput").addEventListener("input", (e) => { state.query = e.target.value; applyFilters(); });

  /* Delegated open / add handlers (grid + hero) */
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) { T.cart.add(add.dataset.add); T.cart.open(); return; }
    const open = e.target.closest("[data-open]");
    if (open) { T.detail.open(open.dataset.open); }
  });
  document.addEventListener("tcm:cart", syncAddButtons);
})();
