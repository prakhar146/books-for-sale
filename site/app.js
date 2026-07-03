// ---- Your Instagram username -------------------------------------------
// Replace the placeholder with your real Instagram handle (no @, no URL).
// Example: "prakhar.reads"
const INSTAGRAM_USERNAME = "your_handle_here"; // <-- CHANGE THIS
// ------------------------------------------------------------------------
// Note: Instagram has no way to pre-fill a DM message from a link. So tapping
// the button copies a ready-made message to the clipboard AND opens your
// profile — the buyer just pastes it into the DM. Best possible on Instagram.

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const hideSoldInput = document.getElementById("hideSold");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");
const toast = document.getElementById("toast");

function igLink() {
  return `https://instagram.com/${INSTAGRAM_USERNAME}`;
}

function dmMessage(title) {
  return `Hi! Is "${title}" still available? What's the price?`;
}

const IG_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6zm0 8.74a3.44 3.44 0 1 1 0-6.88 3.44 3.44 0 0 1 0 6.88zm6.75-8.94a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0z"/></svg>`;

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const hideSold = hideSoldInput.checked;

  const visible = BOOKS.filter((b) => {
    if (hideSold && b.sold) return false;
    if (!q) return true;
    const hay = (b.title + " " + (b.note || "")).toLowerCase();
    return hay.includes(q);
  });

  grid.innerHTML = "";
  visible.forEach((b) => grid.appendChild(cardFor(b)));

  emptyEl.hidden = visible.length !== 0;
  const soldCount = BOOKS.filter((b) => b.sold).length;
  countEl.textContent = `${BOOKS.length} books • ${soldCount} sold`;
}

function cardFor(b) {
  const card = document.createElement("article");
  card.className = "card" + (b.sold ? " sold" : "");

  const noteHtml = b.note ? `<p class="card-note">${escapeHtml(b.note)}</p>` : "";
  const soldBadge = b.sold ? `<span class="sold-badge">Sold</span>` : "";

  let btn;
  if (b.sold) {
    btn = `<span class="btn-ig">Sold out</span>`;
  } else {
    btn = `<a class="btn-ig" href="${igLink()}" target="_blank" rel="noopener">${IG_ICON} DM on Instagram</a>`;
  }

  card.innerHTML = `
    <div class="thumb">
      ${soldBadge}
      <img src="images/${b.img}" alt="${escapeHtml(b.title)}" loading="lazy" />
    </div>
    <div class="card-body">
      <h2 class="card-title">${escapeHtml(b.title)}</h2>
      ${noteHtml}
      ${btn}
    </div>`;

  // Copy a ready-made enquiry message to the clipboard, then let the link open the profile.
  if (!b.sold) {
    const link = card.querySelector(".btn-ig");
    link.addEventListener("click", () => {
      const msg = dmMessage(b.title);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(showToast).catch(() => {});
      }
    });
  }
  return card;
}

let toastTimer;
function showToast() {
  if (!toast) return;
  toast.textContent = "Message copied — paste it in the DM 👍";
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

searchInput.addEventListener("input", render);
hideSoldInput.addEventListener("change", render);
render();
