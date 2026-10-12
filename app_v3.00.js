/* Tatian.app v3.00 — progressive enhancement; content and links work without JS. */
(() => {
  'use strict';
  const filters = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project[data-category]')];
  const count = document.getElementById('count');
  const filterbar = document.querySelector('.filterbar');
  const search = document.getElementById('project-search');
  const empty = document.querySelector('.empty-state');
  let selectedCategory = 'All';
  function applyFilter(category) {
    selectedCategory = category;
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const project of projects) {
      project.hidden = (category !== 'All' && project.dataset.category !== category) || !project.textContent.toLocaleLowerCase().includes(query);
      if (!project.hidden) visible++;
    }
    for (const filter of filters) {
      const active = filter.dataset.filter === category;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    }
    empty.hidden = visible > 0;
    count.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
  }
  filters.forEach(filter => filter.addEventListener('click', () => applyFilter(filter.dataset.filter)));
  search.addEventListener('input', () => applyFilter(selectedCategory));
  document.querySelector('.search-wrap').hidden = false;
  filterbar.hidden = false;
  applyFilter('All');
  document.getElementById('year').textContent = new Date().getFullYear();
})();

/* Progressive detail views: native links still reach inline notes without JS. */
(() => {
  'use strict';
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'project-dialog';
  dialog.setAttribute('aria-labelledby', 'dialog-project-title');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'detail-close';
  close.textContent = 'Close ✕';
  close.autofocus = true;
  const content = document.createElement('div');
  dialog.append(close, content);
  document.body.append(dialog);
  let opener;
  document.querySelectorAll('[data-project-detail]').forEach(link => {
    link.addEventListener('click', event => {
      // Preserve open-in-new-tab, copy-link, and other native link behavior.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const source = document.getElementById(link.dataset.projectDetail);
      if (!source) return;
      content.replaceChildren(...[...source.children].filter(node => !node.matches('a')).map(node => node.cloneNode(true)));
      content.querySelector('h2').id = 'dialog-project-title';
      opener = link;
      dialog.showModal();
      event.preventDefault();
      document.body.classList.add('detail-open');
    });
  });
  close.addEventListener('click', () => dialog.close());
  // Keep Tab on the sole control instead of cycling through browser chrome.
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      close.focus();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('detail-open');
    if (opener?.isConnected && !opener.closest('[hidden]')) opener.focus({ preventScroll: true });
  });
  const outside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  };
  let beganOutside = false;
  dialog.addEventListener('pointerdown', event => { beganOutside = outside(event); });
  dialog.addEventListener('click', event => {
    if (beganOutside && outside(event)) dialog.close();
    beganOutside = false;
  });
})();

/* Pointer enhancement never blocks content; touch and reduced motion stay still. */
(() => {
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  const enabled = matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
  let frame;
  const reset = () => {
    cancelAnimationFrame(frame);
    art.style.removeProperty('transform');
  };
  hero.addEventListener('pointermove', event => {
    if (!enabled.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = hero.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      art.style.transform = `translate3d(${x * 12}px, ${y * 8}px, 0)`;
    });
  });
  hero.addEventListener('pointerleave', reset);
  enabled.addEventListener('change', reset);
})();
