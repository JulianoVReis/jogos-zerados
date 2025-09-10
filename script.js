window.addEventListener("DOMContentLoaded", () => {
	const spans = document.querySelectorAll("ul.lista li a span");
	let total = 0;

	spans.forEach((span) => {
		const valor = parseInt(span.textContent);
		if (!isNaN(valor)) {
			total += valor;
		}

		// Aplica a cor dinamicamente
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
		
		// Fecha o top-lista se estiver aberto
		if (topLista.classList.contains("active")) {
			topLista.classList.remove("active");
		}
	});

	const btnTop = document.querySelector(".top");
	const topLista = document.querySelector(".top-lista");

	btnTop.addEventListener("click", (e) => {
		e.stopPropagation(); // evita fechar imediatamente
		topLista.classList.toggle("active");
		
		// Fecha o menu lista-jogos se estiver aberto
		if (aberto) {
			menuJogos.style.display = "none";
			btnLista.classList.remove("ativo");
			aberto = false;
		}
	});

	// Fechar .top-lista ao clicar fora
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
    const mapa = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
    let total = 0;
    let prev = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
        const atual = mapa[roman[i].toUpperCase()];
        if (atual < prev) {
            total -= atual;
        } else {
            total += atual;
        }
        prev = atual;
    }
    return total;
}

function extrairNumeroDoTitulo(titulo) {
    const regex = /\b([IVXLCDM]+|\d+)\b/i;
    const match = titulo.match(regex);
    if (match) {
        if (/^[IVXLCDM]+$/i.test(match[1])) {
            return romanToInt(match[1]);
        }
        return parseInt(match[1], 10);
    }
    return null;
}

jogos.sort((a, b) => {
    const tituloA = a.querySelector("h1").textContent.trim();
    const tituloB = b.querySelector("h1").textContent.trim();

    const numA = extrairNumeroDoTitulo(tituloA);
    const numB = extrairNumeroDoTitulo(tituloB);

    if (numA !== null && numB !== null && numA !== numB) {
        return numA - numB;
    }

    return tituloA.localeCompare(tituloB, "pt-BR", { numeric: true, sensitivity: "base" });
});
});