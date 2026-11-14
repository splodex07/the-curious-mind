/* Performance-conscious visual polish.
   Scroll reveal remains; pointer effects are throttled to animation frames. */
(function () {
  const T = window.TCM;
  const fx = (T.fx = {});

  /* Scroll reveal: observe once, then unobserve revealed elements. */
  let io = null;
  if ("IntersectionObserver" in window && !T.reducedMotion) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px 4% 0px" });
  }

  fx.observe = function (root = document) {
    T.$$(".reveal:not(.in)", root).forEach((el) => {
      if (io) io.observe(el);
      else el.classList.add("in");
    });
  };

  /* Cover tilt: cache element bounds and update at most once per frame. */
  fx.bindTilt = function (root = document) {
    if (!T.canHover || T.reducedMotion) return;

    T.$$(".tilt", root).forEach((el) => {
      if (el._tiltBound) return;
      el._tiltBound = true;

      const host = el.closest(".card-cover, .stage-book, .sheet-stage") || el;
      let bounds = null;
      let frame = 0;
      let latestX = 0;
      let latestY = 0;

      host.addEventListener("pointerenter", () => {
        bounds = host.getBoundingClientRect();
      }, { passive: true });

      host.addEventListener("pointermove", (event) => {
        if (!bounds || frame) return;
        latestX = event.clientX;
        latestY = event.clientY;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const x = (latestX - bounds.left) / Math.max(bounds.width, 1) - 0.5;
          const y = (latestY - bounds.top) / Math.max(bounds.height, 1) - 0.5;
          el.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
          el.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
        });
      }, { passive: true });

      host.addEventListener("pointerleave", () => {
        bounds = null;
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      }, { passive: true });
    });
  };

  /* Scroll work is coalesced into one animation frame. */
  const header = T.$("#header");
  const progress = T.$("#progress");
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || window.pageYOffset;
      header.classList.toggle("scrolled", y > 24);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      progress.style.transform = `scaleX(${ratio})`;
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    ticking = false;
    onScroll();
  }, { passive: true });
  onScroll();

  /* Spotlight and hero parallax were removed: they caused continuous
     pointer-driven style updates without adding essential functionality. */
})();
