# THE CURIOUS MIND — eBook Store (frontend)

A dark, premium, editorial-style bookstore frontend. Pure HTML, CSS and JavaScript:
no build step, no dependencies. Works with VS Code **Live Server** or by opening `index.html`.

## Project structure

```
the-curious-mind-store/
├── index.html            Page structure and static copy
├── css/
│   ├── tokens.css        Colours, fonts, spacing (edit the brand here)
│   ├── base.css          Reset, typography, buttons, focus, reveal helpers
│   ├── layout.css        Header, hero, marquee, sections, footer
│   ├── components.css    Covers, book cards, filters, cart drawer, detail sheet
│   └── responsive.css    Tablet / mobile rules
├── js/
│   ├── data.js           Book catalogue (single source of truth)
│   ├── utils.js          Helpers + overlay manager (focus trap, scroll lock, Escape)
│   ├── cover.js          Cover rendering (placeholder or real image)
│   ├── cart.js           Cart state + drawer (checkout disabled)
│   ├── catalog.js        Book grid, category filters, search
│   ├── detail.js         Book detail view (deep link: index.html#book/brain)
│   ├── effects.js        Scroll reveal, cover tilt, hero parallax, header state
│   └── main.js           Start-up and navigation
└── assets/covers/        Put final cover images here
```

## Features kept from phase 1

- Both books: *Your Body Is Hiding 100 Amazing Secrets* and *Your Brain Is Playing Tricks on You*, with their original text.
- Search and category filters (All / Science & body / Psychology) with live counts.
- Cart drawer: add, remove, count badge, empty state, "Explore books" button.
- Book detail view, header search shortcut, mobile menu, Escape to close.
- **Checkout stays disabled.** There is no payment code. Prices read "Price coming soon" / "To be announced".

## Small additions

- Cart is remembered between page loads (browser `localStorage`, key `tcm-cart-v1`). Remove the persistence lines in `js/cart.js` if you don't want this.
- Search also matches category and description text, not only the title.
- Book detail view can be opened by URL: `index.html#book/body` or `#book/brain`.
- Keyboard and screen-reader support: focus trap in overlays, focus restored on close, skip link, `prefers-reduced-motion` respected.

## Adding or changing a book

Edit `js/data.js`. Each entry controls its card, hero cover, detail view and cart row.

- **Real cover:** save the image in `assets/covers/` (2:3 ratio, e.g. 1600×2400) and set `coverImage: "assets/covers/your-book.jpg"`. Leave it `""` to show the placeholder.
- **Price:** set `price: "$9.99"` (any text) when ready. `null` shows the placeholder wording.
- **Category:** `filter` must match a `data-filter` button in `index.html`. Add a new button there for a new category.

## Before going live

- Replace the placeholder contact email (`hello@thecuriousmind.example`) and the `#` Privacy / Terms links in `index.html`.
- Final cover artwork and prices (above).
- Real payment: integrate a verified provider (e.g. a hosted checkout) and only then enable the checkout button in `js/cart.js` / `index.html`.
- Fonts (Fraunces + Inter) load from Google Fonts. Self-host them if you need offline use or stricter privacy.

## Store content updates (15 Nov 2026)
- Catalogue prices are configured in INR: Body eBook ₹99 and Brain eBook ₹199.
- Original cover artwork is used from `assets/covers/` across catalogue cards, hero, details and cart.
- Book descriptions have been expanded for the detail view and catalogue.
- Our Story has been expanded; FAQ, Contact, Privacy Policy and Terms & Conditions sections have been added.
- Contact email and Instagram are intentionally placeholders until the store owner supplies the official details.
- Checkout remains disabled until a verified payment provider and secure order-delivery flow are connected. Policy text is a draft and should be reviewed against the final services before paid launch.


## Collection update
- Added *The Art of Noticing* at ₹250, using the supplied PDF cover artwork.
- The collection initially shows two books; **More books** reveals additional titles, and **Show less** collapses them. Category filters and search reveal matching books directly.
