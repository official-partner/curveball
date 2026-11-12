# Curveball: design

The site of Curveball Films, a commercial production company whose home base is New Orleans. Built from OP's Figma
(b3sFmBDWNYeXOydmTL79JU, page « curveball »: Home, News, Contact) and the brand guide (« Curveball Brand Guidelines »,
Sep 30). The values live in system/curveball.json; base.css is generated from it (system/gen.py).

## Direction
- The brand's « curve » language: the curves are a letter of the wordmark (ES Build's « u ») blown up until it is
  a shape, with the ball (a circle) caught in it. It closes every page above the footer, in the page's own colour:
  red on Home, mustard on News, teal on Contact. That is the site's one signature; everything around it stays quiet
  (one dark ground, big type, thin rules, small labels).
- The client asked for the play to come through motion and interaction rather than static graphics (Sep 21): the
  ball travels through its curve as the page scrolls, filling its stroke as the brand guide's balls do and never cut
  by another section; the dot appears before a hovered title. A page change stays classic (Sam, Nov 11): the page
  dissolves into its colour, the colour turns to the next page's, its opening elements rise into place. The Figma's
  cursors only show what can be clicked: no custom cursor (Sam, Nov 11). Motion follows OP's two tiers and the named
  durations of base.css; smooth scroll medium (Lenis).
- Each page has its ground: Home dark (black, stone text, taupe for the big type), News mustard, Contact teal, both
  with black text. The footer is dark everywhere and takes the page's colour for its mark.

## Measures (Figma at 1728)
- Grid: 12 columns, margin 32, gutter 12 (Sam, Nov 11). Content width 1664; nothing grows beyond it.
- Units: the Figma is static; from 1728 down to 1024 every value follows the grid, the tablet and the phone have their
  own values (system/curveball.json, fluid).
- Type at 1728: display 210, h1 163, h2 98, h3 57 (Bold, -3 %); label 24 (Regular); large 18 (Bold, -3 %); main 18
  (Medium); small 14 (Regular). At 390: 60, 44, 34, 26, 18, 16, 16, 12. The longest director's name (« Neymarc
  Brothers ») fits a phone's width on one line at 44.
- Spacing: 8, 12, 16, 20, 24, 32, 40, 48, 64; sections 112, 144, 192 (roles in base.css: --space-rule, --space-dot,
  --space-media, --space-meta, --space-action, --space-title, --space-label, --page-top).

## Global classes (src/styles/project.css)
- .site-grid: the 12 columns with named lines (margin, nav, two, split, half, three, aside, last, end).
- .rule-top: the rule that opens a row or a section, and --space-rule to the text under it (Home's two rows, the
  inner pages' sections).
- .dot-label: the dot before a label, centred on its capitals (« Featured work », « Directors »).
- main is the container of the design unit --u.

## Components
- Nav, Footer (global): the menu at columns 7 and 10 on every page; the footer opens with the curve in the page's
  colour, the symbol in that colour, the menu, the line and the small print.
- HeroHome, DirectorsHome, CurveBand (sections), ArrowLink (a link with its drawn arrow).
- NewsList, ContactIntro, TeamList, Statement (sections); SectionHead, CardNews, ContactBlock, CardPerson (content).
