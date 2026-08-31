# Handoff — Defense of Innovation Fund site

For a fresh Claude Code session on Aryeh's Mac. Read this first. Aryeh's
general working rules live in ~/.claude/CLAUDE.md (the writing-style
section applies to ALL site copy). A richer session memory exists at
~/.claude/projects/-Users-aryehlevmason-Claude-Code/memory/defense-of-innovation-site.md.

## What this is

Donation site for the Defense of Innovation Fund: an independent,
donor-funded initiative run by Aryeh Lev Mason that buys small
off-the-shelf equipment (3D printers, ink and filament, spare parts,
tools — never weapons) for a wide variety of Israeli army units, in days
instead of the 8+ weeks a formal requisition takes. Audience: US/UK
pro-Israel donors. Live at https://defense-of-innovation.pages.dev.

## Copy rules (from Aryeh + an external audit he ruled on — binding)

- Not tax-deductible, said plainly and early. Registration as a nonprofit
  is in progress; never claim deductibility before it's real. Don't
  exaggerate the difficulty either (no "years and lawyers" framing).
- Timelines: army baseline is "8+ weeks", never 16+. The fund's side is
  "days, not weeks" — never promise 6 days or same-week delivery.
- Reporting ceiling: receipts/records kept, costs published, "we share
  what we can about where the money went." Never promise a per-purchase
  public ledger or itemized prices — including in meta tags.
- No claims of existing track record (fund is new; figures are planned/
  representative ranges).
- The fund serves a WIDE range of units (combat, recon, workshops —
  "we serve where we can"). Never box it into technical/repair units;
  never say "adapting commercial gear" (barely a thing).
- Everything IS formally requested in the army — never say small items
  aren't worth a formal request; the slow formal path is the whole pitch.
- Structure facts on the site: dedicated bank account; unspent funds
  default to another nonprofit supporting Israeli soldiers at wind-down;
  advisors may be named but never tied to specific units.
- Opsec: no unit names, base locations, identities, faces, or open gaps.
- Known legal context (verified): IDF Order 33.0112 bars soldiers from
  receiving donations for a unit outside the Order 35.0813 process;
  approval sits at Personnel Directorate level. The site deliberately
  avoids claiming commander sign-off is legally sufficient. Payments stay
  off until Aryeh resolves structure/authorization with counsel.

## Design (pass 4, iterated — he approves the direction)

Light blue field (#EFF5FA, bands to ~#D8E9F3) with deep-navy hero/footer
(#07203C), cyan accent (#43CFF2 dark / #0989AE light / #086482 text on
light — the darker value passes contrast), aurora gradients, dot grids,
rings, route line-art. Space Grotesk display, Archivo body, Plex Mono
figures, Playfair Display for the wordmark only (all self-hosted woff2 in
site/fonts/). Signature motif: the route — dashed requisition maze vs
clean gradient arc (hero graphic, subpage-header arcs, section line-art,
steps rail). He WANTS the site polished and layered ("compensating" is
the point) — do not strip ornament. Site works without JavaScript
(reveals gated behind html.js). ?all query param forces all reveals
(used for screenshot checks).

## Logo — DECISION PENDING

His mark: a Didone serif "I" stem + blue crescent bowl reading as "D"
(original raster only ever existed in a chat; the site uses an SVG vector
recreation). He found the Playfair "I" boring; five stem variants await
his pick in `branding/`: A playfair-600 (live), B bodoni-700, C abril,
D cinzel-700, E fraunces-900 (each with an -onnavy variant).

To apply a choice: copy branding/logo-<pick>.svg → site/logo.svg and
site/favicon.svg; branding/logo-<pick>-onnavy.svg → site/logo-mark.svg;
regenerate site/og.png (a 1200×630 navy card — script pattern in the
memory file; render with headless Brave). If the pick isn't Playfair,
consider re-setting the wordmark (.wm-text in site/css/site.css) in the
matching family — download the woff2 into site/fonts/ (all candidates are
OFL on Google Fonts; grab the URL from fonts.googleapis.com/css2 with a
browser User-Agent, take the U+0000-00FF subset).

## Repo layout

```
site/            deployable static site (Cloudflare Pages output dir)
  index.html     home; donate/ about/ faq/ subpages
  css/site.css   whole design system (tokens at top)
  js/site.js     nav, reveals (?all bypass), donate-panel wiring
  fonts/         self-hosted woff2 (Space Grotesk, Playfair, Archivo, Plex Mono)
  logo.svg / logo-mark.svg / favicon.svg / og.png
branding/        logo stem variants A–E awaiting Aryeh's pick
wrangler.toml    Pages config (project: defense-of-innovation)
.github/workflows/deploy.yml   auto-deploy on push
```

## Run, verify, deploy

```bash
cd ~/defense-of-innovation && python3 -m http.server 8213 --directory site
```

Visual verification: the in-app Browser pane can go blank when hidden —
use headless Brave via playwright-python instead
(`chromium.launch(executable_path="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser")`),
venv with playwright+fonttools+brotli lives in the session scratchpad
(rebuild if gone). Run the style linter on any copy change:
`~/.claude/skills/style-lint/scripts/style-lint.sh site/*.html site/*/index.html`

Deploy: push to `claude/defense-innovation-fund-site-ukfwms` (or main) —
GitHub Actions deploys site/ to Cloudflare Pages automatically. Verify
with `gh run list --limit 1` and a curl of the live URL.

## Open items

1. Logo pick from branding/ (above), then wordmark font to match.
2. Aryeh's real bio — TODO comments in home + about.
3. Payment rail: when a processor exists, set data-payment-url on .pay in
   site/donate/index.html (site.js enables the button automatically).
   BLOCKED on legal/structure questions per the audit — his call.
4. Custom domain: bind defenseofinnovation.com + www in the Cloudflare
   dashboard (Workers & Pages → defense-of-innovation → Custom domains),
   then update the canonical/OG URLs in all four HTML heads.
5. Contact email routing for contact@defenseofinnovation.com
   (Cloudflare Email Routing, not set up).
6. Rotate the Cloudflare API token once convenient (it was pasted into a
   Claude session's chat long ago).
