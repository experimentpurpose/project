# assets/fonts/

This folder is for **self-hosted font files** (like .woff2, .ttf). You can save them here if you want your project to work offline without the internet.

## Why is this folder empty right now?

Because we are currently loading our fonts (Space Grotesk, Inter, and JetBrains Mono) directly from Google Fonts. We've added this `<link>` to the `<head>` tag in every HTML file:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

This is the simplest way for beginners to use typography without managing extra files!

## How to use local fonts? (A short exercise for Khushi)

If you want to try how offline fonts work, follow these steps:

1. Download the `.woff2` file of the font you want from Google Fonts.
2. Place that file in this folder (e.g., `assets/fonts/Inter-Regular.woff2`).
3. Add a `@font-face` rule in your `css/style.css` file, like this:

```css
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

4. Finally, remove the Google Fonts `<link>` tags from your HTML files.

This is a great exercise for understanding how browsers load fonts!
