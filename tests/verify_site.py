"""Dependency-free checks for portfolio preservation and static delivery."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import subprocess

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids=[]; self.links=[]; self.assets=[]; self.projects=[]; self.categories=[]
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='a':
            self.links.append(a)
            if 'project-line' in a.get('class','').split(): self.projects.append(a)
        if 'data-category' in a: self.categories.append(a['data-category'])
        if tag in ('img','script') and a.get('src'): self.assets.append(a['src'])
        if tag=='link' and a.get('href'): self.assets.append(a['href'])

base = subprocess.check_output(['git','show','origin/main:index.html'],cwd=ROOT,text=True)
old=Page(base); new=Page((ROOT/'index.html').read_text())
assert len(new.projects)==18
assert new.projects==old.projects, 'Project records or destinations changed'
assert new.categories==old.categories
# Preserve complete project descriptions and details, not merely their URLs.
for start,end in [('<div class="project-list"','<p class="index-note"'),('<div class="project-details wrap">','</main>')]:
    old_section=base[base.index(start):base.index(end,base.index(start))]
    new_source=(ROOT/'index.html').read_text()
    new_section=new_source[new_source.index(start):new_source.index(end,new_source.index(start))]
    if start.startswith('<div class="project-list"'):
        new_section=new_section.replace('    <p class="empty-state" hidden>No projects match. Try another search or category.</p>\n','')
    assert new_section==old_section
for name in ['index.html','nature-reads.html']:
    page=Page((ROOT/name).read_text())
    assert len(page.ids)==len(set(page.ids)), f'Duplicate IDs in {name}'
    for link in page.links:
        href=link.get('href','')
        if href.startswith('#'): assert href[1:] in page.ids, href
        if link.get('target')=='_blank': assert {'noopener','noreferrer'} <= set(link.get('rel','').split())
    for asset in page.assets:
        if not urlsplit(asset).scheme: assert (ROOT/asset).is_file(), asset
assert (ROOT/'nature-reads.html').read_bytes()==subprocess.check_output(['git','show','origin/main:nature-reads.html'],cwd=ROOT)
for asset in ['curiosity-cabinet.webp','curiosity-cabinet-small.webp','fern-study.webp']:
    assert (ROOT/'assets'/asset).stat().st_size < 300_000, asset
print('PASS: 18 project records/links/details preserved; reading archive unchanged; local assets, anchors, IDs, external-link safety and image budgets valid.')
