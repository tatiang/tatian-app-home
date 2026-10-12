"""Dependency-free checks for portfolio preservation and static delivery."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import re
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
story_cards = re.findall(r'<article class="project " data-category="Storytelling">.*?</article>\n', source)
assert len(story_cards) == 1
assert Page(story_cards[0]).projects[0]["href"] == "storytelling.html"
preserved_source = source.replace(story_cards[0], "")
new = Page(preserved_source)
assert len(new.projects) == baseline['project_count']
assert [link['href'] for link in new.projects] == baseline['project_links'], 'Project destinations changed'
assert new.categories == baseline['categories']
# Freeze descriptions and details as well as URLs, without requiring Git history.
for section in baseline['sections']:
    start, end = section['start'], section['end']
    content = preserved_source[preserved_source.index(start):preserved_source.index(end, preserved_source.index(start))]
    content = content.replace('    <p class="empty-state" hidden>No projects match. Try another search or category.</p>\n', '')
    assert sha256(content.encode()).hexdigest() == section['sha256'], 'Preserved project content changed'
for name in ['index.html','nature-reads.html','storytelling.html']:
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
story = (ROOT/'storytelling.html').read_text()
assert 'https://www.youtube-nocookie.com/embed/i_mtjWgvwnU' in story
assert 'https://youtu.be/i_mtjWgvwnU' in story
print('PASS: Storytelling page and video verified; 18 project records/links/details preserved; reading archive unchanged; local assets, anchors, IDs, external-link safety and image budgets valid.')
