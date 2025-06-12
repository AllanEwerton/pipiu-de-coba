const paginas = [
  `Meu raio de sol ☀️,

Hoje eu não te escrevo apenas uma carta.
Te escrevo um pedaço da minha alma, um reflexo do que você significa pra mim.
Você é o amor da minha vida, meu porto seguro.
E quando eu consigo arrancar um sorriso seu… meu mundo melhora infinitamente.
É como se cada canto da minha existência se iluminasse só por te ver feliz.`,

  `Eu nunca vou esquecer daquele dia.
A gente só saiu pra dar uma volta, mas parecia que o universo tinha planos maiores.
Você estava preocupada, dividida, com o coração em conflito.
Mas aí você me abraçou…
Ali, sentados num beco qualquer, tudo fez sentido.
O tempo parou. O mundo lá fora ficou pequeno.
E, naquele instante silencioso, nós soubemos:
fomos feitos um para o outro.`,

  `Desde então, tudo mudou.
Mas o que sinto por você só cresce.
Te amar se tornou a coisa mais natural que já aconteceu comigo.
É fácil, é leve, é verdadeiro.

Quando estou com você, até o silêncio tem paz.
Quando você sorri, até os meus medos se calam.
Você é a minha calma no meio da bagunça.
A luz que insiste mesmo nos dias mais nublados.`,

  `E por isso, hoje e sempre, eu te prometo:
vou estar aqui.
Nos dias bons, pra rir contigo.
Nos dias difíceis, pra te lembrar que nunca estará sozinha.
Vou segurar tua mão com a mesma certeza daquele primeiro abraço,
e escolher te amar, todos os dias, com a mesma intensidade do primeiro olhar.`,

  `Feliz Dia dos Namorados, meu Pipiu de coba.

Com todo o meu coração,
Seu Pipiu de Jitrafales (vulgo Allan)


ps. temacomigo`
];

const divMensagem = document.getElementById("mensagem");
const botao = document.getElementById("botao");
let paginaAtual = -1;
let escrevendo = false;
let timeoutEscrita;

function atualizarBotao() {
  if (paginaAtual === -1) {
    botao.textContent = "Começar 💞";
  } else if (paginaAtual < paginas.length - 1) {
    botao.textContent = "Próxima Página ➡️";
  } else {
    botao.textContent = "Próxima Surpresa 💞";
  }
  botao.style.display = 'inline-block';
}

function esconderBotao() {
  botao.style.display = 'none';
}

function digitarPagina() {
  const mensagem = paginas[paginaAtual];
  const comprimentoAtual = divMensagem.textContent.length;
  
  if (comprimentoAtual < mensagem.length) {
    divMensagem.textContent = mensagem.substring(0, comprimentoAtual + 1);
    timeoutEscrita = setTimeout(digitarPagina, 20 + Math.random() * 20);
  } else {
    escrevendo = false;
    atualizarBotao();
  }
}

function iniciarProximaPagina() {
  if (escrevendo) return;
  
  paginaAtual++;
  esconderBotao();
  
  if (paginaAtual < paginas.length) {
    escrevendo = true;
    divMensagem.textContent = '';
    digitarPagina();
  } else {
    // Ação após última página
    botao.style.display = 'none';
  }
}

function configurarEventos() {
  botao.addEventListener('click', () => {
    if (!escrevendo) {
      if (paginaAtual === -1 || paginaAtual < paginas.length - 1) {
        iniciarProximaPagina();
      } else {
        // Ação final
        botao.style.display = 'none';
      }
    }
  });
}

// Inicialização
function init() {
  atualizarBotao();
  configurarEventos();
}

// Limpar timeout ao sair da página
window.addEventListener('beforeunload', () => {
  clearTimeout(timeoutEscrita);
});

document.addEventListener('DOMContentLoaded', init());

// Corações animados (mantém responsivo)
const container = document.getElementById("coracoes");
const numCoracoes = window.innerWidth < 400 ? 6 : window.innerWidth < 600 ? 10 : 22;
for (let j = 0; j < numCoracoes; j++) {
  let coração = document.createElement("div");
  coração.classList.add("coração");
  coração.style.left = Math.random() * 100 + "vw";
  coração.style.animationDuration = 4 + Math.random() * 5 + "s";
  container.appendChild(coração);
}

// --- Carrossel de fotos e vídeos ---
const carroselArquivos = [
  "2.jpg",
  "1.jpg",
  "4.jpg",
  "3.jpg",
  "4.mp4",
];

const carrosel = document.getElementById("carrosel");
const btnPrev = document.getElementById("carrosel-prev");
const btnNext = document.getElementById("carrosel-next");
let carroselIndex = 0;

function mostrarCarrosel(index) {
  carrosel.innerHTML = "";
  const arquivo = carroselArquivos[index];
  if (!arquivo) return;
  const ext = arquivo.split('.').pop().toLowerCase();
  let elemento;
  if (["mp4", "webm", "ogg"].includes(ext)) {
    elemento = document.createElement("video");
    elemento.src = `src/assets/carrosel/${arquivo}`;
    elemento.controls = true;
    elemento.autoplay = false;
    elemento.loop = true;
    elemento.style.background = "#000";
  } else if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) {
    elemento = document.createElement("img");
    elemento.src = `src/assets/carrosel/${arquivo}`;
    elemento.alt = "Foto do carrossel";
  } else {
    elemento = document.createElement("div");
    elemento.textContent = "Arquivo não suportado";
  }
  carrosel.appendChild(elemento);
}

let carroselAutoTimer = null;
const carroselAutoInterval = 4000; // 4 segundos

function iniciarCarroselAuto() {
  if (carroselAutoTimer) clearInterval(carroselAutoTimer);
  carroselAutoTimer = setInterval(() => {
    carroselIndex = (carroselIndex + 1) % carroselArquivos.length;
    mostrarCarrosel(carroselIndex);
  }, carroselAutoInterval);
}

function pararCarroselAuto() {
  if (carroselAutoTimer) clearInterval(carroselAutoTimer);
}

btnPrev.addEventListener("click", () => {
  carroselIndex = (carroselIndex - 1 + carroselArquivos.length) % carroselArquivos.length;
  mostrarCarrosel(carroselIndex);
  iniciarCarroselAuto();
});

btnNext.addEventListener("click", () => {
  carroselIndex = (carroselIndex + 1) % carroselArquivos.length;
  mostrarCarrosel(carroselIndex);
  iniciarCarroselAuto();
});

// Opcional: pausa rotação automática ao passar mouse
carrosel.addEventListener("mouseenter", pararCarroselAuto);
carrosel.addEventListener("mouseleave", iniciarCarroselAuto);

document.getElementById("carrosel-container").style.display = "flex";
mostrarCarrosel(carroselIndex);
iniciarCarroselAuto();

