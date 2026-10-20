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