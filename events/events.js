const cards = document.querySelectorAll('.cards-grid .card');

cards.forEach((card, index) => {
  // Skift flyveretning skiftevis fra venstre/højre
  const fromLeft = index % 2 === 0;
  const translateX = fromLeft ? '-100vw' : '100vw';
  const rotateDeg = fromLeft ? -15 : 15;

  // Sæt CSS variabel til start transform
  card.style.setProperty('--start-transform', `translateX(${translateX}) rotate(${rotateDeg}deg) scale(0.9)`);

  // Tilføj klassens fly-in med delay
  setTimeout(() => {
    card.classList.add('fly-in');

    // Tilføj lidt tilfældig rotation på slutposition, hvis ønsket
    const randomRotation = Math.random() * 10 - 5; // -5 til +5 grader
    card.style.transform = `rotate(${randomRotation}deg)`;
  }, index * 300);
});