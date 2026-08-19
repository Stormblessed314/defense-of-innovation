# Handoff — Defense of Innovation Fund site

For a fresh Claude Code session running locally on Aryeh's Mac. Read this
first; it holds the project state, the decisions already made, and what's
still open. Aryeh's general working rules live in the Lionheart repo's
CLAUDE.md (writing style section applies to ALL site copy — no AI-sounding
prose, no seesaw aphorisms, no formulaic triads).

## What this is

A donation site for the Defense of Innovation Fund: an independent,
donor-funded initiative that buys small equipment (3D printers, spare
parts, tools — never weapons) for IDF ground-forces units in days instead
of the months a formal requisition takes. Run by Aryeh Lev Mason, named on
the site. Audience: US/UK pro-Israel donors. Not tax-deductible, and the
site says so bluntly and repeatedly — that candor is deliberate.

## Decisions already settled (don't re-ask)

- Multi-page static site, no build step, no backend. Pooled fund, no
  earmarks or per-project campaign bars.
- Money lands in US accounts eventually (Stripe becomes possible then);
  nothing is wired yet. The donate page has a designed payment panel that
  stays inert until `data-payment-url` is set on the `.pay` div in
  `site/donate/index.html` (site.js activates the button automatically).
- Framing: lean into speed-vs-bureaucracy but never hostile to the IDF;
  always "independent, not affiliated"; deliveries coordinated with unit
  leadership.
- Opsec: no unit names, locations, faces, or open equipment gaps anywhere.
- Aryeh is making the logo himself elsewhere. The current SVG glyph
  (dashed slow route + straight turquoise arrow) is a placeholder in the
  header/footer of every page and in `site/favicon.svg`.

## Current state / open items

1. **DESIGN: Aryeh is not satisfied with the current design.** Two passes
   done (startup-dark first, then editorial serif — Newsreader display,
   sticky heading rails). Still not to his standard. Expect a design
   session as the first order of business locally. Reference points he
   gave: aryehlevmason.com (password 613) and kazidefense.com.
2. Payment rail: decide processor once a US account exists; then set
   `data-payment-url`.
3. Real content: his bio (TODO comments in home/about), real example
   purchases with prices, contact email routing for
   contact@defenseofinnovation.com (Cloudflare Email Routing, not set up).
4. Custom domain: bind defenseofinnovation.com + www to the Pages project
   (dashboard: Workers & Pages → defense-of-innovation → Custom domains).
5. The Cloudflare API token used for deploys was pasted into a Claude
   session's chat once — rotate it when convenient.

## Repo layout

```
site/            the whole deployable site (Cloudflare Pages output dir)
  index.html     home
  donate/        donate page + inert payment panel
  about/         about page
  faq/           donor FAQ
  css/site.css   entire design system (tokens at top)
  js/site.js     nav, scroll reveals, payment-panel wiring
  fonts/         self-hosted woff2: Newsreader, Archivo, IBM Plex Mono (OFL)
  _headers       Cloudflare Pages cache/security headers
wrangler.toml    Pages config (project: defense-of-innovation)
.github/workflows/deploy.yml   auto-deploy on push
.claude/skills/  grill-me + grilling interview skills (mattpocock, MIT)
```

## Run locally

```bash
git clone https://github.com/Stormblessed314/defense-of-innovation
cd defense-of-innovation
git checkout claude/defense-innovation-fund-site-ukfwms
python3 -m http.server 8000 --directory site
```

Then open http://localhost:8000. Edit files, refresh the browser — there is
no build step. `npx wrangler pages dev site` gives a preview with Pages
semantics (headers file etc.) if needed.

## Deploy

Every push to `claude/defense-innovation-fund-site-ukfwms` (or `main`)
runs `.github/workflows/deploy.yml`, which deploys `site/` to the
Cloudflare Pages project `defense-of-innovation` using the
`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` repository Actions
secrets. Preview URL: https://defense-of-innovation.pages.dev. Manual
deploy from a machine with the token in the environment:
`npx wrangler pages deploy site --project-name defense-of-innovation`.
