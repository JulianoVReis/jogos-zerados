window.addEventListener("DOMContentLoaded", () => {
	const spans = document.querySelectorAll("ul.lista li a span");
	let total = 0;

	spans.forEach((span) => {
		const valor = parseInt(span.textContent);
		if (!isNaN(valor)) {
			total += valor;
		}
	});

	const totalSpan = document.querySelector("p span");
	if (totalSpan) {
		totalSpan.textContent = total;
	}

	const btnLista = document.querySelector(".lista");
	const menuJogos = document.querySelector(".lista-jogos");

	let aberto = false;

	btnLista.addEventListener("click", (e) => {
		e.stopPropagation();
		aberto = !aberto;
		menuJogos.style.display = aberto ? "block" : "none";
		btnLista.classList.toggle("ativo", aberto);
	});

	document.addEventListener("click", (e) => {
		if (aberto && !menuJogos.contains(e.target) && e.target !== btnLista) {
			menuJogos.style.display = "none";
			btnLista.classList.remove("ativo");
			aberto = false;
		}
	});

	const container = document.querySelector(".container");
	const jogos = Array.from(container.querySelectorAll(".jogo"));

	jogos.sort((a, b) => {
		const tituloA = a.querySelector("h1").textContent.trim().toLowerCase();
		const tituloB = b.querySelector("h1").textContent.trim().toLowerCase();

		return tituloA.localeCompare(tituloB, "pt-BR", { numeric: true, sensitivity: "base" });
	});

	jogos.reverse().forEach((jogo) => container.prepend(jogo));
});
