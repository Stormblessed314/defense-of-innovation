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

Light, open field (#F7FAFC) with a deep-navy hero and footer (#07203C).
Teal is the accent for action and the speed idea (#0E9F8C on light,
#2BE3C8 on dark); soft aurora gradients and a faint dot grid give the
dark bands depth. Space Grotesk for display and UI, Archivo for body,
IBM Plex Mono for prices and small print (all self-hosted woff2).
Signature elements: the drawn speed line under the hero headline, the
army-requisition-vs-fund comparison bars, and the open purchase table.
Generous spacing throughout — the brief after three rejected passes was
"not cramped." Logo mark is a placeholder glyph to be replaced by the
real logo.
