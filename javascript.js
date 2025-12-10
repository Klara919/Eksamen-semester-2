const marquees = document.querySelectorAll(".marquee-text textPath");

function updateMarquee() {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

  // Adjust multiplier for speed/direction
  const offset = scrollPercent * -150;

  // Update all marquees
  marquees.forEach((textPath) => {
    textPath.setAttribute("startOffset", offset + "%");
  });
}

window.addEventListener("scroll", updateMarquee);
