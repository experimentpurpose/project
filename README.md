# Pulsegrid — Modern Tech Startup Landing Page

A small, multi-page website built as a **learning project** for understanding
how a real (if simple) front-end project is organized: separate files for
HTML, CSS, JavaScript, images, and other assets, instead of one giant file.

> Pulsegrid itself is a fictional startup invented for this project — there's
> no real product behind it. The goal here is the *file structure and code*,
> not the brand.

## How to view it

No build tools or server needed. Just open `index.html` in any web browser.
Internet access is needed once, to load the Google Fonts used in the design
(see `assets/fonts/README.md` if you want to remove that dependency).

## Folder structure

```
project/
│
├── index.html          → Homepage: hero, features, stats, CTA
├── about.html           → Company story, values, team
├── contact.html          → Contact form + contact details
│
├── css/
│   ├── style.css        → Variables, resets, layout, shared sections
│   ├── navbar.css        → Navigation bar + mobile menu only
│   └── animations.css     → All @keyframes + scroll-reveal classes
│
├── js/
│   ├── main.js           → Scroll reveal, animated stat counters, footer year
│   ├── navbar.js          → Mobile menu, sticky navbar, active link highlight
│   └── contact.js          → Form validation + simulated submission
│
├── images/
│   ├── hero.jpg           → Placeholder hero/background image
│   ├── dashboard.jpg       → Placeholder product screenshot
│   ├── team.jpg            → Placeholder team photo (reused per member)
│   └── logo.png             → Simple generated logo mark
│
└── assets/
    ├── icons/             → Small SVG icons (social links, feature icons)
    └── fonts/              → Empty on purpose — see fonts/README.md
```

## Why the files are split up this way

**Three HTML pages, one shared design.** `index.html`, `about.html`, and
`contact.html` each only contain the content that's unique to that page.
The navbar and footer markup is repeated across all three (a deliberate,
simple approach for a static beginner project — in a larger app this would
usually come from a shared template or a JS framework component instead).

**CSS is split by responsibility, not by page.**
- `style.css` is the foundation: design tokens (colors, fonts, spacing as
  CSS variables), resets, and every section that isn't the navbar.
- `navbar.css` only ever touches the `.navbar` component. If you want to
  redesign the navigation bar, this is the only file you need to open.
- `animations.css` isolates every `@keyframes` rule and the scroll-reveal
  helper classes, so all motion in the site lives in one predictable place.

**JavaScript is split by feature, not by page either.**
- `main.js` — general site behavior used everywhere (scroll reveal,
  animated counters, footer year).
- `navbar.js` — everything about opening/closing the mobile menu and
  highlighting the active page link.
- `contact.js` — form validation and the simulated submit flow. It safely
  does nothing on pages that don't have a contact form.

**Images and icons are separated by type.** Large content photos live in
`images/`. Small, reusable interface icons (social links, feature icons)
live in `assets/icons/` as SVGs, since icons are a different kind of asset
than photography — they're usually styled with CSS (`fill`, `stroke`) and
reused in many places, while content images are not.

## Things to try while exploring

1. Open `css/navbar.css` and change `--color-accent` in `style.css` —
   notice it updates the active-link color, the buttons, the stat numbers,
   and the status dot all at once. That's the point of design tokens.
2. Resize your browser window below 820px wide and watch the navbar
   collapse into the mobile hamburger menu (`navbar.css` + `navbar.js`).
3. Open `contact.html`, submit the form empty, and read `js/contact.js`
   to see how each field's error message is produced.
4. Delete `css/animations.css` (or just unlink it from one HTML file) and
   reload the page — the scroll-reveal sections will appear instantly
   instead of fading in, since `.reveal` no longer has a transition.
5. Try adding a fourth page, e.g. `pricing.html`, copying the navbar/footer
   markup from an existing page and linking the same shared CSS/JS files.
