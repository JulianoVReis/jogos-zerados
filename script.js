document.addEventListener("DOMContentLoaded", () => {
	const main = document.querySelector("main");
	const menuListaJogos = document.querySelector(".menu-lista-jogos");
	const listaJogos = document.querySelector(".lista-jogos");
	const section = document.querySelector("section");
	const navLista = document.querySelector("nav ul");
	const linksInternos = document.querySelectorAll('a[href^="#"]');
	const linksLista = document.querySelectorAll(".lista-jogos a");
	const regiao = document.querySelectorAll('.texto-info div:last-of-type')

	if (menuListaJogos && listaJogos) {
		menuListaJogos.addEventListener("click", (event) => {
			event.stopPropagation();
			listaJogos.classList.toggle("aparecer");
		});

		main?.addEventListener("click", (event) => {
			if (!listaJogos.contains(event.target) && !menuListaJogos.contains(event.target)) {
				listaJogos.classList.remove("aparecer");
			}
		});

		linksLista.forEach((link) => {
			link.addEventListener("click", () => {
				listaJogos.classList.remove("aparecer");
			});
		});
	}

	linksInternos.forEach((link) => {
		link.addEventListener("click", (e) => {
			const href = link.getAttribute("href");
			if (href.startsWith("#")) {
				e.preventDefault();
				const destino = document.getElementById(href.substring(1));
				if (destino) {
					destino.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}
		});
	});

	if (section) {
	const jogos = Array.from(section.querySelectorAll(".jogo"));

	const nomes = jogos.map(jogo => {
		const h1 = jogo.querySelector("h1");
		const titulo = h1?.textContent.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		console.log("Título encontrado:", titulo);
		return titulo;
	});
}

	const lista = document.querySelector(".lista-jogos ul");
	if (lista) {
		const itens = Array.from(lista.querySelectorAll("li"));
		itens.sort((a, b) => a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase()));
		itens.forEach((item) => lista.appendChild(item));
	}

	if (navLista) {
		const itens = Array.from(navLista.querySelectorAll("li"));
		itens.sort((a, b) => a.textContent.toLowerCase().localeCompare(b.textContent.toLowerCase()));
		itens.forEach((item) => navLista.appendChild(item));
	}

	regiao.forEach(el => {
	 el.addEventListener('mouseenter', () => {
		el.title = 'Versões Zeradas';
	 });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const spans = document.querySelectorAll('nav ul li a span');
  let total = 0;

  spans.forEach(span => {
    const valor = parseInt(span.textContent, 10);
    if (!isNaN(valor)) {
      total += valor;
    }
  });

  const totalSpan = document.querySelector('nav > p > span');
  if (totalSpan) {
    totalSpan.textContent = total;
  }
});
