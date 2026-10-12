# Curiosity Cabinet redesign

## Scope
Implement the approved ivory, cobalt, botanical and sculptural portfolio concept in the existing static homepage. Preserve all 18 project records, destination URLs, detail dialogs, filters, reading archive, self-hosted fonts and privacy labels. No auth, schema, service worker or hosting changes.

## Acceptance before coding
- Hero has oversized sans typography, original sculptural artwork and clear call to action.
- Asymmetric selected-work gallery features existing One Step illustration and game characters; full-width nature feature.
- All original project links and reading entries remain unchanged.
- Search combines with all eight category filters and announces count/empty state.
- Desktop 1440, tablet 768, mobile 390/320 render without horizontal overflow; keyboard, dialogs and reduced motion work.
- Syntax, local asset/anchor checks, browser interactions and no-JS fallback pass.
- Commit scoped files with changelog/release summary; push feature branch and create PR; inspect CI/preview availability.

## Progress
- [x] Verified .git marker, correct remote and clean checkout; created feature branch.
- [x] Read source and repository README; no repository AGENTS.md or PLANS.md present.
- [x] Implement and optimize original hero artwork.
- [x] Verify responsive visuals, interactions and preservation.
- [ ] Commit, push, PR and deployment checks.

## Decision log
- Keep existing static architecture and self-hosted fonts; add no dependencies.
- Use generated editorial art for the hero; keep real project artwork and accurate One Step example.
- Treat approval of implementation and standing push instructions as authorization for feature-branch publication. Do not merge or change production settings.

## Surprises
- README describes v2.00 and private records as unlinked, while current v2.02 source has 18 linked records. Preserve current source as requested and correct documentation.

## Verification results
- Desktop 1440, tablet 768, phones 390/320: visually checked; no document overflow.
- All eight filters, text search, combined empty state, keyboard Enter, dialog Tab/Escape and focus restoration pass.
- No-JS fixture: 18 projects stay visible, controls hidden, inline project notes visible through native anchors. Temporary fixture removed.
- Node behavior tests pass, including reduced-motion/coarse-pointer suppression and dynamic preference reset.
- Browser console clean. Reading archive opens and is byte-for-byte unchanged.
- A browser preview tab timed out during resizing; a fresh tab recovered and remaining checks passed.
