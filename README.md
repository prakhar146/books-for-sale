# Books for Sale — simple website

A single-page website that lists used books with photos. Visitors browse and tap
**DM on Instagram** to enquire. No prices are shown — price is shared over chat.

Everything the site needs lives in the **`site/`** folder.

---

## The only file you'll normally edit: `site/books.js`

Each book is one line:

```js
{ title: "Gone Girl", note: "Gillian Flynn", sold: false, img: "book-025.jpg" },
```

- **title** — the book name shown on the card.
- **note** — the small grey line (usually the author). Use `""` for none.
- **sold** — `false` = available, `true` = shows a "SOLD" badge and disables the button.
- **img** — the photo filename in `site/images/`. Don't change unless you rename a photo.

### To mark a book SOLD
Change `sold: false` to `sold: true` on that book's line, then deploy (see below).
To put it back on sale, change it back to `false`. Nothing is ever deleted.

---

## Set the Instagram handle

Open `site/app.js`, find the line near the top:

```js
const INSTAGRAM_USERNAME = "your_handle_here"; // <-- CHANGE THIS
```

Replace with your Instagram handle — just the username, no `@` and no URL.
Example: `prakhar.reads`.

Note: Instagram links can't pre-fill a DM message. So when a buyer taps the button,
the site copies a ready-made message (e.g. `Hi! Is "Gone Girl" still available?`) to
their clipboard and opens your profile — they just paste it into the DM.

---

## View it on your computer (before publishing)

```bash
cd site
python3 -m http.server 8080
```

Then open <http://127.0.0.1:8080/> in your browser.

---

## Publishing (Netlify + GitHub)

1. Push this project to a GitHub repo.
2. On Netlify: **Add new site → Import from GitHub**, pick the repo.
3. Set **Publish directory** to `site`. Leave the build command empty.
4. Netlify gives you a public link (works fine in India).

After that, any edit you commit on GitHub auto-updates the live site in ~30 seconds —
including marking books sold straight from github.com (edit `books.js`, click Commit).
