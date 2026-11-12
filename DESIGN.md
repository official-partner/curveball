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
  the name in the middle of the screen turns the whole page to it, and balls carrying their films rise behind the
  names.

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
- The opening, once per page: the page's opening elements rise into place as the veil leaves (base, ease-out, 70 ms
  apart at most); About's title lines fade up while its ball rolls in to the bend (slow x 1.5, ease-travel). Text is
  never split behind a mask (Sam, Nov 12: it cut the descenders): lines fade up.
- The curve bands (Home, News, Contact, About): the ball follows the stroke's middle, its radius following the
  stroke's width, from where it enters to the Figma's rest and out by the other edge, scrubbed (0.5).
- The directors list: the active name is the one under the middle of the screen; the page's colour follows it (fast).
  Seven film balls rise behind the names, each born near the list's foot, growing (ease-out) then shrinking to
  nothing near its top (ease-in); the scroll's speed carries them (near ones faster), they drift on a little and
  settle within four seconds of rest (WCAG 2.2.2).
- A director's reel: a ball rises into the page's colour under the opening, grows with the scroll until its film
  fills the screen (smoothstep), holds while each project's line scrolls over it and the films cross-fade (slow);
  after the last project it shrinks away up into the dark as the other directors come up.
- Parallax: the news cards and the team's portraits drift at their own pace (fine pointer, 48rem and up, scrub 0.6).
- Reduced motion: no travel, scale, parallax or smooth scroll; the balls sit at their Figma rest, the reel's film
  fills its stage, colours change at once or over faster, page changes crossfade.

## Global classes (src/styles/project.css)
- .site-grid: the 12 columns with named lines (margin, nav, two, split, half, three, aside, last, end).
- .rule-top: the rule that opens a row or a section, and --space-rule to the text under it (Home's two rows, the
  inner pages' sections).
- .dot-label: the dot before a label, centred on its capitals (« Featured work », « Directors »); .is-plus draws a
  plus in it (a director's bio).
- main is the container of the design unit --u.

## Components
- Nav, Footer (global): the menu at columns 7 and 10 on every page, an action at the last column when the page has
  one (« Enquire about Jasper »); the footer opens with the curve in the page's colour (or a rule: plain), the
  symbol in that colour, the menu, the line and the small print.
- HeroHome, DirectorsHome, CurveBand (sections), ArrowLink (a link with its drawn arrow).
- NewsList, ContactIntro, TeamList, Statement (sections); SectionHead, CardNews, ContactBlock, CardPerson (content).
- DirectorHero, DirectorReel (a director's page), AboutStory, AboutLists (About); src/utils/parallax.ts.
