/* Cart state + drawer. No payment logic: checkout stays disabled
   until a real, verified payment provider is integrated. */
(function () {
  const T = window.TCM;
  const KEY = "tcm-cart-v1";
  let items = [];

  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(saved)) items = saved.filter((id, i) => T.byId(id) && saved.indexOf(id) === i);
  } catch (e) { items = []; }

  const drawer = T.$("#cartDrawer");
  const scrim = T.$("#scrim");

  function persist() { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable */ } }

  function render() {
    T.$("#cartCount").textContent = items.length;
    T.$("#drawerCount").textContent = `(${items.length})`;
    const area = T.$("#cartItems");
    const bottom = T.$("#cartBottom");

    if (!items.length) {
      area.innerHTML = `<div class="cart-empty"><div class="empty-symbol">↗</div><h3>Your cart is waiting.</h3><p>Explore the collection and add a book that sparks your curiosity.</p><button class="btn btn-primary" type="button" id="continueShopping"><span>Explore books</span><i class="arrow">↗</i></button></div>`;
      bottom.hidden = true;
      T.$("#continueShopping").onclick = () => { api.close(); T.$("#books").scrollIntoView({ behavior: T.reducedMotion ? "auto" : "smooth" }); };
    } else {
      bottom.hidden = false;
      area.innerHTML = items.map((id) => {
        const b = T.byId(id);
        return `<div class="cart-item">
          <div class="cart-thumb">${T.coverHTML(b)}</div>
          <div class="cart-meta">
            <h4>${T.esc(b.title)}</h4>
            <p>Digital eBook · ${T.esc(T.priceText(b))}</p>
            <button class="remove-btn" type="button" data-remove="${b.id}">Remove</button>
          </div></div>`;
      }).join("");
      T.$$("[data-remove]", area).forEach((btn) => (btn.onclick = () => api.remove(btn.dataset.remove)));
    }
    document.dispatchEvent(new CustomEvent("tcm:cart", { detail: { items: items.slice() } }));
  }

  function bump() {
    const badge = T.$("#cartCount");
    badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
  }

  const api = (T.cart = {
    has: (id) => items.includes(id),
    add(id) { if (!T.byId(id)) return; if (!items.includes(id)) items.push(id); persist(); render(); bump(); },
    remove(id) { items = items.filter((x) => x !== id); persist(); render(); },
    open() { T.layers.open(drawer, { scrim, focus: "#closeCart" }); },
    close() { T.layers.close(drawer); },
    render
  });

  T.$("#openCart").addEventListener("click", api.open);
  T.$("#closeCart").addEventListener("click", api.close);
  scrim.addEventListener("click", () => T.layers.closeTop());
})();
