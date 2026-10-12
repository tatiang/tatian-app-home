# Collection gallery

## Intent and acceptance
Replace the utilitarian project rows with a visual cabinet of cards that shares the hero's ivory, cobalt, botanical and sculptural language. Preserve all project markup, links, private labels, dialogs, search/filter behavior and reading archive. Use lightweight decorative vector artwork and existing images, no dependencies.

Before completion: verify three/two/one-column layouts at desktop/tablet/mobile, no overflow at 320px, category filtering and search reflow without gaps, keyboard focus and detail dialogs, all existing preservation/behavior checks. Commit and push a feature branch, create PR, wait for preview. Production merge is separate.

## Progress
- [x] Verify correct remote, clean tree, and fresh branch from origin/main.
- [x] Implement illustrated cards and integrated filter/search controls.
- [x] Verify responsive layout and existing behavior.
- [ ] Commit, push, PR and successful preview.

## Decisions
- Keep project content markup byte-for-byte; decorative art comes from CSS pseudo-elements and small category SVGs.
- Keep every category label visible; graphics supplement rather than replace text.

## Surprises
SVG view fragments rendered as the full sheet in the preview browser; use separate compact SVG files for dependable image rendering.

## Verification
- 1440/768/390/320 browser layouts pass without horizontal overflow.
- All eight filter counts match; search + filter empty state and grid reflow pass.
- Tab focus is visible; Enter filters; Escape closes details and restores card focus.
- Privacy labels preserved; browser console has no warnings/errors.
- Existing preservation, behavior and source-export tests pass. SVG XML and CSS asset references checked.
