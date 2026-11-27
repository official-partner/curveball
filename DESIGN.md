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
- A dot beside a text sits on the middle of its capitals (every one is trimmed to them), --space-dot from it: 12 at
  1728 since Sam's Nov 27 (it was 20).
- The menu (logo and links) is taupe on the black, as the page's own text, and the text's colour on the other grounds:
  the themes' role `--nav-text` (Sam, Nov 27, comment 47); its current page and its hover at --tone-muted of it. Over a
  picture or a film it is light whatever the ground (`--on-visual`, the stone: Home's opening, `navOver="visual"` on
  its layout; Sam, Nov 27, comment 51: the taupe is for text on the black only).
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
  --space-media, --space-meta, --space-action, --space-title, --space-label); --page-top, the top of an inner page to
  its first rule: 192 at 1728, 120 on a tablet and a phone (Sam, Nov 17).

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
  stroke's width, from where it enters to the Figma's rest and out by the other edge, scrubbed (0.5). On Home the band
  waits for the directors: its ball rolls in about a third of a screen after the last name gives its colour back
  (the room under the list), so the colour change and the ball never come at once. The bands above the footer
  (Home, News, Contact) start their ball when its track's start is 80, 85 and 95 % down the screen (Sam, Nov 21,
  comment 45: a little later in the scroll).
- Home's opening: six films of the collection (src/data/featured.ts), each one's short version playing muted over its
  still while it holds the screen, the next one loaded while it plays. The featured work turns every six seconds while the row's rule fills (its time), the next still
  fading in over the last (slow, ease-out) as it settles from 104 % (twice slow, the arrive curve), the client and
  agency cross-fading (medium), the counter's digit rolling up (base, the arrive curve). The counter pauses it; a
  hover or a focus in the row, the opening off screen or the tab hidden pause it too; no turning by itself with
  reduced motion. Leaving it is told like a director's reel: the stills fixed behind the page, a screen-tall eased
  gradient drawing the ground up over them as they rise 24 % of a screen and grow 6 % (a parallax, the reel's travel).
- The directors list: the active name is the one under the middle of the screen, the first caught a quarter of a
  screen early and the last kept a tenth late; « View director » fades in at the active row's far right (medium). The page's colour follows it on the travel curve: base to or from
  the page's own ground, medium between two directors. Each director has three balls (their films), placed as the
  Figma's hover frames place them (238 at 1728, 128 at least), two to four on screen: they grow in (base, ease-out,
  80 ms apart), each playing its film's short loop, when the name becomes active and shrink away (medium, the leave curve) when it gives way, rising with
  the scroll 1.45 to 1.85 times faster than the names, a tenth of a second behind; at rest they rest.
- A director's reel: the film is fixed behind the page (its stage sticks from a screen under the opening to a screen
  under the other directors). The opening's colour dissolves into it through an eased gradient 90 % of a screen
  tall that the scroll draws up, the film rising 14 % of a screen at its own pace as it settles from 116 % (a
  parallax); the first line comes half a screen early; each project's line scrolls over it and the films cross-fade
  (slow); after the last, the dark rises over it the same way.
- Below a computer the curves' drawings are enlarged (1.9 times on a phone, 1.3 on a tablet) and cut by the screen's
  left edge, the title on the top stem as on a computer (Sam, Nov 17). A ball leaves when its exit nears the screen's
  top (News, Contact: 5 % down; Home: 10 % above).
- While the page changes colour, every link turns with it, on the page's duration (`data-painting`).
- Watching a film: « Play » follows the pointer over a reel; the film plays whole with its sound in place, the page
  held, its line where it was, the line's rule its progress, « Close » at the pointer; the line and the label fade
  out after two seconds without a move (Sam, Nov 17).
- Parallax: the news cards, the team's portraits and About's two lists drift at their own pace (fine pointer, 48rem
  and up, scrub 0.6).
- A news card is one link (« Read » stretched over it) and answers the pointer and the keyboard: its round photo grows
  to `--card-hover-scale` (1.04) on medium, the picture in it to `--card-hover-zoom` (1.1) on base, both on the out
  curve, so the picture moves inside its ball; they leave on fast and medium (Sam, Nov 20, comment 44).
- Home's intro (Sam, Nov 25, option 1 of the study « Curveball, l'intro de la marque »): on a visit that starts on the
  home, once per tab session (`?op-intro` plays it again), before the opening. Its first frame is CSS, there from the
  first paint: the wordmark turned a quarter and seen very close (its « u » across the screen, its « r » above, a
  little closer than in the wordmark), black on red, each letter an SVG that slides in from its own side, from well off
  its place (24 % of the drawing), and keeps easing in until the dive (`--intro-hold`, ease-smooth), while the whole
  drawing comes a little nearer (93 % to 100 %, linear, round where the sentence is read): nothing is ever still, and
  the dive carries on a movement already there. The footer's sentence (h3, in the menu's
  column; on the margin upright) rises in from 0.3 s as the site's elements do (base, ease-out, 1.25 rem), a line after
  the other (70 ms), while the whole sentence travels in with the « u » it sits on, a little farther (32 % against the
  letters' 24 %, the same curve and time): a layer above them, never past the black. The balls come as it settles, together: the « r »'s shows at about 1.2 s, the « u »'s a moment
  later (0.25 s; it sets off later upright, where its stem starts on the screen), each 2.6 s through the whole of its
  letter and out of the frame, slowest where the storyboard has it, its size the stroke's
  (97 %, system/intro-tracks.py); their keyframes are written by the component and move them by transform, so they run
  while the page's scripts load. At `--intro-hold` (3.1 s; 3.38 s upright), as the « u »'s ball is half out of the
  frame, the sentence goes (fast, the leave curve) and a canvas takes
  the drawing over on the CSS's clock, the ball carried out on its letter: the black thins to the opening's film (base, ease-travel) while each letter grows
  round where the sentence was read (`--intro-dive-duration`, 1.6 s, ease-travel; 3.2 times across, 4.8 upright, the
  « r » 1.32 times faster) and the film settles from 112 %; past half the dive the wordmark, the menu, the row's rule
  (drawn from the left, slow, the arrive curve) and the row come in one after another (base, ease-out, 1.25 rem).
  About 5.3 s in all; nothing hurries it. Without the script it fades into the page at the dive. The featured work's
  time starts after it. None with reduced motion.
- Home's switch beside « Directors » (Sam, Nov 27, comment 49): « Featured work », its dot outlined until chosen
  (the dots fill and empty on the hover's time, the page's while it turns), half the label's space between the two.
  A dot answers the pointer by shrinking, to 80 % on the hover (fast) and 60 % while pressed (faster), never a fill
  (comment 52; --dot-hover-scale, --dot-press-scale); none with reduced motion. Each button takes clicks half the
  gap and --space-switch around it, and a band of --space-switch round the two takes the rest, so a click a little
  beside them never reaches the reel under the row (comment 55).
  One thing at a time (Sam, Nov 27: « le plus seamless, le plus smooth »): to the featured work, the balls shrink away
  where they are (fast, leave), the names fade (fast) and the filters leave line by line (faster, 12 ms apart); then,
  with nothing else moving, the colour goes back to the black (medium, travel); then the films marked « Featured work »
  come in as a director's reel (base, ease-out), a section's space (large) under the row and its dissolve over half a
  screen: full screen, the lines scrolling over them, a click plays one whole,
  Close comes back where it was. The row stays at the top of the screen over the reel (a margin down, as the menu;
  gone while a film is watched; only its switch takes the pointer). Back to « Directors » from anywhere in the reel:
  the reel fades (faster), the page goes back under cover to the row's own place with the row kept where it is on
  the screen, the names and the filters rise in, then the middle name gives its colour and its balls.
- Home's opening plays its films whole (Sam, Nov 27, comment 54): the row names the film on screen with its triangle
  (PlayTitle, as a reel's line) where « Featured work » stood. « Play » follows a mouse over the opening (not over the
  menu, a button or the rule) and a click there plays the film on screen, as its title does, the reel's way: the page back to
  its top (medium, travel) and held, the wordmark, the menu and the counter out (medium), the film over the opening on
  pure black growing from the full screen into its format (base, travel), the row's rule its time at six times its
  weight (pressed or dragged), « Close » at the pointer, idle after two seconds; Close, Escape, a click or the end:
  the film grows back and dissolves (from 60 % of base, medium), the wordmark, the menu and the counter come back with
  the dissolve, and the featured work turns again from that film.
- The page's colour: one transition per run of inherited colour (the part named in project.css turns, what it holds
  follows); a part inside it never has a colour transition of its own while the page turns (the footer's links).
- About's clients (Sam, Nov 27, comment 50): with a mouse, the name under it lights up (stone, the hover's time) and a
  client with a film of theirs on the site shows it in a small window beside the names: a column wide, 5:4, corners a
  tenth of its width, a picture's space (--space-media) left of the name's column, the pointer the arrow; in from 85 % on fast (ease-out), following the mouse up and
  down the names on medium (ease-out, a little behind), out on faster (leave); its still at once, the film's short loop
  fading in over it (fast) once it plays. Reduced motion: still, by the name, the still alone.
- The footer's easter egg (Sam, Nov 25, the « Onde » of the study « Curveball, le easter egg du footer »): the symbol is
  drawn as its three rings (src/data/symbol.ts), the cut of its C a mask; at rest it is the logo, to the pixel. While a
  mouse is on it (or the keyboard's focus), the rings turn through three states (the logo, one fine line near the edge
  with a wide hole, three thin rings), a state every 1.15 s, each ring 80 ms after the one inside it (a ball dropped in
  water) on a soft spring (k 150, damping 0.72: under a pixel of overshoot); the cut slides out to the right and comes
  back 0.38 s after the leave. The symbol takes the three page colours, one per state, on the footer's dark ground only
  (fast, hover ease). Not on a touch screen, not with reduced motion.
- Reduced motion: no travel, scale, parallax or smooth scroll; the balls sit at their Figma rest, the reel's film
  fills its stage, colours change at once or over faster, page changes crossfade.

## Global classes (src/styles/project.css)
- .site-grid: the 12 columns with named lines (margin, nav, two, split, half, three, aside, last, end).
- .rule-top: the rule that opens a row or a section, and --space-rule to the text under it (Home's two rows, the
  inner pages' sections).
- .dot-label: the dot before a label, centred on its capitals (« Featured work », « Directors », a director's bio:
  the plus the Figma put in that one is gone, Sam, Nov 12).
- .logo-art: a logo drawn as wide as the box that holds it (the nav's and the footer's symbol, Home's wordmark).
- [data-paint] (with :root[data-paints]): the grounds and named text that follow the page's colour, and how they
  change. [data-await]: hidden from the first paint until its script plays it (2 s at most).
- main is the container of the design unit --u.

## Components
- Nav, Footer (global): the menu at columns 7 and 10 on every page, an action at the last column when the page has
  one (« Enquire about Jasper »); the footer opens with the curve in the page's colour (or a rule: plain), the
  symbol in that colour, the menu, the line and the small print. On a computer it stays within one screen: the symbol
  is 531 at most, smaller on a short screen, 144 at least.
- HeroHome, DirectorsHome, CurveBand (sections), ArrowLink (a link with its drawn arrow), PlayTitle (a film's title
  that plays it: the reels' lines, Home's opening); FilmControls (media: the pointer's label and Close, for a film
  watched whole, shared by the reels and the opening).
- NewsList, ContactIntro, TeamList, Statement (sections); SectionHead, CardNews, ContactBlock, CardPerson (content).
- DirectorHero, DirectorReel (a director's page), AboutStory, AboutLists (About); src/utils/parallax.ts.
