# Tatian.app — Curiosity Cabinet v3.00

A static personal portfolio with a sculptural cobalt hero, ivory editorial typography, an asymmetric project gallery, and a searchable collection. No framework, package installation, build step, analytics, remote fonts, or new service dependencies.

## Run and verify

```sh
python3 -m http.server 8765 --bind 127.0.0.1
node --check app_v3.00.js
node --test tests/behavior.test.cjs
python3 tests/verify_site.py
git diff --check
```

Open http://127.0.0.1:8765. Inspect at 1440px, 768px, 390px and 320px. Click “Follow the curiosity” to reach selected work. In “The collection,” search `robot` to see mBot VR and Mission Control. Choose Reading with that query to see the empty state. Clear the query to see Saturday Nature Reads. Choose All to restore 18 projects. Open Nature Sounds TY and press Escape; focus returns to its link. Tab/Enter can operate all filters and links.

## Source

- `index.html`: homepage; all 18 original project records and destinations retained.
- `style_v3.00.css`: new responsive design over the unchanged `style_v2.02.css` foundation.
- `app_v3.00.js`: category + text filtering, count, existing project dialogs, year and optional pointer motion.
- `nature-reads.html`, `reading_v2.00.css`: unchanged 10-entry reading archive and filters.
- `assets/`: self-hosted fonts, existing app/game assets and optimized generated editorial art. Prompts and provenance are in `assets/README.md`.
- `tests/verify_site.py`: compares project records and reading archive with `origin/main`; validates anchors, IDs, assets, link safety and image budgets. Intended as a redesign preservation check against the pre-merge baseline.
- `tests/behavior.test.cjs`: dependency-free tests of the shipped search/filter and motion enhancement.

## Accessibility and performance

Content and links are usable before JavaScript runs. Search and filters are revealed only when ready. Project details fall back to native hash-linked notes. The hero entrance and pointer movement respect reduced-motion preferences; touch/coarse pointers receive no pointer animation. Dialog keyboard handling and focus return are preserved. Images declare dimensions; the hero uses a responsive 800px/1440px source, and secondary art is lazy loaded. The three new WebP files total approximately 310 KB; a phone normally requests the smaller hero instead of both hero variants.

## Preservation and privacy

The three existing private project links and their privacy/sign-in labels remain as they were in v2.02. No access settings, authentication, secrets, Firestore collections/fields, service workers, or hosting configuration changed. Project index descriptions and detail notes are preserved byte-for-byte. Public app/game destinations are unchanged. The reading archive's content and article links are unchanged.

The One Step phone is a labeled illustrative view of the existing “Put the grey jacket on the back seat” action, not an app screenshot. Existing game character artwork is reused. Generated hero and fern art are decorative and are not presented as Tatian's photography.

## Validation and release

Local checks passed: JavaScript syntax, three behavior tests, preservation/static checks, desktop/tablet/phone browser inspection, eight category filters, combined search/empty results, keyboard dialog behavior, no-JS fallback and clean browser console. Reduced-motion logic is covered by behavior tests and CSS source review; OS preference switching was not browser-emulated.

Changes are prepared on a feature branch for pull-request review. Production deployment is not implied by a successful local preview or push. No deployment workflow is added by this redesign.
