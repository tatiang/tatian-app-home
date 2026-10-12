# Adding written stories and videos

The public index is `storytelling.html`. Keep the page's editorial layout; no build step is needed.

## PDFs
Place the final PDF in this folder using a lowercase hyphenated filename. In `storytelling.html`, replace the `stories-empty` paragraph inside `.written-stories` with a real entry (repeat the article for later stories):

```html
<article class="written-story">
  <h3>Actual story title</h3>
  <p>A short description of this story.</p>
  <a class="text-link" href="stories/your-story.pdf">Read the story (PDF)</a>
</article>
```

Replace the sample filename/title before publishing. Link PDFs directly so readers can use their browser's reader and download controls. Use selectable text and a meaningful document title in the PDF. Do not add empty files or links to PDFs not yet uploaded.

## Videos
Copy the existing `.story-video` article in the `on-stage` section. Give its heading a unique ID and update `aria-labelledby`. Replace the video ID in both the privacy-enhanced iframe URL and direct YouTube link; update the iframe title, visible title and caption. Keep `loading="lazy"`, `allowfullscreen` and the direct link in case embedding is unavailable. A link-only story can omit `.video-frame` and retain the caption and YouTube link.

Run `python3 tests/verify_site.py` and check the page on phone and desktop before publishing.
