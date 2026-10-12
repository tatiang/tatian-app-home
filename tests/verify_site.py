"""Dependency-free checks for portfolio preservation and static delivery."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
from hashlib import sha256

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

baseline = json.loads((ROOT/'tests/preservation-baseline.json').read_text())
source = (ROOT/'index.html').read_text()
new = Page(source)
assert len(new.projects) == baseline['project_count']
assert [link['href'] for link in new.projects] == baseline['project_links'], 'Project destinations changed'
assert new.categories == baseline['categories']
# Freeze descriptions and details as well as URLs, without requiring Git history.
for section in baseline['sections']:
    start, end = section['start'], section['end']
    content = source[source.index(start):source.index(end, source.index(start))]
    content = content.replace('    <p class="empty-state" hidden>No projects match. Try another search or category.</p>\n', '')
    assert sha256(content.encode()).hexdigest() == section['sha256'], 'Preserved project content changed'
for name in ['index.html','nature-reads.html']:
    page=Page((ROOT/name).read_text())
    assert len(page.ids)==len(set(page.ids)), f'Duplicate IDs in {name}'
    for link in page.links:
        href=link.get('href','')
        if href.startswith('#'): assert href[1:] in page.ids, href
        if link.get('target')=='_blank': assert {'noopener','noreferrer'} <= set(link.get('rel','').split())
    for asset in page.assets:
        if not urlsplit(asset).scheme: assert (ROOT/asset).is_file(), asset
assert sha256((ROOT/'nature-reads.html').read_bytes()).hexdigest() == baseline['reading_sha256']
for asset in ['curiosity-cabinet.webp','curiosity-cabinet-small.webp','fern-study.webp']:
    assert (ROOT/'assets'/asset).stat().st_size < 300_000, asset
print('PASS: 18 project records/links/details preserved; reading archive unchanged; local assets, anchors, IDs, external-link safety and image budgets valid.')
