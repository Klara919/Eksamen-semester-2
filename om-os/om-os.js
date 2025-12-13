// MODE:
// "closedFront" = kun forsiden
// "open"        = bogen er åben (2 sider / 1 side på mobil)
// "closedBack"  = kun bagsiden
let mode = "closedFront";

// Mobil / desktop
let isMobile = window.matchMedia("(max-width: 800px)").matches;
// "left" = vis venstre side, "right" = vis højre side (kun brugt på mobil)
let mobileSide = "left";

// Indholdet på siderne (venstre/højre pr. opslag)
const spreads = [
  {
    left: {
      label: "Om os",
      title: "",
      text:
        "Jeg hedder Jacob Sandberg, og jeg driver Emmy’s Kaffebar sammen med min familie.\n\n" +
        "For os handler Emmy’s om at give noget tilbage til Middelfart – at skabe et sted i byen, hvor hverdagen kan sænke farten, og hvor mennesker mødes på tværs af liv, rytmer og rutiner.\n\n" +
        "Caféen er tænkt som et lille lokalt holdepunkt et sted, hvor man kender ansigter, hvor stemningen føles genkendelig, og hvor det nære får lov at fylde.",
      photos: [
        {
          src: "../photos/jakobforside.webp",
          width: 150,
          tape: [
            { corner: "tl", style: "top:-16px; left:-10px; transform:rotate(-8deg);" },
            { corner: "br", style: "bottom:-10px; right:-6px; transform:rotate(-18deg);" }
          ]
        }
      ]
    },
    right: {
      label: "Hvorfor Emmy’s?",
      title: "",
      text:
        "Navnet Emmy’s er valgt som en hyldest til en helt særligt. Caféen er opkaldt efter min mormor, Emmy – et menneske, der samlede familien med varme, ro og den slags nærvær, man aldrig glemmer.\n\n" +
        "Emmy var typen, der altid havde tid. Tid til en kop kaffe, tid til en snak, tid til at få andre til at føle sig hjemme. Det er præcis den følelse, vi ønsker at give videre her i caféen.",
      photos: [
        {
          src: "../photos/emmys.jpg",
          width: 150,
          tape: [
            { corner: "tr", style: "top:-18px; right:-18px; transform:rotate(6deg);" },
            { corner: "bl", style: "bottom:-10px; left:-12px; transform:rotate(10deg);" }
          ]
        }
      ]
    }
  },
  {
    left: {
      label: "Hjertet bag Emmy’s",
      title: "",
      text:
        "Hos Emmy’s tror vi på, at en café skal være et frirum fyldt med ro, nærvær og ægte hygge – et sted, hvor alle kan føle sig hjemme.\n\n" +
        "Vi ønsker at være byens samlingspunkt, hvor generationer mødes over hjemmelavede smagsoplevelser og tid til hinanden.\n\n" +
        "Derfor bygger vi på varme, kvalitet og autenticitet. Alt hos os skal føles oprigtigt og omhyggeligt – og vores personale er en vigtig del af det. De møder gæsterne med smil og nærvær og bærer hjertet i Emmy’s videre hver dag.",
      photos: [
        {
          src: "../photos/cafe.jpeg",
          width: 120,
          tape: [
            { corner: "tl", style: "top:-18px; left:-18px; transform:rotate(-10deg);" },
            { corner: "br", style: "bottom:-10px; right:-12px; transform:rotate(-10deg);" }
          ]
        },
        {
          src: "../photos/personale.jpg",
          width: 170,
          tape: [
            { corner: "tl", style: "top:-18px; left:-18px; transform:rotate(-10deg);" },
            { corner: "br", style: "bottom: 10px; right:-16px; transform:rotate(-6deg);" }
          ]
        }
      ]
    },
    right: {
      label: "Hjemmelavet – helt fra hjertet",
      title: "",
      text:
        "Hos Emmy’s laver vi alt selv – helt fra bunden og altid med kærlighed. Det er sådan, Emmy gjorde det, og den tradition bærer vi videre hver eneste dag.\n\n" +
        "Hver eneste ting, vi laver, bærer præg af vores tilgang: vi går op i detaljen, vælger lokale råvarer af høj kvalitet og holder fast i det gode håndværk, der giver smag og sjæl.\n\n" +
        "For os er hjemmelavet ikke bare en metode – det er en hyldest til Emmy og til den omsorg, hun stod for.",
      photos: [
        {
          src: "../photos/mad.jpeg",
          width: 150,
          tape: [
            { corner: "tl", style: "top:-16px; left:30px; transform:rotate(-8deg);" },
            { corner: "br", style: "bottom:-12px; right: 45px; transform:rotate(8deg);" }
          ]
        },
        {
          src: "../photos/kage.jpeg",
          width: 130,
          tape: [
            { corner: "bl", style: "bottom:-10px; left:-10px; transform:rotate(8deg);" },
            { corner: "br", style: "bottom:150px; right:-10px; transform:rotate(8deg);" }
          ]
        }
      ]
    }
  },
  {
    left: {
      label: "Kaffen er kernen",
      title: "",
      text:
        "Hos Emmy’s betyder kaffe noget helt særligt.\n\n" +
        "Vi brygger på kvalitetsbønner fra Brew Company – og lægger omtanke og kærlighed i hver eneste kop, vi serverer.\n\n" +
        "En lille pause i hverdagen, som smager af ro og nærvær.",
      photos: [
        {
          src: "../photos/kaffe.jpg",
          width: 150,
          tape: [
            { corner: "tl", style: "top:-16px; left:40px; transform:rotate(-8deg);" },
            { corner: "br", style: "bottom:2px; right:40px; transform:rotate(2deg);" }
          ]
        },
        {
          src: "../photos/kaffedealer.jpeg",
          width: 140,
          tape: [
            { corner: "tr", style: "top:-18px; right:-18px; transform:rotate(6deg);" },
            { corner: "bl", style: "bottom:-10px; left:-10px; transform:rotate(4deg);" }
          ]
        }
      ]
    },
    right: {
      label: "Essensen af Emmy’s",
      title: "",
      text:
        "Emmy’s er skabt som et lille frirum, hvor nærvær, hjemlighed og varme går hånd i hånd.\n\n" +
        "Her mødes godt håndværk, kvalitetsråvarer, kærlighed til kaffe og en atmosfære, der føles som at træde ind hos nogen, der kender dig.\n\n" +
        "Det er her, vi gør os umage – hver dag – for at give dig den ro, hygge og hjertevarme, som Emmy selv stod for.",
      photos: [
        {
          src: "../photos/esensmad.jpeg",
          width: 130,
          tape: [
            { corner: "tl", style: "top:-10px; left: 30px; transform:rotate(-8deg);" },
            { corner: "bl", style: "bottom: 15px; left: 30px; transform:rotate(4deg);" }
          ]
        },
        {
          src: "../photos/cafested.jpeg",
          width: 150,
          tape: [
            { corner: "bl", style: "bottom: 175px; left:90px; transform:rotate(9deg);" },
            { corner: "bl", style: "bottom: -10px; left: 30px; transform:rotate(4deg);" }
          ]
        }
      ]
    }
  }
];

let currentSpread = 0;

// DOM-referencer
const book       = document.getElementById("book");
const frontCover = document.getElementById("frontCover");
const backCover  = document.getElementById("backCover");
const bookInner  = document.getElementById("bookInner");

const leftLabel  = document.getElementById("leftLabel");
const leftTitle  = document.getElementById("leftTitle");
const leftText   = document.getElementById("leftText");

const rightLabel = document.getElementById("rightLabel");
const rightTitle = document.getElementById("rightTitle");
const rightText  = document.getElementById("rightText");

const leftPage   = document.getElementById("leftPage");
const rightPage  = document.getElementById("rightPage");

const nav        = document.getElementById("nav");
const nextBtn    = document.getElementById("nextBtn");
const prevBtn    = document.getElementById("prevBtn");
const pageInfo   = document.getElementById("pageInfo");

const openBookBtn    = document.getElementById("openBookBtn");
const backToFrontBtn = document.getElementById("backToFrontBtn");
const bookIntro = document.getElementById("bookIntro");

/* ===== Hjælpefunktion: mobil/desktop toggle ===== */
function updateIsMobile() {
  const m = window.matchMedia("(max-width: 800px)").matches;
  if (m !== isMobile) {
    isMobile = m;
    if (isMobile) {
      mobileSide = "left";
    } else {
      // desktop → vis begge sider
      leftPage.style.display  = "flex";
      rightPage.style.display = "flex";
    }
    if (mode === "open") {
      renderSpread(currentSpread);
    }
  }
}

window.addEventListener("resize", updateIsMobile);

/* ===== FOTO-RENDERING MED FRI STØRRELSE + TAPE ===== */
function renderPhotos(side, data) {
  const container = document.getElementById(side + "Photos");
  if (!container) return;

  const photos = data.photos || [];
  if (!photos.length) {
    container.innerHTML = "";
    return;
  }

  let inner = "";
  photos.forEach((p) => {
    const widthStyle = p.width ?`  style="width:${p.width}px"` : "";
    inner += `<div class="photo-taped">`;
    inner += `<img src="${p.src}" alt=""${widthStyle}>`;

    const tapes = p.tape || [];
    tapes.forEach((t) => {
      const cornerClass = t.corner ?` ${t.corner}` : "";
      const styleAttr   = t.style ?  `style="${t.style}"` : "";
      inner += `<span class="tape${cornerClass}"${styleAttr}></span>`;
    });

    inner += `</div>`;
  });

  container.innerHTML = `<div class="photo-row">${inner}</div>`;
}

/* ===== Styr synlige sider på mobil ===== */
function applyMobilePageVisibility() {
  if (!isMobile) {
    // Desktop: vis begge sider
    leftPage.style.display  = "flex";
    rightPage.style.display = "flex";
    return;
  }

  // Mobil: vis kun én side ad gangen
  if (mobileSide === "left") {
    leftPage.style.display  = "flex";
    rightPage.style.display = "none";
  } else {
    leftPage.style.display  = "none";
    rightPage.style.display = "flex";
  }
}

/* ===== Tegn aktuelt opslag (tekst + fotos) ===== */
function renderSpread(i) {
  const spread = spreads[i];

  leftLabel.textContent  = spread.left.label;
  leftTitle.textContent  = spread.left.title;
  leftText.textContent   = spread.left.text;

  rightLabel.textContent = spread.right.label;
  rightTitle.textContent = spread.right.title;
  rightText.textContent  = spread.right.text;

  renderPhotos("left", spread.left);
  renderPhotos("right", spread.right);

  if (pageInfo) {
    pageInfo.textContent =` ${spread.left.label} • ${spread.right.label}`;
  }

  applyMobilePageVisibility();
}

/* ===== Modes: forside / bog / bagside ===== */
function setMode(newMode) {
  mode = newMode;

  if (mode === "closedFront") {
    book.classList.remove("open");
    frontCover.style.display = "flex";
    backCover.style.display  = "none";
    bookInner.style.display  = "none";
    if (nav) nav.classList.remove("visible");

    // ← VIS intro på forsiden
    if (bookIntro) bookIntro.style.visibility = "visible";

  } else if (mode === "open") {
    book.classList.add("open");
    frontCover.style.display = "none";
    backCover.style.display  = "none";
    bookInner.style.display  = "grid";
    if (nav) nav.classList.add("visible");
    renderSpread(currentSpread);

    // ← SKJUL intro når bogen er åben
    if (bookIntro) bookIntro.style.visibility = "hidden";

  } else if (mode === "closedBack") {
    book.classList.remove("open");
    frontCover.style.display = "none";
    backCover.style.display  = "flex";
    bookInner.style.display  = "none";
    if (nav) nav.classList.remove("visible");

    // ← SKJUL intro på bagsiden
    if (bookIntro) bookIntro.style.visibility = "hidden";
  }
}

/* ===== Bladrefunktioner ===== */
function goNext() {
  if (mode !== "open") return;

  // MOBIL: én side ad gangen, men med samme flip-animation
  if (isMobile) {
    const activePage = mobileSide === "left" ? leftPage : rightPage;

    activePage.classList.remove("flip-next");
    void activePage.offsetWidth;
    activePage.classList.add("flip-next");

    setTimeout(() => {
      activePage.classList.remove("flip-next");

      if (mobileSide === "left") {
        // venstre -> højre på samme opslag
        mobileSide = "right";
        applyMobilePageVisibility();
      } else {
        // højre -> næste opslag
        if (currentSpread < spreads.length - 1) {
          currentSpread++;
          mobileSide = "left";
          renderSpread(currentSpread);
        } else {
          setMode("closedBack");
        }
      }
    }, 350);

    return;
  }

  // DESKTOP: original bladre-animation
  if (currentSpread < spreads.length - 1) {
    rightPage.classList.remove("flip-next");
    void rightPage.offsetWidth;
    rightPage.classList.add("flip-next");

    setTimeout(() => {
      rightPage.classList.remove("flip-next");
      currentSpread++;
      renderSpread(currentSpread);
    }, 350);
  } else {
    setMode("closedBack");
  }
}

function goPrev() {
  if (mode !== "open") return;

  // MOBIL: én side ad gangen, med flip-animation
  if (isMobile) {
    const activePage = mobileSide === "left" ? leftPage : rightPage;

    activePage.classList.remove("flip-prev");
    void activePage.offsetWidth;
    activePage.classList.add("flip-prev");

    setTimeout(() => {
      activePage.classList.remove("flip-prev");

      if (mobileSide === "right") {
        // højre -> venstre på samme opslag
        mobileSide = "left";
        applyMobilePageVisibility();
      } else {
        // venstre -> forrige opslag (højre side)
        if (currentSpread > 0) {
          currentSpread--;
          mobileSide = "right";
          renderSpread(currentSpread);
        } else {
          setMode("closedFront");
        }
      }
    }, 350);

    return;
  }

  // DESKTOP: original bladre-animation
  if (currentSpread > 0) {
    leftPage.classList.remove("flip-prev");
    void leftPage.offsetWidth;
    leftPage.classList.add("flip-prev");

    setTimeout(() => {
      leftPage.classList.remove("flip-prev");
      currentSpread--;
      renderSpread(currentSpread);
    }, 350);
  } else {
    setMode("closedFront");
  }
}

/* ===== Åbne / lukke bogen ===== */
function openBook() {
  if (mode !== "closedFront") return;
  currentSpread = 0;
  mobileSide = "left";
  setMode("open");
}

frontCover.addEventListener("click", openBook);
if (openBookBtn) {
  openBookBtn.addEventListener("click", openBook);
}

backCover.addEventListener("click", () => {
  setMode("closedFront");
});

if (backToFrontBtn) {
  backToFrontBtn.addEventListener("click", () => {
    setMode("closedFront");
  });
};

/* Klik på siderne → bladre */
rightPage.addEventListener("click", goNext);
leftPage.addEventListener("click", goPrev);

/* Navigation-knapper under bogen */
if (nextBtn) nextBtn.addEventListener("click", goNext);
if (prevBtn) prevBtn.addEventListener("click", goPrev);

/* Starttilstand: forsiden */
setMode("closedFront");
updateIsMobile();

