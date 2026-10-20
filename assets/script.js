/* =========================================================
   DOCES MOMENTOS — Scripts de Interatividade
   ========================================================= */

(function () {
  'use strict';

  const temaToggle = document.querySelector('.tema-toggle');
  const temaSalvo = localStorage.getItem('doces-momentos-tema');

  function aplicarTemaEscuro(escuro) {
    document.body.dataset.theme = escuro ? 'dark' : 'light';
    temaToggle.setAttribute('aria-pressed', String(escuro));
    temaToggle.setAttribute('aria-label', escuro ? 'Ativar tema claro' : 'Ativar tema escuro');
    temaToggle.title = escuro ? 'Ativar tema claro' : 'Ativar tema escuro';
  }

  aplicarTemaEscuro(temaSalvo === 'dark');
  temaToggle.addEventListener('click', () => {
    const escuro = document.body.dataset.theme !== 'dark';
    aplicarTemaEscuro(escuro);
    localStorage.setItem('doces-momentos-tema', escuro ? 'dark' : 'light');
  });

  const fada = document.querySelector('.fada-assistente');
  const fadaBotao = fada.querySelector('.fada-toque');
  const fadaFala = fada.querySelector('.fada-fala');
  const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
  const falasFada = [
    'Vamos explorar os sabores juntos?',
    'Toque em um potinho para descobrir mais!',
    'Seu próximo docinho favorito pode estar por aqui.',
    'Já escolheu o tamanho do seu carinho?',
    'Uma encomenda gostosa está a um toque de distância!'
  ];
  let alvoFada = null;
  let falaTimeout;
  let framePendente = false;
  let ultimaFala = 0;
  let indiceFala = 0;

  function mostrarFalaFada(mensagem) {
    fadaFala.textContent = mensagem;
    fada.classList.add('fada-falando');
    window.clearTimeout(falaTimeout);
    falaTimeout = window.setTimeout(() => {
      fada.classList.remove('fada-falando');
    }, 6000);
  }

  function mensagemDoAlvo(alvo) {
    if (alvo.matches('.whatsapp-btn, .whatsapp-grande')) {
      return 'Sua encomenda está a um toque de distância!';
    }

    if (alvo.matches('.instagram-btn, .instagram-grande')) {
      return 'Venha conhecer mais do nosso cantinho!';
    }

    if (alvo.matches('.tema-toggle')) {
      return 'Você pode mudar as cores do site por aqui.';
    }

    const destino = alvo.getAttribute('href');
    if (destino === '#sabores' || alvo.closest('.card-sabor')) {
      return 'Toque em um potinho para descobrir mais!';
    }
    if (destino === '#tamanhos' || alvo.closest('.tamanho-card')) {
      return 'Vamos encontrar o tamanho ideal para você!';
    }
    if (destino === '#contato') {
      return 'Prontinha para ajudar com sua encomenda!';
    }

    return falasFada[indiceFala++ % falasFada.length];
  }

  function posicionarFada(alvo) {
    if (!alvo || !alvo.isConnected) return;

    const caixaAlvo = alvo.getBoundingClientRect();
    if (caixaAlvo.width === 0 || caixaAlvo.height === 0) return;

    const largura = fada.offsetWidth;
    const altura = fada.offsetHeight;
    const margem = 10;
    let esquerda = caixaAlvo.left - largura - 12;
    if (esquerda < margem) esquerda = caixaAlvo.right + 12;

    esquerda = Math.max(margem, Math.min(esquerda, window.innerWidth - largura - margem));
    const topo = Math.max(58, Math.min(
      caixaAlvo.top + caixaAlvo.height / 2 - altura / 2,
      window.innerHeight - altura - margem
    ));

    fada.style.left = `${esquerda}px`;
    fada.style.top = `${topo}px`;
    fada.classList.toggle('fada-voando', !movimentoReduzido.matches);
  }

  function buscarAlvoVisivel() {
    const referencia = window.innerHeight * 0.56;
    const candidatos = document.querySelectorAll(
      '.navegacao a, .hero-acoes a, .hero-rolagem, .card-resumo, .card-detalhes a, ' +
      '.tamanho-card > a, .sobre-conteudo a, .contato-links a, .whatsapp-btn, .instagram-btn'
    );
    let maisProximo = null;
    let menorDistancia = Infinity;

    candidatos.forEach(candidato => {
      const caixa = candidato.getBoundingClientRect();
      if (caixa.width === 0 || caixa.height === 0 || caixa.bottom < 0 || caixa.top > window.innerHeight) return;

      const distancia = Math.abs(caixa.top + caixa.height / 2 - referencia);
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisProximo = candidato;
      }
    });

    return maisProximo;
  }

  function atualizarFada() {
    framePendente = false;
    alvoFada = buscarAlvoVisivel();
    if (alvoFada) posicionarFada(alvoFada);
  }

  function agendarAtualizacaoFada() {
    if (framePendente) return;
    framePendente = true;
    window.requestAnimationFrame(atualizarFada);
  }

  function seguirAlvoFada(alvo, falar) {
    if (!alvo || fada.contains(alvo)) return;
    alvoFada = alvo;
    posicionarFada(alvo);

    const agora = Date.now();
    if (falar && agora - ultimaFala > 7000) {
      mostrarFalaFada(mensagemDoAlvo(alvo));
      ultimaFala = agora;
    }
  }

  document.addEventListener('pointerover', evento => {
    const alvo = evento.target.closest('a[href], button, summary');
    if (alvo && !fada.contains(alvo)) seguirAlvoFada(alvo, true);
  });

  document.addEventListener('focusin', evento => {
    const alvo = evento.target.closest('a[href], button, summary');
    if (alvo && !fada.contains(alvo)) seguirAlvoFada(alvo, true);
  });

  fadaBotao.addEventListener('click', () => {
    mostrarFalaFada(falasFada[indiceFala++ % falasFada.length]);
  });

  window.addEventListener('scroll', agendarAtualizacaoFada, { passive: true });
  window.addEventListener('resize', agendarAtualizacaoFada);
  movimentoReduzido.addEventListener('change', agendarAtualizacaoFada);
  agendarAtualizacaoFada();

  /* Smooth scroll para links internos, respeitando redução de movimento. */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* Uma carta aberta por vez mantém a descoberta leve e organizada. */
  document.querySelectorAll('.card-sabor').forEach(card => {
    card.addEventListener('toggle', () => {
      if (!card.open) return;

      document.querySelectorAll('.card-sabor[open]').forEach(otherCard => {
        if (otherCard !== card) otherCard.open = false;
      });
    });
  });

  /* ---------------------------------------------------------
     5. Log amigável no console
     --------------------------------------------------------- */
  console.log(
    '%cDoces Momentos %c— cartas de sabores prontas para descobrir!',
    'background: #d46b6b; color: white; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold;',
    'background: #fde3e3; color: #4a2e2e; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );

})();