/* Book detail view (full sheet). Deep-linkable: index.html#book/brain */
(function () {
  const T = window.TCM;
  const wrap = T.$("#bookModal");
  const content = T.$("#modalContent");
  let current = null;
  let pushed = false;

  function html(b) {
    const others = T.catalog.filter((x) => x.id !== b.id);
    const placeholder = b.coverImage ? "" : `<p class="stage-caption">Placeholder cover. Final artwork will replace this.</p>`;
    return `
      <div class="sheet-grid">
        <div class="sheet-stage theme-${b.theme}">
          <span class="sheet-glow" aria-hidden="true"></span>
          <div class="sheet-cover tilt">${T.coverHTML(b)}</div>
          ${placeholder}
        </div>
        <div class="sheet-copy">
          <div class="crumbs"><span>THE COLLECTION</span><i>/</i><span>${T.esc(b.index)}</span></div>
          <div class="eyebrow"><i></i> ${T.esc(b.category)}</div>
          <h2 id="sheetTitle">${T.esc(b.title)}</h2>
          <p class="sheet-desc">${T.esc(b.description)}</p>
          <ul class="sheet-list">${b.bullets.map((x, i) => `<li><b>${String(i + 1).padStart(2, "0")}</b><span>${T.esc(x)}</span></li>`).join("")}</ul>
          <dl class="sheet-meta">
            <div><dt>Format</dt><dd>Digital eBook</dd></div>
            <div><dt>Author</dt><dd>The Curious Mind</dd></div>
            <div><dt>Price</dt><dd>${T.esc(T.priceText(b, true))}</dd></div>
          </dl>
          <div class="sheet-actions">
            <a class="btn btn-outline" href="${T.esc(b.pdfUrl)}" target="_blank" rel="noopener">Read book <i class="arrow">↗</i></a>
            <button class="btn btn-primary" type="button" id="addBook"><span>Add to cart</span><i class="arrow">↗</i></button>
            <button class="link-arrow" type="button" id="backToList">Back to collection <i>→</i></button>
          </div>
          ${others.length ? `<div class="also"><span>ALSO IN THE COLLECTION</span>${others.map((o) => `<button type="button" class="also-item" data-switch="${o.id}"><em>${T.esc(o.index)}</em><strong>${T.esc(o.title)}</strong><i>↗</i></button>`).join("")}</div>` : ""}
        </div>
      </div>`;
  }

  function wire(b) {
    const add = T.$("#addBook");
    add.onclick = () => {
      T.cart.add(b.id);
      api.close(true);
      T.cart.open();
    };
    T.$("#backToList").onclick = () => { api.close(); };
    T.$$("[data-switch]", content).forEach((btn) => (btn.onclick = () => api.open(btn.dataset.switch, { swap: true })));
    if (T.fx) T.fx.bindTilt(content);
  }

  const api = (T.detail = {
    open(id, opts = {}) {
      const b = T.byId(id);
      if (!b) return;
      current = id;
      content.innerHTML = html(b);
      wire(b);
      T.$(".sheet", wrap).scrollTop = 0;
      if (!T.layers.isOpen(wrap)) T.layers.open(wrap, { focus: ".sheet-x", onClose: () => { current = null; pushed = false; clearHash(); } });
      if (location.hash !== "#book/" + id) {
        if (opts.swap || pushed) history.replaceState(null, "", "#book/" + id);
        else { history.pushState(null, "", "#book/" + id); pushed = true; }
      }
    },
    close(direct) {
      if (!T.layers.isOpen(wrap)) return;
      if (!direct && pushed && location.hash.startsWith("#book/")) { pushed = false; history.back(); }
      else { pushed = false; T.layers.close(wrap); }
    }
  });

  function clearHash() {
    if (location.hash.startsWith("#book/")) history.replaceState(null, "", location.pathname + location.search);
  }

  T.$("#closeModal").addEventListener("click", () => api.close());
  wrap.addEventListener("click", (e) => { if (e.target === wrap) api.close(); });

  /* Back button / pasted deep link */
  function fromHash() {
    const m = location.hash.match(/^#book\/([\w-]+)$/);
    if (m && T.byId(m[1])) { if (current !== m[1]) api.open(m[1]); }
    else if (T.layers.isOpen(wrap)) { T.layers.close(wrap); }
  }
  window.addEventListener("popstate", fromHash);
  T.detail.initFromHash = fromHash;
})();
