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
  pixel hand that points at what can be clicked (the Figma's « Play » and the contact titles), the dot that appears
  before a hovered title, the ball. Motion follows OP's two tiers and the named durations of base.css.
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
