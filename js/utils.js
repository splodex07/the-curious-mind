/* Shared helpers: DOM shortcuts, escaping, price text, and a small
   "layer" manager (scroll lock, focus trap, Escape, focus restore)
   used by the cart drawer and the book-detail sheet. */
(function () {
  const T = window.TCM;

  T.$ = (s, r = document) => r.querySelector(s);
  T.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  T.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  T.byId = (id) => T.catalog.find((b) => b.id === id);
  T.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  T.canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* All catalogue prices are in Indian rupees. */
  T.priceText = (book, long) => (book.price == null ? (long ? "To be announced" : "Price coming soon") : `₹${Number(book.price).toLocaleString("en-IN")}`);

  /* ---- Layers ---------------------------------------------------------- */
  const stack = [];
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

  function lockScroll(on) {
    const root = document.documentElement;
    if (on) {
      const sb = window.innerWidth - root.clientWidth;
      root.style.setProperty("--sb", sb + "px");
      root.classList.add("is-locked");
    } else {
      root.classList.remove("is-locked");
      root.style.removeProperty("--sb");
    }
  }

  T.layers = {
    open(el, opts = {}) {
      if (stack.some((l) => l.el === el)) return;
      const layer = { el, opener: document.activeElement, scrim: opts.scrim || null, onClose: opts.onClose || null };
      stack.push(layer);
      el.classList.add("show");
      el.setAttribute("aria-hidden", "false");
      el.inert = false;
      if (layer.scrim) layer.scrim.classList.add("show");
      lockScroll(true);
      window.setTimeout(() => {
        const target = (opts.focus && T.$(opts.focus, el)) || T.$(FOCUSABLE, el) || el;
        target.focus({ preventScroll: true });
      }, 40);
    },
    close(el) {
      const i = stack.findIndex((l) => l.el === el);
      if (i === -1) return;
      const layer = stack.splice(i, 1)[0];
      el.classList.remove("show");
      el.setAttribute("aria-hidden", "true");
      el.inert = true;
      if (layer.scrim) layer.scrim.classList.remove("show");
      if (!stack.length) lockScroll(false);
      if (layer.opener && document.contains(layer.opener) && layer.opener.focus) layer.opener.focus({ preventScroll: true });
      if (layer.onClose) layer.onClose();
    },
    closeTop() { if (stack.length) this.close(stack[stack.length - 1].el); },
    isOpen(el) { return stack.some((l) => l.el === el); }
  };

  document.addEventListener("keydown", (e) => {
    if (!stack.length) return;
    const top = stack[stack.length - 1];
    if (e.key === "Escape") { T.layers.closeTop(); return; }
    if (e.key !== "Tab") return;
    const items = T.$$(FOCUSABLE, top.el).filter((n) => n.offsetParent !== null || n === document.activeElement);
    if (!items.length) { e.preventDefault(); return; }
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
