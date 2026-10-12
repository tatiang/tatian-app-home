# Storytelling index

## Scope
Add a Storytelling category and nineteenth collection card linking to a dedicated page. Include the supplied Yosemite Backpacking video using its verified public title, an embedded player and direct YouTube fallback. Provide a truthful empty written-story section and documented HTML template for future PDFs. Preserve the original 18 records, reading archive and hero, including the user's decision not to add cooking to the hero.

## Acceptance
Original records preserved; 19 total and Storytelling filter works; video link and accessible responsive iframe present; no broken PDF placeholders; future additions documented; responsive and keyboard checks pass; successful preview PR. No auth, schema, dependencies or hosting changes.

## Progress
- [x] Verify repo and merge approved PR #7 (ec895ef).
- [x] Verify supplied video title via YouTube oEmbed.
- [x] Build collection entry and story page.
- [x] Verify preservation, category behavior, links and layouts.
- [ ] Commit, push and create preview PR.

## Decisions
Use direct HTML content for this static site's small collection, avoiding a CMS or dependency. PDFs will be linked when supplied; do not invent titles or publish placeholder documents.

## Verification results
Original 18 records and archive preserved; 19 total. Four behavior tests and portable-source check pass. Inspected at 1440/768/390/320px without overflow. Storytelling filter returns one card and opens the page; embedded YouTube playback verified visually. Direct fallback link remains visible.
