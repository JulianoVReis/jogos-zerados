document.addEventListener("DOMContentLoaded", () => {
	const main = document.querySelector("main");
	const menuListaJogos = document.querySelector(".menu-lista-jogos");
	const listaJogos = document.querySelector(".lista-jogos");
	const section = document.querySelector("section");
	const navLista = document.querySelector("nav ul");
	const linksInternos = document.querySelectorAll('a[href^="#"]');
	const linksLista = document.querySelectorAll(".lista-jogos a");

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
		jogos.sort((a, b) => {
			const tituloA = a.querySelector("h1").childNodes[0].nodeValue.trim().toLowerCase();
			const tituloB = b.querySelector("h1").childNodes[0].nodeValue.trim().toLowerCase();
			return tituloA.localeCompare(tituloB);
		});
		jogos.forEach((jogo) => section.appendChild(jogo));
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
});
