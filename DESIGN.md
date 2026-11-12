# Curveball: design

The site of Curveball Films, a commercial production company whose home base is New Orleans. Built from OP's Figma
(b3sFmBDWNYeXOydmTL79JU, page « curveball »: Home, News, Contact, Directors, a director's page, About) and the brand
guide (« Curveball Brand Guidelines », Sep 30). The values live in system/curveball.json; base.css is generated from
it (system/gen.py).

## Direction
- The brand's « curve » language: the curves are a letter of the wordmark (ES Build's « u ») blown up until it is
  a shape, with the ball (a circle) caught in it. It closes every page above the footer, in the page's own colour:
  red on Home, mustard on News, teal on Contact; About opens with it. That is the site's one signature; everything
  around it stays quiet (one dark ground, big type, thin rules, small labels).
- The client asked for the play to come through motion and interaction rather than static graphics (Sep 21): the
  ball travels through its curve as the page scrolls, filling its stroke as the brand guide's balls do, all the way
  and out by the other edge (Sam, Nov 12), never cut by another section; the dot appears before a hovered title. A
  page change stays classic (Sam, Nov 11): the page dissolves into its colour, the colour turns to the next page's,
  its opening elements rise into place. The Figma's cursors only show what can be clicked: no custom cursor (Sam,
  Nov 11). Motion follows OP's two tiers and the named durations of base.css; smooth scroll medium (Lenis).
- Each page has its ground: Home, Directors and About dark (black, stone text, taupe for the big type), News mustard,
  Contact teal, a director's page in the director's colour (black text). The footer is dark everywhere and takes the
  page's colour for its mark; Directors, a director's page and About have the plain footer (a rule, no curve).
- Each director has a colour, from the brand's three, in turn down the list: teal, mustard, red (src/content/
  directors, `colour`). Their page wears it; on the directors list (Home, Directors, the foot of a director's page)
  the name in the middle of the screen turns the whole page to it, every ground included (Home's opening and its
  curve's « u », the reel, the footer: `data-paint`), and that director's own balls, carrying their films, rise
  through the screen.

## Measures (Figma at 1728)
- Grid: 12 columns, margin 32, gutter 12 (Sam, Nov 11). Content width 1664; nothing grows beyond it.
- Units: the Figma is static; from 1728 down to 1024 every value follows the grid, the tablet and the phone have their
  own values (system/curveball.json, fluid).
- Type at 1728: display 210, h1 163, h2 98, h3 57 (Bold, -3 %); label 24 (Regular); large 18 (Bold, -3 %); main 18
  (Medium); small 14 (Regular). At 390: 60, 44, 34, 26, 18, 16, 16, 12. The longest director's name (« Neymarc
  Brothers ») fits a phone's width on one line at 44; the directors list sets the names bigger on a phone, on two
  lines (Sam, Nov 12).
- Spacing: 8, 12, 16, 20, 24, 32, 40, 48, 64; sections 112, 144, 192 (roles in base.css: --space-rule, --space-dot,
  --space-media, --space-meta, --space-action, --space-title, --space-label, --page-top).

## Motion
- The contract (base.css): faster 150 ms (press, a hover leaving), fast 250 ms (hover, focus, the page's colour on
  the directors list), medium 450 ms (menus, a page leaving), base 800 ms (headings, a page arriving), slow 1200 ms
  (media fading in, the reel's films); ease-out (answers), ease-arrive (arrivals), ease-travel (from one place to
  another), ease-leave (leaving the screen). Scrubbed motion has no ease of its own: the scroll is the curve.
- The opening, once per page: the veil leaves once the next page's scripts have set it up, then its opening elements
  rise into place (base, ease-out, 70 ms apart at most); About's title fades in while its ball rolls in to the bend
  (slow x 1.5, ease-travel). Nothing is split into lines (Sam, Nov 12): text fades in whole. An element a script
  brings in is hidden from the first paint (`data-await`), so it is never seen before its animation.
- The curve bands (Home, News, Contact, About): the ball follows the stroke's middle, its radius following the
  stroke's width, from where it enters to the Figma's rest and out by the other edge, scrubbed (0.5).
- Home's opening: the featured work turns every six seconds while the row's rule fills (its time), the next still
  fading in over the last (slow, ease-out) as it settles from 104 % (twice slow, the arrive curve), the client and
  agency cross-fading (medium), the counter's digit rolling up (base, the arrive curve). The counter pauses it; a
  hover or a focus in the row, the opening off screen or the tab hidden pause it too; no turning by itself with
  reduced motion. Leaving it is told like a director's reel: the stills fixed behind the page, a screen-tall eased
  gradient drawing the ground up over them as they rise 24 % of a screen and grow 6 % (a parallax, the reel's travel).
- The directors list: the active name is the one under the middle of the screen, the first caught a quarter of a
  screen early and the last kept a tenth late; « View director » fades in at the active row's far right (medium). The page's colour follows it on the travel curve: base to or from
  the page's own ground, medium between two directors. Each director has three balls (their films), placed as the
  Figma's hover frames place them (238 at 1728, 128 at least), two to four on screen: they grow in (base, ease-out,
  80 ms apart) when the name becomes active and shrink away (medium, the leave curve) when it gives way, rising with
  the scroll 1.45 to 1.85 times faster than the names, a tenth of a second behind; at rest they rest.
- A director's reel: the film is fixed behind the page (its stage sticks from a screen under the opening to a screen
  under the other directors). The opening's colour dissolves into it through an eased gradient 90 % of a screen
  tall that the scroll draws up, the film rising 14 % of a screen at its own pace as it settles from 116 % (a
  parallax); the first line comes half a screen early; each project's line scrolls over it and the films cross-fade
  (slow); after the last, the dark rises over it the same way.
- Parallax: the news cards, the team's portraits and About's two lists drift at their own pace (fine pointer, 48rem
  and up, scrub 0.6).
- Reduced motion: no travel, scale, parallax or smooth scroll; the balls sit at their Figma rest, the reel's film
  fills its stage, colours change at once or over faster, page changes crossfade.

## Global classes (src/styles/project.css)
- .site-grid: the 12 columns with named lines (margin, nav, two, split, half, three, aside, last, end).
- .rule-top: the rule that opens a row or a section, and --space-rule to the text under it (Home's two rows, the
  inner pages' sections).
- .dot-label: the dot before a label, centred on its capitals (« Featured work », « Directors », a director's bio:
  the plus the Figma put in that one is gone, Sam, Nov 12).
- [data-paint] (with :root[data-paints]): the grounds and named text that follow the page's colour, and how they
  change. [data-await]: hidden from the first paint until its script plays it (2 s at most).
- main is the container of the design unit --u.

## Components
- Nav, Footer (global): the menu at columns 7 and 10 on every page, an action at the last column when the page has
  one (« Enquire about Jasper »); the footer opens with the curve in the page's colour (or a rule: plain), the
  symbol in that colour, the menu, the line and the small print. On a computer it stays within one screen: the symbol
  is 531 at most, smaller on a short screen, 144 at least.
- HeroHome, DirectorsHome, CurveBand (sections), ArrowLink (a link with its drawn arrow).
- NewsList, ContactIntro, TeamList, Statement (sections); SectionHead, CardNews, ContactBlock, CardPerson (content).
- DirectorHero, DirectorReel (a director's page), AboutStory, AboutLists (About); src/utils/parallax.ts.
