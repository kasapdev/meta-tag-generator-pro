# Meta Tag Generator Pro

[![CI](https://github.com/kasapdev/meta-tag-generator-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/kasapdev/meta-tag-generator-pro/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) ![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-F7DF1E?logo=javascript&logoColor=black)

Build and preview Open Graph, Twitter Card and SEO meta tags with live Google, X and link-preview mockups.

> A premium, zero-dependency SEO workbench. Fill in a title, description and a few links, and instantly see exactly how the page will look in a Google search result, an X (Twitter) card, and a generic Discord/Slack/iMessage link preview — then copy a ready-to-paste `<head>` snippet, all in your browser, with nothing ever leaving your machine.

## Overview

Meta Tag Generator Pro is part of the **Web Utility Suite**. It runs entirely in the browser with no build step, no frameworks, and no network calls — open `index.html` from disk and it works. Every field you type into updates three realistic preview mockups and a generated meta tag snippet simultaneously, so you can see exactly how a shared link will render before it ever goes live.

## Features

- **Google search result mockup** — favicon + site name row, a brand-colored title link, a real breadcrumb-style URL (parsed from your canonical URL with `new URL()` and rendered as `domain › path › segments`), and a description snippet, all truncated with real-world visual truncation logic (word-boundary aware ellipsis) rather than plain CSS clipping.
- **X / Twitter card mockup** — switches between the two real X card layouts: `summary_large_image` (full-width image on top) and `summary` (small square thumbnail beside the text), with a bordered, rounded card matching X's actual chrome.
- **Generic link-preview card** — styled after Discord/Slack/iMessage rich-link embeds (accent border, large image, domain/title/description) so it's visually distinct from the X card while covering the same "unfurl" use case.
- **Character-limit aware counters** — live, color-coded (green/amber/red) counters for the page title (~60 char practical limit) and meta description (~160 char practical limit), warning as you approach or exceed each limit.
- **Broken-image handling** — the OG image and favicon both gracefully fall back to a placeholder if the URL is empty or fails to load, so a bad link never wrecks the layout.
- **Full `<head>` snippet generator** — title, meta description, canonical link, `og:title`/`og:description`/`og:image`/`og:url`/`og:type`/`og:site_name`, `twitter:card`/`twitter:title`/`twitter:description`/`twitter:image`, `theme-color`, and favicon `<link>` — all correctly HTML-escaped and one click from your clipboard.
- **Theme color picker** — a synced color-swatch + hex text field, shown live as a chip next to the generated snippet.
- **Load example** — fills every field with a realistic example so the tool is instantly demonstrable.
- **Auto-persist** — your form state is saved to `localStorage` (debounced) and restored on return.
- **Dark & light themes**, fully responsive down to 360px, accessible, and keyboard-driven.

## Installation

No dependencies, no build step.

```bash
git clone https://github.com/kasapdev/meta-tag-generator-pro.git
cd meta-tag-generator-pro
```

Then simply open `index.html` in any modern browser (double-click it, or `file://` it). That's it.

## Usage

1. Fill in the **Page Title**, **Meta Description**, **Site Name**, **Canonical URL**, **OG Image URL** and **Favicon URL** — or click **Load example** to see it working immediately.
2. Choose an **OG Type** (website, article, product, profile, video.other) and a **Twitter Card Type** (summary or summary_large_image) — the X card mockup switches layout instantly.
3. Pick a **Theme Color** with the swatch or by typing a hex value.
4. Watch the three previews — Google search result, X card, and generic link-preview card — update live as you type.
5. Copy the generated `<head>` snippet with the **Copy** button (or <kbd>Ctrl/⌘</kbd>+<kbd>C</kbd>) and paste it into your page's `<head>`.

## Keyboard Shortcuts

| Action                     | Shortcut                       |
| --------------------------- | ------------------------------ |
| Copy generated meta tags    | <kbd>Ctrl/⌘</kbd> + <kbd>C</kbd> |
| Show shortcuts help         | <kbd>?</kbd>                    |
| Close dialog                | <kbd>Esc</kbd>                  |

## Screenshots

> _Screenshots coming soon._

![screenshot](docs/screenshot-1.png)
![screenshot](docs/screenshot-2.png)

## Roadmap

- [ ] JSON-LD structured data generator (Article, Product, Organization schemas)
- [ ] Facebook/LinkedIn-specific `og:image` size and aspect-ratio validation
- [ ] Multi-page presets — save and switch between several pages' worth of tags
- [ ] Import existing meta tags from a pasted URL or HTML snippet
- [ ] Emoji/favicon preview across more platforms (Slack unfurl variants, WhatsApp)

## License

MIT Licensed. Part of the Web Utility Suite.
