document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("section");
  const jogos = Array.from(section.querySelectorAll(".jogo"));

  jogos.sort((a, b) => {
    const tituloA = a.querySelector("h1").childNodes[0].nodeValue.trim().toLowerCase();
    const tituloB = b.querySelector("h1").childNodes[0].nodeValue.trim().toLowerCase();
    return tituloA.localeCompare(tituloB);
  });

  jogos.forEach(jogo => section.appendChild(jogo));
});