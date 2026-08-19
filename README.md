# Defense of Innovation Fund — defenseofinnovation.com

Static multi-page site for the Defense of Innovation Fund: a donor-funded
initiative that makes small, fast equipment purchases for IDF ground-forces
units.

## Layout

```
site/            deployable static site (Cloudflare Pages output dir)
  index.html     home: hero, the gap, the model, what money buys, straight answers, who
  donate/        pooled-fund donate page (payment link not yet wired — see below)
  about/         mission, structure, opsec policy
  faq/           blunt donor FAQ
  css/site.css   whole design system (tokens at the top)
  js/site.js     nav, scroll reveals, donate button wiring
  fonts/         self-hosted woff2 (Archivo, IBM Plex Mono, Newsreader — OFL)
wrangler.toml    Cloudflare Pages config
```

No build step. Edit HTML/CSS, deploy the `site/` directory as-is.

## Deploy

```
npx wrangler pages deploy site --project-name defense-of-innovation
```

Needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment.
A GitHub Actions workflow (`.github/workflows/deploy.yml`) does the same on
push once those two values are added as repository Actions secrets.

## Wiring the payment link

When the payment processor is ready, put the hosted payment URL in
`site/donate/index.html` on the `data-payment-url` attribute of the donate
panel. The GIVE button activates automatically; while the attribute is empty
the page shows the "email us to give" interim block instead.

## Design system in one paragraph

One continuous dark ink-navy field (#0A1322) with a fixed blueprint grid,
film grain, and slow drifting glows for depth. Turquoise (#2EE0C3) is
reserved for the fast-path idea and calls to action; brass (#C29E63) marks
the ledger and money; slate blues carry bureaucracy and secondary text.
Archivo for display and UI, IBM Plex Mono for eyebrows/data/legal,
Newsreader italic for pull quotes and ghost numerals. Signature elements:
the animated donor-to-unit routes scene in the hero, the two-clocks
comparison bars, and the receipt-style purchase ledger. Logo mark is a
placeholder glyph (dashed slow route behind a straight turquoise arrow) to
be replaced by the real logo.
