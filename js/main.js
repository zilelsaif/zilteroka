const games = {
  kedaiMatematik: {
    title: "Kedai Matematik",
    description: "Belajar Matematik melalui simulasi kedai, wang, masa dan ukuran.",
    summary: "Belajar Matematik melalui simulasi kedai dan misi interaktif.",
    details: [
      ["Fokus", "Matematik"],
      ["Topik", "Wang, Masa, Ukuran dan Pecahan"],
      ["Gaya", "Simulasi kedai & misi"],
      ["Peranti", "PC, Tablet & Mobile"],
      ["Kos", "Percuma"],
      ["Akaun", "Tidak diperlukan"]
    ],
    ctaLabel: "Main Kedai Matematik",
    url: "https://kedai-matematik.pages.dev/",
    artworkUrl: "assets/games/kedai-matematik-card.webp",
    logoUrl: "",
    logoEmbedded: true,
    artworkAlt: "Kedai Matematik — permainan Matematik dalam suasana kedai",
    className: "math",
    label: "Dunia nombor",
    symbol: "RM",
    note: "Wang · Masa · Ukuran"
  },
  makmalCilik: {
    title: "Makmal Cilik",
    description: "Teroka Sains melalui eksperimen dan misi bersama PICO.",
    summary: "Teroka konsep Sains melalui eksperimen dan misi bersama PICO.",
    details: [
      ["Fokus", "Sains"],
      ["Gaya", "Eksperimen & misi"],
      ["Pembantu", "PICO"],
      ["Peranti", "PC, Tablet & Mobile"],
      ["Kos", "Percuma"],
      ["Akaun", "Tidak diperlukan"]
    ],
    ctaLabel: "Main Makmal Cilik",
    url: "https://makmal-cilik.pages.dev/",
    artworkUrl: "assets/games/makmal-cilik-card.webp",
    logoUrl: "",
    logoEmbedded: true,
    artworkAlt: "Makmal Cilik — pengembaraan Sains bersama PICO",
    className: "science",
    label: "Dunia eksperimen",
    symbol: "⚗",
    note: "Sains · Eksperimen · Misi"
  },
  detektifBahasa: {
    title: "Detektif Bahasa",
    description: "Selesaikan kes dan misteri Bahasa Melayu di Bayuraya.",
    summary: "Selesaikan misteri Bahasa Melayu melalui penyiasatan di Bayuraya.",
    details: [
      ["Fokus", "Bahasa Melayu"],
      ["Gaya", "Misteri & penyiasatan"],
      ["Dunia", "Bayuraya"],
      ["Peranti", "PC, Tablet & Mobile"],
      ["Kos", "Percuma"],
      ["Akaun", "Tidak diperlukan"]
    ],
    ctaLabel: "Main Detektif Bahasa",
    url: "https://detektif-bahasa.pages.dev/",
    artworkUrl: "assets/games/detektif-bahasa-card.webp",
    logoUrl: "",
    logoEmbedded: true,
    artworkAlt: "Detektif Bahasa — pengembaraan Bahasa Melayu di Bayuraya",
    className: "language",
    label: "Dunia misteri",
    symbol: "?",
    note: "Bahasa · Petunjuk · Kes"
  }
};

const gameGrid = document.querySelector("[data-game-grid]");

if (gameGrid) {
  gameGrid.innerHTML = Object.entries(games).map(([id, game]) => {
    const playAttributes = game.url
      ? `href="${game.url}"`
      : `href="#" aria-disabled="true" data-unavailable="true"`;

    const visualContent = game.artworkUrl
      ? `<img class="game-artwork" src="${game.artworkUrl}" alt="" loading="lazy" decoding="async" data-asset-image><strong class="game-symbol game-asset-fallback" aria-hidden="true" hidden>${game.symbol}</strong>`
      : `<strong class="game-symbol" aria-hidden="true">${game.symbol}</strong>`;
    const logoContent = game.logoEmbedded
      ? ""
      : game.logoUrl
        ? `<img class="game-logo" src="${game.logoUrl}" alt="" loading="lazy" decoding="async" data-logo-image><span class="game-label game-logo-fallback" hidden>${game.label}</span>`
        : `<span class="game-label">${game.label}</span>`;

    return `
      <article class="game-card ${game.className}" id="${id}">
        <div class="game-visual" role="img" aria-label="${game.artworkUrl ? game.artworkAlt : `Placeholder visual rasmi untuk ${game.title}`}">
          ${logoContent}
          ${visualContent}
          <small>${game.note}</small>
        </div>
        <div class="game-body">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="game-actions">
            <a class="button button-game" ${playAttributes}>Main Sekarang</a>
            <button class="button button-info" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="game-modal-dialog" data-game-id="${id}" data-info-toggle>Info</button>
          </div>
        </div>
      </article>`;
  }).join("");

  gameGrid.addEventListener("error", (event) => {
    if (event.target.matches("[data-asset-image]")) {
      event.target.hidden = true;
      event.target.nextElementSibling.hidden = false;
    }
    if (event.target.matches("[data-logo-image]")) {
      event.target.hidden = true;
      event.target.nextElementSibling.hidden = false;
    }
  }, true);
}

const gameModal = document.querySelector("[data-game-modal]");
const modalPanel = gameModal?.querySelector("[data-modal-panel]");
const modalClose = gameModal?.querySelector("[data-modal-close]");
const modalMedia = gameModal?.querySelector("[data-modal-media]");
const modalArtwork = gameModal?.querySelector("[data-modal-artwork]");
const modalEyebrow = gameModal?.querySelector("[data-modal-eyebrow]");
const modalTitle = gameModal?.querySelector("[data-modal-title]");
const modalSummary = gameModal?.querySelector("[data-modal-summary]");
const modalDetails = gameModal?.querySelector("[data-modal-details]");
const modalCta = gameModal?.querySelector("[data-modal-cta]");
const parentGuide = gameModal?.querySelector("[data-parent-guide]");
let activeInfoTrigger = null;

const getModalFocusables = () => [...modalPanel.querySelectorAll(
  'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
)].filter((element) => {
  const closedDetails = element.closest("details:not([open])");
  const isClosedDetailsSummary = closedDetails?.querySelector(":scope > summary") === element;
  return !element.hidden
    && element.getClientRects().length > 0
    && (!closedDetails || isClosedDetailsSummary);
});

const openGameModal = (gameId, trigger) => {
  const game = games[gameId];
  if (!game || !gameModal) return;

  activeInfoTrigger = trigger;
  modalPanel.classList.remove("is-guide");
  modalMedia.hidden = false;
  modalEyebrow.textContent = "Maklumat game";
  modalArtwork.src = game.artworkUrl;
  modalArtwork.alt = game.artworkAlt;
  modalTitle.textContent = game.title;
  modalSummary.textContent = game.summary;
  modalDetails.innerHTML = game.details.map(([term, value]) => (
    `<div><dt>${term}</dt><dd>${value}</dd></div>`
  )).join("");
  modalCta.textContent = game.ctaLabel;
  modalCta.href = game.url;
  modalCta.hidden = !game.url;
  modalDetails.hidden = false;
  parentGuide.hidden = true;

  trigger.setAttribute("aria-expanded", "true");
  gameModal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
};

const openParentGuide = (trigger) => {
  if (!gameModal) return;

  activeInfoTrigger = trigger;
  modalPanel.classList.add("is-guide");
  modalMedia.hidden = true;
  modalEyebrow.textContent = "Panduan ringkas";
  modalTitle.textContent = "Panduan Ibu Bapa & Guru";
  modalSummary.textContent = "ZilTeroka direka sebagai aktiviti pembelajaran tambahan yang boleh dimainkan secara kendiri atau bersama orang dewasa.";
  modalDetails.hidden = true;
  modalCta.hidden = true;
  parentGuide.hidden = false;
  parentGuide.querySelectorAll("details").forEach((details, index) => {
    details.open = index === 0;
  });

  trigger.setAttribute("aria-expanded", "true");
  gameModal.hidden = false;
  document.body.classList.add("modal-open");
  modalClose.focus();
};

document.querySelectorAll("[data-guide-game-link]").forEach((link) => {
  const game = games[link.dataset.guideGameLink];
  if (game?.url) link.href = game.url;
});

const closeGameModal = () => {
  if (!gameModal || gameModal.hidden) return;

  gameModal.hidden = true;
  document.body.classList.remove("modal-open");
  activeInfoTrigger?.setAttribute("aria-expanded", "false");
  activeInfoTrigger?.focus();
  activeInfoTrigger = null;
};

document.addEventListener("click", (event) => {
  const unavailableLink = event.target.closest("[data-unavailable]");
  if (unavailableLink) event.preventDefault();

  const infoToggle = event.target.closest("[data-info-toggle]");
  if (infoToggle) {
    openGameModal(infoToggle.dataset.gameId, infoToggle);
  }

  const guideOpen = event.target.closest("[data-guide-open]");
  if (guideOpen) openParentGuide(guideOpen);

  if (event.target.closest("[data-modal-close], [data-modal-dismiss]")) closeGameModal();
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const closeMenu = () => {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Buka menu");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && gameModal && !gameModal.hidden) {
    event.preventDefault();
    closeGameModal();
    return;
  }

  if (event.key === "Tab" && gameModal && !gameModal.hidden) {
    const focusables = getModalFocusables();
    const first = focusables[0];
    const last = focusables.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (event.key === "Escape" && nav?.classList.contains("is-open")) {
    closeMenu();
    menuToggle?.focus();
  }
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
