# Decisions

One line per decision: the date, who asked, what was decided and why. The newest at the top.

- 2026-11-11, Sam (« menu : même endroit partout », 22:40; the three pages as PDF from Figma, 22:41: « placeholder
  images but if you can improve resolution it would be cool »): Home built, with the menu and the footer every page
  shares.
  - The menu sits at columns 7 and 10 on every page (Home's place, as the footer's menu); the Figma had 3 and 6 on News
    and Contact. Its cap tops line up with the symbol's top, one margin down (the footer's sat 22 lower: aligned too).
  - Pictures: figma.com is out of this session's reach, so they come from the PDFs: the hero still (a 793 px
    screenshot) cut to the part the Figma shows (its box overflowed the frame; the cut also hides the player arrows at
    its edges) and enlarged twice (Lanczos, a light sharpening); the six round portraits rendered at their own
    resolution (about 1040 px) from News.pdf. The team on Contact uses the same people. The pixel hand (the Figma's
    cursor) rebuilt on its 25 x 25 grid: public/cursor/hand-38.png and hand-75.png (Retina), the pointer over every
    link and button (project.css).
  - The opening: the still under 30 % black and a fade to the page's black, the wordmark margin to margin at the top
    (under the menu below 1024, where it is too short to hold the links between its letters), « Play » at column 10
    as drawn (static until the films are in), the featured work's row at the foot. Featured work counts six: six
    copies of the Figma's one (Factor, Wieden+Kennedy) in src/data/featured.ts until the real six are in.
  - The directors: a collection (« Directors »), since each will have a page and Home lists them; the Figma's eight
    names (its list repeated three to fill the frame). The filters work on each director's Industries and Location,
    empty for now: a filter other than All shows « No director here yet. » until they are filled in Contenu.
  - The curve above the footer (CurveBand): the Figma's own outlines of ES Build's « u » (exported from the file, not
    redrawn), the ball and, on Home, the CTA inside the « u »'s lower stem (its cap top 1283 down the band), all in the
    Figma's units scaled with the page (--u, one Figma pixel at 1728, main being the container). On a phone the CTA
    comes before the curve, which is too short there to hold it. The band rises 134 behind the last names, as drawn.
    The footer opens with the bottom curve (one for all pages: News and Contact's; Home's sat 61 to the right).
  - Headings wrap as the Figma does (text-wrap: pretty), not balanced: balance broke « filmmakers » off the footer's
    first line.

- 2026-11-11, Sam (« on teste de faire un nouveau site ensemble », from the Figma b3sFmBDWNYeXOydmTL79JU, page
  « curveball »: Home 9:517, News 9:436, Contact 9:355, the type specimen beside them): the Web System first, measured
  from the Figma by script (every text's cap top and baseline from ES Build's metrics, every shape's box), written in
  system/curveball.json and generated into src/styles/base.css by system/gen.py (never edit base.css by hand). The
  style sheet (src/pages/style-sheet.astro, a system page) reads the same file.
  - Grid: 12 columns, margin 32, gutter 12 at 1728 (Sam, 22:11, from the Figma's layout grid); 8 on a tablet, 4 on a
    phone. Named lines in project.css (.site-grid): margin c1, nav c3, two c5, split c6, half c7, three c9, aside c10,
    last c12; the tablet and phone placements are provisional until the components.
  - Scale: Figma values at 1728; from 1728 down to 1024 everything follows the grid (value x width / 1728); tablet
    (1023) and phone (390) values of their own, the tablet's equal to the computer's at 1024 so nothing jumps. Floors
    keep reading text at 16 (main, large), 18 (label) and 12 (small).
  - Type, ES Build (Regular, Medium, Bold), 8 styles: display 210, h1 163, h2 98 and h3 57 in Bold at -3 % (display and
    h1 capitalise each word, as the Figma's Title case: they set names), label 24 Regular (the sections' « Get in
    touch. », « The team », not in the specimen: 4 uses), large 18 Bold, main 18 Medium, small 14 Regular.
    Decided: h3's line height is 0.91 as in its 10 uses (the cards' and blocks' titles); the specimen and the Home CTA
    say 1.05 and follow. Small is set in ES Build: the Figma's Inter is Figma's default font, not the brand's. Main
    keeps the specimen's 0 tracking (the cards' meta lines say -2 %, 0.36 px at 18).
  - Colour: the brand guide's palette (Black, Stone, Red, Mustard, Teal) and the Figma's taupe #a79b8d (the directors'
    names, the CTA, the footer), which the brand guide lacks. One red, the guide's #d6402d (the Figma's big shapes say
    #d44024). Two tones of the text colour, 50 % and 30 % (the Figma's 60 % on Home's « Client » and « Agency » joins
    50 %). Themes: dark (default, black with stone text, taupe as --heading-accent), mustard (News), teal (Contact),
    light (stone), brand (red); the page's own colour, --page-accent, set by .accent-red, .accent-mustard or
    .accent-teal on a page, never reset by a theme: the footer's mark, the ball and the curve take it.
  - Spacing: steps of 8, 12, 16, 20, 24, 32, 40, 48 and 64, sections 112, 144 and 192; one role per relation where the
    Figma varies: a rule to its text 20 (19 to 34 in the Figma), a picture to its text 32 (the team's 18 to 42), a
    card's meta to its title 24, a text to its link 24, a title to its text 40 (48 on Contact), a label to its heading
    48, an inner page's first rule 192 from the top (190).
  - Radius: none but full circles. The dot that marks a row or a hovered title: 20 at 1728, centred on the capitals.
  - The logo (src/assets/logo/): logo.svg is the wordmark, symbol.svg the target, both from the brand guide
    (« Curveball Brand Guidelines », Sep 30) in currentColor. The wordmark measures exactly the Figma's « curveball »
    at the content width (1664 x 315.6).
  - The favicon: the wordmark's own « c » in stone on black (src/assets/logo/mark.svg, brandColor #1e1a21,
    npm run favicon); og-image.jpg is the starter's stand-in until the site has its own picture.
  - To supply: the licensed ES Build. The trial has letters, digits, the comma, the hyphen and the period only: the
    ampersand, the apostrophe, ? @ + © and the arrows show in the system font until then.

- 2026-11-12, Samuel Charpentier (setup): the site is Curveball (op.config.json id `curveball`, SITE_NAME, SITE_LOCALE `en`);
  the Worker's name `curveball` in wrangler.jsonc is kept. Started from scratch, from the Brief. The favicon is the
  initial C on the starter's ink until a logo is added. The description is a stand-in until the Brief says more.

- 2026-10-28, Sam (20:07 and 20:15: Contenu v2, every change a draft): the staging reads what OP publishes;
  OP System's frame sends its draft proof (`x-op-draft`) with each page it asks for, the middleware renders the page
  within it (src/utils/draft.ts, AsyncLocalStorage, `nodejs_als` in wrangler.jsonc) and the loader hands it on to
  OP_CONTENT_URL, its answer kept apart by proof. A request without the proof never sees a draft (checked with
  wrangler dev: three overlapping requests, two proofs and none, each its own answer). Nothing to set on Cloudflare.

- 2026-10-28, Sam (16:58, « je ne veux pas que mes sites soient inondés de collections »): a collection only where a
  CMS is needed: items with a page of their own (a template, the blog's case) or the same items listed on several pages
  and managed as data. Every other list (a section's cards, offers, values, prices, partners, logos) is a block of its
  page, written in the page or in src/data/ and marked for OP System's Modifier (`data-op-list`, `data-op-source` the
  file it is written in, `data-op-item`), where the team and the client duplicate, delete and move its items on the
  canvas, as a Webflow component's slots. CLAUDE.md, Content, says it for every site made from this starter; Sani went
  from 34 collections to 3 the same day.

- 2026-10-27, Sam (23:01, « vas-y », after Amélie Haeck: the « Grille » drew 12, 8 and 4 on a site of 7, the favicon
  and the SEO of the current site lost): `--site-columns` is the grid's only name, declared per screen in base.css
  (4, 8 and 12, Lumos's Grid breakpoints) beside the margin and the gutter; without it site.json's `grid.columns` is
  null (OP System says the site declares no grid), and the build warns on a page grid laid on another variable. A
  redo keeps the current site's icons (op.config.json `"favicon": "site"`, favicon.mjs leaves them), its SEO word for
  word (`seoTitle` on a layout, `seoTitle`, `seoDescription` and `ogImage` written in a collection's schema), its verification metas (`verification`) and
  its addresses (`redirects` written as 301s in dist/_redirects, `addresses` checked at the build).

- 2026-10-27, Sam (« Contenu » wave 1, GO; from the spike `live-staging-spike`, its report in op-system): the staging is
  live. Cloudflare's build of `review` (`WORKERS_CI_BRANCH`, or `OP_LIVE=1`) uses `@astrojs/cloudflare` 14.3.4 (pinned:
  14.4 asks for Astro 7.4; Astro stays 7.3.8 so main's output and Sani's version stay as they are; both move together
  later) and renders every page but the 404 on demand (integrations/op-live.mjs); main and every other branch build
  static, their files byte for byte as before (checked against main: index, 404, CSS, _headers, robots, sitemap).
  Pages read collections through `getItems()`/`getItem()` (src/utils/content.ts): OP's working copy on the staging
  (src/live.config.ts, made from content.config.ts's own `collections`, so a collection the app adds needs no other
  edit), the files elsewhere and whenever OP does not answer in 1.5 s; visible items only, sorted by `order`. Answers
  kept 2 s, read again at once on `?op-v` or `x-op-content-version`; a failure remembered 5 s; a wrong version costs
  one read; an item the schema refuses shows its file. Pictures in OP's storage only from `OP_STORAGE_ORIGINS`, with
  their size so nothing is fetched at render. The staging's pages get the static files' headers (noindex, the secure
  headers) and no-store. `<When>` (src/components/system/When.astro) for a field that may be empty, `data-op-when` and
  `data-op-field` for OP's bridge. The sample collection `team` (every field optional but `name`, `visible`, `order`,
  labels in French), its card `CardTeam` and the page `test-contenu` (out of search engines, under Système).
  Sam, 21:25: the app writes content.config.ts and the folders itself when the team adds a collection or a field, so
  content.config.ts keeps the simple form its parser reads and nothing else goes in it. `keep_vars` in wrangler.jsonc.

- 2026-10-27, Sam (15:28: « le nouveau site Astro peut créer ses propres global classes… pour la scalabilité »; OP's
  skills rewritten for Lumos for Astro the same day, op-system's docs/DECISIONS.md): a site's own global classes live
  in `src/styles/project.css`, imported in the patterns layer after Lumos's `patterns.css`, so a component's own CSS and
  the utilities still win over them and an upgrade of Lumos never touches them; each has a one-line comment that the
  build gives OP System (site.json `system.classes`: the components' classes by prefix, then the global ones, the
  project's first with their comment and their uses). Empty in the starter.

- 2026-10-27, Sam (night plan, Bloc 8d: « optimiser les documents pour Claude, sans perdre l'info importante »;
  decided by Claude overnight, Sam asleep): CLAUDE.md says each rule once and without its history: the dates and who
  asked left the rules whose date does not serve them (their history is in this file), « How to build with Lumos » and
  « Lumos for Astro is not Lumos for Webflow » point to AGENTS.md, which every session loads with CLAUDE.md and says
  both, and the pointer to op-system's README follows its move to `docs/` (`docs/bridge.md`, `op:reveal`). No rule
  changed: a script found every rule-like line of CLAUDE.md and AGENTS.md before in the two after (op-system's night
  report). AGENTS.md is Lumos's own file, as its authors publish it: unchanged.

- 2026-10-27, Sam (Oct 26: Lenis, page transitions with three simple presets or one Claude makes from an idea, a
  loading screen, each per project; decided by Claude overnight, Sam asleep): the finishing touches are op.config.json
  keys, each `false` or a preset: `loader` mark, counter or curtain (`true` stays the mark), `transition` fade, slide or
  curtain on Astro's own router (never Barba, which would fight it; `transitions: true` stays the slide),
  `smoothScroll` light, medium or strong (Lenis, loaded only where it runs: not with reduced motion, not on a touch
  screen unless `smoothScrollTouch`), and `custom` for the site's own file Claude makes. site.json announces each with
  the presets the site has, so OP System's « Expérience » can show, replay and ask for them. The curtain wears
  `.theme-brand`; the counter counts toward 90 while the page loads, then to 100. site.json no longer announces a
  transition only because PageTransitions.astro holds `<ClientRouter />`: the built pages say whether the router is on,
  and Lenis is listed among the libraries only where it runs. The Slider answers OP System's `op:reveal`.

- 2026-10-18, Sam (« est-ce que ça pourrait être plus rapide… aussi seamless que Webflow », then « go pour tout »): OP
  System's « Mettre en ligne » puts the site live itself through its GitHub App (main moved to the version seen on the
  staging, a fast-forward only), with a bar to the site itself; a request to Claude only when the App is not on the
  repository, done from the connector's guide (`get_guide("astro")`, Live), the one source of those steps. The launch
  writes `domain` and `live` in op.config.json, and `SITE_URL` reads `domain` from it.

- 2026-10-18, Sam: `npm run shot` (scripts/shot.mjs) takes the built pages as full-page PNGs at the widths asked, with
  no browser downloaded, and CLAUDE.md (Check what you changed) says which pages to look at by what changed, at the
  comment's width and at 390, before a change is called done. A session had lost three turns on its own screenshots
  (Playwright missing, a wrong first picture, a window too tall) and had not looked at the phone width.

- 2026-10-17, Sam (« je te fais confiance pour les décisions »): a new site starts from OP System's « Un nouveau site »
  (Cloudflare's Deploy button on this repository, which must be public for it; by hand until then), then a request of
  kind `setup` to Claude. The team's « Mettre en ligne » in OP System is the ask to publish (requests `publish` and
  `launch`, the only queue work that reaches `main`). Every build serves secure headers and fails when `dist/` holds a
  secret key, so a key never reaches the published site. Design and motion follow OP's craft (the connector's guides
  `direction` and `critique`, or OP's skills). Wrangler 4.135 at least, for `wrangler preview`.

- 2026-10-17, Sam (« un loading screen par projet et un langage de transition entre les pages, comme Barba, intégré
  dans l'UX de l'app »): every site has a loading screen and page transitions ready, both off until the team turns
  them on in op.config.json (`loader`, `transitions`), so OP System can show and replay them. The loading screen wears
  the site's mark on its ground, once per tab session; the transitions are Astro's view transitions (the page lifts
  away, the next one rises in, on the site's eases), a crossfade with reduced motion. Each is restyled per client.

- 2026-10-17, Sam: the starter wears OP System's look, not Lumos's (no Lumos logo, colours, cover or showcase page;
  the credit in README.md and LICENSE only). The swatches, themes and first page are replaced with the client's.
- 2026-10-17, Sam: the site starts from OP's starter `official-partner/op-astro` (Lumos for Astro 1.0.0). `main` is
  the live site, `review` the one OP System shows; content in files until a CMS is decided.
