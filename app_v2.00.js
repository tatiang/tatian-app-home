/* Tatian.app v2.00 — progressive enhancement; content and links work without JS. */
(() => {
  'use strict';
  const filters = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('.project[data-category]')];
  const count = document.getElementById('count');
  const filterbar = document.querySelector('.filterbar');
  function applyFilter(category) {
    let visible = 0;
    for (const project of projects) {
      project.hidden = category !== 'All' && project.dataset.category !== category;
      if (!project.hidden) visible++;
    }
    for (const filter of filters) {
      const active = filter.dataset.filter === category;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    }
    count.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
  }
  filters.forEach(filter => filter.addEventListener('click', () => applyFilter(filter.dataset.filter)));
  filterbar.hidden = false;
  applyFilter('All');
  document.getElementById('year').textContent = new Date().getFullYear();
})();
