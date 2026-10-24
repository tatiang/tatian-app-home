// Exercise the shipped enhancement without a browser dependency.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('node:vm');
const root = resolve(__dirname, '..');
function element(extra = {}) {
  const handlers = {};
  return { hidden: true, textContent: '', value: '', dataset: {},
    classList: { toggle() {} }, setAttribute(name, value) { this[name] = value; },
    addEventListener(name, callback) { handlers[name] = callback; },
    fire(name, event = {}) { handlers[name]?.(event); }, ...extra };
}
function load(motionEnabled) {
  const html = readFileSync(resolve(root, 'index.html'), 'utf8');
  const projects = [...html.matchAll(/<article class="project [^"]*" data-category="([^"]*)">([\s\S]*?)<\/article>/g)]
    .map(m => element({dataset: {category: m[1].replace('&amp;', '&')}, textContent: m[2].replace(/<[^>]*>/g, ' ')}));
  const filters = ['All','Apps','Games','AI & Bots','Photography','Reading','Coding','Storytelling','Bucket List'].map(category => element({dataset:{filter:category}}));
  const search = element(), count = element(), empty = element(), searchWrap = element(), filterbar = element();
  const hero = element({ getBoundingClientRect: () => ({left:0,top:0,width:100,height:100}) });
  const art = element({style:{removeProperty(name){delete this[name];}}});
  const media = element({matches:motionEnabled});
  let scheduled = 0, cancelled = 0;
  const context = {
    document: {
      querySelectorAll: selector => selector === '[data-filter]' ? filters : projects,
      querySelector: selector => ({'.filterbar':filterbar,'.empty-state':empty,'.search-wrap':searchWrap,'.hero':hero,'.hero-art':art})[selector],
      getElementById: id => ({'project-search':search,count,year:element()})[id],
    },
    matchMedia: () => media,
    requestAnimationFrame: callback => { scheduled++; callback(); return scheduled; },
    cancelAnimationFrame: () => { cancelled++; },
  };
  vm.runInNewContext(readFileSync(resolve(root,'app_v3.00.js'),'utf8'),context);
  return {projects,filters,search,count,empty,searchWrap,hero,art,media,get scheduled(){return scheduled;},get cancelled(){return cancelled;}};
}
test('category and search combine, clear and announce empty results', () => {
  const page = load(false);
  assert.equal(page.count.textContent, '20 projects');
  assert.equal(page.searchWrap.hidden, false);
  page.search.value = 'ROBOT'; page.search.fire('input');
  assert.equal(page.count.textContent,'2 projects');
  page.filters.find(x=>x.dataset.filter==='Reading').fire('click');
  assert.equal(page.count.textContent,'0 projects'); assert.equal(page.empty.hidden,false);
  page.search.value=''; page.search.fire('input');
  assert.equal(page.count.textContent,'1 project'); assert.equal(page.empty.hidden,true);
  page.filters[0].fire('click'); assert.equal(page.count.textContent,'20 projects');
});
test('reduced motion and coarse pointers never schedule motion', () => {
  const page = load(false);
  page.hero.fire('pointermove',{clientX:90,clientY:10});
  assert.equal(page.scheduled,0); assert.equal(page.art.style.transform,undefined);
});
test('pointer motion is bounded and resets when the preference changes', () => {
  const page = load(true);
  page.hero.fire('pointermove',{clientX:100,clientY:0});
  assert.equal(page.art.style.transform,'translate3d(6px, -4px, 0)');
  page.media.matches=false; page.media.fire('change');
  assert.equal(page.art.style.transform,undefined);
  const before=page.scheduled;
  page.hero.fire('pointermove',{clientX:0,clientY:100});
  assert.equal(page.scheduled,before);
});

test('Storytelling category finds the new index and combines with search', () => {
  const page = load(false);
  page.filters.find(x=>x.dataset.filter==='Storytelling').fire('click');
  assert.equal(page.count.textContent,'1 project');
  assert.equal(page.projects.filter(x=>!x.hidden)[0].dataset.category,'Storytelling');
  page.search.value='robot'; page.search.fire('input');
  assert.equal(page.count.textContent,'0 projects');
});

test('private meal planner appears in Apps and search', () => {
 const page=load(false);
 page.search.value='Hope';page.search.fire('input');
 page.filters.find(x=>x.dataset.filter==='Apps').fire('click');
 assert.equal(page.count.textContent,'1 project');
 assert.equal(page.projects.filter(x=>!x.hidden)[0].dataset.category,'Apps');
});
