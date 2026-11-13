/* Cover rendering. Shows real artwork when `coverImage` is set,
   otherwise a clean typographic placeholder. */
(function () {
  const T = window.TCM;

  T.coverHTML = function (book) {
    if (book.coverImage) {
      return `<div class="book-cover has-image theme-${book.theme}"><img src="${T.esc(book.coverImage)}" alt="Cover of ${T.esc(book.title)}" loading="lazy"><span class="bc-gloss"></span></div>`;
    }
    const lines = book.titleLines
      .map((l, i) => `<span class="${i === book.accentLine ? "accent" : ""}">${T.esc(l)}</span>`)
      .join("");
    return `<div class="book-cover theme-${book.theme}" role="img" aria-label="Placeholder cover for ${T.esc(book.title)}">
      <span class="bc-spine"></span><span class="bc-gloss"></span>
      <div class="bc-inner">
        <div class="bc-top"><span>THE CURIOUS MIND</span><span>${T.esc(book.index)}</span></div>
        <div class="bc-mark"><i></i></div>
        <div class="bc-title">${lines}</div>
        <div class="bc-foot"><span>THE CURIOUS MIND</span></div>
      </div>
    </div>`;
  };
})();
