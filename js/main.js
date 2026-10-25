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
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.zilelsaif.kedaimatematik",
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
  },
  mataHelang: {
    title: "Mata Helang: Cari Kata",
    description: "Cari perkataan tersembunyi sambil mengasah kosa kata, fokus dan pemerhatian.",
    summary: "Cari perkataan tersembunyi dalam grid sambil mengasah kosa kata, fokus dan pemerhatian.",
    details: [
      ["Fokus", "Kosa Kata & Pemerhatian"],
      ["Umur", "5–15 tahun"],
      ["Kategori", "Haiwan, Buah-buahan, Makanan, Sekolah, Kenderaan & Alam"],
      ["Gaya", "Cari kata interaktif"],
      ["Peranti", "PC, Tablet & Mobile"],
      ["Kos", "Percuma"],
      ["Akaun", "Tidak diperlukan"],
      ["Status", "Beta — Dalam Pembangunan"]
    ],
    developmentNote: "Versi semasa sudah boleh dimainkan, tetapi kandungan, UI dan polish permainan masih dalam pembangunan.",
    ctaLabel: "Main Mata Helang",
    url: "https://mata-helang-cari-kata.pages.dev/",
    artworkUrl: "assets/games/mata-helang-card.webp",
    logoUrl: "",
    logoEmbedded: true,
    artworkAlt: "Mata Helang: Cari Kata — permainan cari kata bersama Raka",
    className: "mata-helang",
    label: "Dunia pemerhatian",
    symbol: "MH",
    note: "",
    meta: "Umur 5–15 • PC, Tablet & Mobile",
    statusBadge: "BETA"
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
    const playStoreAction = game.playStoreUrl
      ? `<a class="button button-store" href="${game.playStoreUrl}" target="_blank" rel="noopener noreferrer" aria-label="Dapatkan ${game.title} di Google Play">Google Play</a>`
      : "";
    const webCtaLabel = game.playStoreUrl ? "Main di Web" : "Main Sekarang";
    const actionsClass = game.playStoreUrl ? "game-actions has-play-store" : "game-actions";
    const statusBadge = game.statusBadge
      ? `<span class="game-status" title="Versi semasa sudah boleh dimainkan. UI, kandungan dan pengalaman permainan masih akan ditambah baik.">${game.statusBadge}</span>`
      : "";
    const visualNote = game.note ? `<small>${game.note}</small>` : "";
    const gameMeta = game.meta ? `<p class="game-meta">${game.meta}</p>` : "";

    return `
      <article class="game-card ${game.className}" id="${id}">
        <div class="game-visual" role="img" aria-label="${game.artworkUrl ? game.artworkAlt : `Placeholder visual rasmi untuk ${game.title}`}">
          ${logoContent}
          ${visualContent}
          ${visualNote}
        </div>
        <div class="game-body">
          <div class="game-heading"><h3>${game.title}</h3>${statusBadge}</div>
          <p>${game.description}</p>
          ${gameMeta}
          <div class="${actionsClass}">
            <a class="button button-game" ${playAttributes}>${webCtaLabel}</a>
            ${playStoreAction}
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
const modalNote = gameModal?.querySelector("[data-modal-note]");
const modalCta = gameModal?.querySelector("[data-modal-cta]");
const modalPlayStoreCta = gameModal?.querySelector("[data-modal-play-store-cta]");
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
  modalNote.textContent = game.developmentNote || "";
  modalNote.hidden = !game.developmentNote;
  modalCta.textContent = game.playStoreUrl ? "Main di Web" : game.ctaLabel;
  modalCta.href = game.url;
  modalCta.hidden = !game.url;
  modalPlayStoreCta.href = game.playStoreUrl || "#";
  modalPlayStoreCta.setAttribute("aria-label", `Dapatkan ${game.title} di Google Play`);
  modalPlayStoreCta.hidden = !game.playStoreUrl;
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
  modalNote.hidden = true;
  modalCta.hidden = true;
  modalPlayStoreCta.hidden = true;
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
