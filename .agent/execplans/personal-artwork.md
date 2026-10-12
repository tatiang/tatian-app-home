# Personal artwork

## Scope and acceptance
Replace the seven app-card thumbnails that repeat the blue loop graphic with custom, project-specific imagery (Anchor, Neurolist, Umami, Nature Sounds TY, Bay Area Settlement Atlas, Ride SMART, Family trip). Redesign the main hero to reflect poetry, macro flower photography, stage storytelling, soccer/coaching, mindfulness, Balinese culture and maker/teaching/coding interests.

Preserve the established ivory/cobalt editorial style, all 18 project records, destinations, privacy labels, filters and dialogs. Artwork is illustrative, not app screenshots or claimed personal photographs. Keep original assets intact; use versioned optimized WebP assets. No new dependencies or service changes.

Acceptance: distinct imagery for all seven affected cards; personal hero legible without obscuring headline; desktop/tablet/phone layout and asset budgets; existing preservation/behavior/export tests pass; asset references valid; reviewable PR with successful Cloudflare preview. No production merge without approval.

## Progress
- [x] Verify repo marker, remote, clean tree; branch from latest origin/main.
- [x] Generate and inspect hero plus seven distinct project images.
- [x] Integrate optimized assets and responsive styling.
- [x] Test layouts, functionality and content preservation.
- [ ] Commit, push, PR and successful preview.

## Decisions
- Replace only cards using the screenshot's blue loop image; keep already relevant project imagery.
- Express Balinese interests through a respectful still-life detail of woven palm, flowers and bronze sound-making objects, rather than invented depictions of ritual or healing claims.
- Preserve project text byte-for-byte and use CSS imagery for decorative card art.

## Surprises
None.

## Verification
Preservation, 3 behavior tests, portable verification and JS syntax pass. Desktop 1440, tablet 768, phone 390/320 inspected; no overflow. Combined Apps/Nature Sounds search returns one card; dialog Escape returns focus. All new assets below 130 KB, below the 300 KB per-image budget.
