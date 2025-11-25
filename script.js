window.addEventListener("DOMContentLoaded", () => {
	const spans = document.querySelectorAll("ul.lista li a span");
	let total = 0;

	spans.forEach((span) => {
		const valor = parseInt(span.textContent);
		if (!isNaN(valor)) {
			total += valor;
		}

		span.style.color = valor > 0 ? "#19E428" : "#F70103";
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

		if (topLista.classList.contains("active")) {
			topLista.classList.remove("active");
		}
	});

	const btnTop = document.querySelector(".top");
	const topLista = document.querySelector(".top-lista");

	btnTop.addEventListener("click", (e) => {
		e.stopPropagation();
		topLista.classList.toggle("active");

		if (aberto) {
			menuJogos.style.display = "none";
			btnLista.classList.remove("ativo");
			aberto = false;
		}
	});

	document.addEventListener("click", (e) => {
		if (!topLista.contains(e.target) && !btnTop.contains(e.target)) {
			topLista.classList.remove("active");
		}
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

	function romanToInt(roman) {
		const mapa = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
		let total = 0;
		let prev = 0;

		for (let i = roman.length - 1; i >= 0; i--) {
			const atual = mapa[roman[i].toUpperCase()] || 0;
			if (atual < prev) {
				total -= atual;
			} else {
				total += atual;
			}
			prev = atual;
		}
		return total;
	}

	function parseTitle(title) {
		const trailingRegex = /(?:\s+|^)([IVXLCDM]+|\d+)\s*$/i;
		const match = title.match(trailingRegex);

		if (match) {
			const token = match[1];
			const num = /^[IVXLCDM]+$/i.test(token) ? romanToInt(token) : parseInt(token, 10);
			const base = title.slice(0, match.index).trim();
			return { base: base, baseKey: base.toLowerCase(), num: isNaN(num) ? 0 : num };
		}

		return { base: title.trim(), baseKey: title.trim().toLowerCase(), num: 0 };
	}

	jogos.sort((a, b) => {
		const tituloA = a.querySelector("h1").textContent.trim();
		const tituloB = b.querySelector("h1").textContent.trim();

		const pA = parseTitle(tituloA);
		const pB = parseTitle(tituloB);

		const baseCompare = pA.baseKey.localeCompare(pB.baseKey, "pt-BR", { sensitivity: "base" });
		if (baseCompare !== 0) return baseCompare;

		if (pA.num !== pB.num) return pA.num - pB.num;

		return tituloA.localeCompare(tituloB, "pt-BR", { numeric: true, sensitivity: "base" });
	});

	jogos.forEach((jogo) => container.appendChild(jogo));
});