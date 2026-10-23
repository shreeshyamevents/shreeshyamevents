# Shree Shyam Events

Website for **Shree Shyam Events**, an event company in Harda, Madhya Pradesh.
Visitors browse rental items, build an enquiry list, and send it to the team on WhatsApp. The site works in English and Hindi.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Files

| Path | What it does |
| --- | --- |
| `index.html` | Page structure and text |
| `css/style.css` | Colours (top of the file), layout and styling |
| `js/config.js` | **WhatsApp and phone number**. Edit here |
| `js/app.js` | Items, themes, Hindi translations, enquiry list, WhatsApp message |
| `assets/` | Logos |

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publish with GitHub Pages

1. Push this folder to your repository's `main` branch.
2. In the repo, go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

To use your own domain, add it under **Settings > Pages > Custom domain**.

## Common edits

- **Change the phone number:** edit `js/config.js`.
- **Add or change rental items:** edit the `P` list in `js/app.js`. Each row is `[category, name, short description]`. Add the Hindi for each new name and description to the `HI` list in the same file.
- **Change the ready-made themes:** edit the `LK` list in `js/app.js`.
- **Change colours:** edit the variables at the top of `css/style.css`.
- **Add prices:** in `js/app.js`, find `Price on request` in `drawItems` and replace it with a price field.
- **Add photos:** put images in `assets/` and reference them from `index.html` or `css/style.css`.

## Brand

Colours come from the logo: cream `#FFFFCC` and plum `#4F1F55`.
Fonts: Cormorant Garamond and Mukta (Google Fonts).
