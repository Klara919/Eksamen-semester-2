// Find alle tekst-paths inden for elementer med klassen "marquee-text"
const marquees = document.querySelectorAll(".marquee-text textPath");

// Funktion til at opdatere startOffset på tekst-paths baseret på scroll
function updateMarquee() {
  // Beregn hvor langt vi har scrollet som procent af scrollbaren
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

  // Multiplicer med -150 for at styre hastighed og retning af tekstens rulle
  // - Negativt tal ruller teksten modsat scrollretning
  // - Større absolut værdi = hurtigere rullehastighed
  // - Mindre absolut værdi = langsommere rullehastighed
  const offset = scrollPercent * -150;

  // Opdater alle tekst-paths med det nye startOffset
  marquees.forEach((textPath) => {
    textPath.setAttribute("startOffset", offset + "%");
  });
}

// Tilføj event listener så updateMarquee kaldes ved scroll
window.addEventListener("scroll", updateMarquee);

// Når hele siden er loadet, håndter preloader
window.addEventListener("load", () => {
  // Find preloader-elementet
  const preloader = document.getElementById("preloader");

  // Minimum tid preloader skal være synlig (i ms)
  const minimumTime = 2000; 
  // Gem starttidspunkt
  const startTime = performance.now();

  // Funktion til at fjerne preloader med fade-out
  const finish = () => {
    preloader.style.opacity = "0"; // Start fade-out (forudsætter CSS transition)
    setTimeout(() => preloader.style.display = "none", 800); // Fjern elementet efter fade
  };

  // Beregn hvor lang tid preloader allerede har været synlig
  const elapsed = performance.now() - startTime;

  // Hvis preloader har været vist for kort tid, vent resten af minimumTime
  if (elapsed < minimumTime) {
    setTimeout(finish, minimumTime - elapsed);
  } else {
    // Ellers fjern preloader med det samme
    finish();
  }
});
