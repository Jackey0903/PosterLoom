document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const dialog = document.querySelector('.image-dialog');
  const dialogImage = dialog?.querySelector('img');
  const dialogClose = dialog?.querySelector('.dialog-close');

  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.innerHTML = isOpen
      ? '<i class="fas fa-times" aria-hidden="true"></i>'
      : '<i class="fas fa-bars" aria-hidden="true"></i>';
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      if (navToggle) navToggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
  });

  document.querySelectorAll('.image-zoom').forEach((button) => {
    button.addEventListener('click', () => {
      const source = button.dataset.image;
      if (!dialog || !dialogImage || !source) return;
      dialogImage.src = source;
      dialogImage.alt = button.querySelector('img')?.alt || 'Expanded project figure';
      dialog.showModal();
    });
  });

  const closeDialog = () => dialog?.close();
  dialogClose?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      await navigator.clipboard.writeText(target.innerText);
      const label = button.querySelector('span');
      if (label) label.textContent = 'Copied';
      setTimeout(() => { if (label) label.textContent = 'Copy'; }, 1600);
    });
  });

  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 700);
  }, { passive: true });

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
