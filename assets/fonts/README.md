# assets/fonts/

Yeh folder **self-hosted font files** (jaise .woff2, .ttf) rakhne ke liye hai. Agar aap chahte ho ki aapka project bina internet (offline) ke bhi sahi fonts dikhaye, toh aap files ko yahan save kar sakte ho.

## Yeh folder abhi khali kyun hai?

Kyunki abhi hum apne fonts (Space Grotesk, Inter, aur JetBrains Mono) directly Google Fonts se load kar rahe hain. Har HTML file ke `<head>` tag mein humne yeh `<link>` add kiya hua hai:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

Beginners ke liye yeh sabse simple tareeqa hai typography use karne ka, bina kisi extra file ko manage kiye!

## Local fonts kaise use karein? (Ek chhota sa exercise for Khushi)

Agar aapko try karna hai ki offline fonts kaise kaam karte hain, toh yeh steps follow karo:

1. Jo font chahiye uski `.woff2` file Google Fonts se download karo.
2. Us file ko is folder mein rakh do (jaise `assets/fonts/Inter-Regular.woff2`).
3. Apni `css/style.css` file mein `@font-face` ka rule add karo, kuch is tarah:

```css
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

4. Aakhir mein, Google Fonts wale `<link>` tags ko apni HTML files se hata do.

Yeh ek bohot achi exercise hai yeh samajhne ke liye ki browsers fonts kaise load karte hain! 😊
