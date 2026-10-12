# Tatian.app — editorial portfolio v2.00

An editorial redesign of the existing static personal site. No framework, build step, analytics, remote fonts, or new service dependencies.

## Run and review

Open `index.html` directly, or serve this folder with any static server. For example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Review at 1440px, 768px, 390px, and 320px. The project category filters and reading archive filters are keyboard accessible. Reduced-motion preferences are respected.

## Source

- `index.html`: homepage; all 16 existing projects retained.
- `style_v2.00.css`: responsive editorial layout and restrained hover motion.
- `app_v2.00.js`: progressively enhanced category filters, count, and year.
- `nature-reads.html`: existing 10-entry reading collection, with content and article links retained.
- `reading_v2.00.css`: complementary typography and layout for the archive.
- `assets/`: locally served artwork, fonts, and license notices.

The HTML entry points retain their original names to preserve routes. Both carry the internal version `2.00`.

## Privacy and links

All six public project destinations are retained. The three private projects (Family trip, Ride SMART, and Bay Area Settlement Atlas) remain visible as non-clickable descriptions, following the supplied redesign prototype. Their destination URLs and family details are not included in the new homepage. No destination authentication or access settings have been modified.

The existing placeholder project “Manual Uploads” is presented as “Photo Galleries,” with its previous name in the description. “multicolor-bitsy” is presented as “Multicolor Bitsy.” No new public destination was inferred for an unpublished project.

The linked game now uses “Shards of the Unknown” internally. The portfolio retains its existing “Depths of the Unknown” label and URL, with an updated description and actual character art from the game.

## Assets

The One Step icon is from the user's `onestep.tatian.app` site. The elementalist, slime, and black widow are from the user's `depths.tatian.app` site. Locally optimized WebP copies are used. The task slip is an illustrative app view based on the example on the actual One Step landing page; it is not a screenshot. The reading cover is an original SVG/CSS illustration, not a photograph attributed to Tatian.

Fraunces, DM Sans, and DM Mono are self-hosted; their SIL Open Font License notices are in `assets/licenses/`.

## Verification and remaining gate

Completed:
- JavaScript syntax and CSS parsing.
- All 8 category filters, selected states, and project counts.
- All 16 project records; 3 private records have no links.
- Public project links, external-link safety, local assets and internal anchors.
- All 10 reading entries and their article links unchanged; archive filters checked.
- Narrow-screen headline sizing refined using the actual font metrics.

**Not completed:** actual desktop/mobile browser rendering, hover/focus visual inspection, and local HTTP smoke testing. The managed preview server failed before startup with a container mount permission error. The browser separately disallowed local file URLs. These are environment limitations, not passing visual QA.

This branch has not been pushed, merged, or deployed. Approval and successful browser review are still required before deployment. Do not push to a deployment-connected branch before approval.
