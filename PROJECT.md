# Decisions

One line per decision: the date, who asked, what was decided and why. The newest at the top.

- 2026-11-24, Sam (comments 44 and 45 in OP System, handled at his ask in the conversation):
  - 44, News (« rendre le bloc complet cliquable, et créer un hover de l'image: léger scale up de la boule, et scale
    up de l'image à l'intérieur aussi »): the whole card is the link (« Read » stretched over it, its name for a screen
    reader « Read: » and the title: ArrowLink's new `label`). On hover and on focus the round photo grows to
    `--card-hover-scale` (1.04, medium) and the picture inside to `--card-hover-zoom` (1.1, base), so the picture
    keeps moving inside its ball after the ball has settled; leaving takes fast and medium. Never with reduced motion.
    The two scales are new tokens (gen.py). Every news card.
  - 45, Contact (« toutes ces sections: commencer l'anim de la boule un peu plus tard dans le scroll »): the three
    bands above the footer start their ball 15 % of a screen later: `startAt` 0.95 to 0.8 (Home), 1 to 0.85 (News),
    1.1 to 0.95 (Contact). Measured at 1440 by 900: 135 px of scroll later on each page; the end is unchanged, so the
    ball runs its track over a little less scroll. About's ball is another movement (the page's opening) and is not
    changed.
  - Checked: rules 0 new (20 known), widths 0 failures on News and Contact, News looked at at 1254 and 390, the card's
    hover sampled frame by frame at 1254 (the photo, the title and the text all reach the link).
- 2026-11-23, Sam (comment C2, Nov 22: the site's words in their own case, the capitals text-transform's): the
  starter's new rule caps-typed found one text typed in capitals, a film's title in Joe Pernice's bio (« CHASING
  YESTERDAY », from the Webflow site): now « Chasing Yesterday », flagged here as a change to the client's copy. The
  layout carries the starter's `CopyCase`: a copy from the page gives the words as written, never as a text style
  shows them. The skip link speaks the site's language (« Skip to content », it said « Aller au contenu »).
- 2026-11-20, Sam (comments 38 to 43 of Nov 18 and 19, asked for in the conversation):
  - 38, About on a tablet « plus comme desktop »: from 48rem the story takes the computer's composition (the band, the
    title in it, the story at the right, « Let's swing » below), no longer the phone's enlarged drawing. Its title
    and story keep the computer's proportions there (sized with the page's unit; the story at the running text's
    floor, 16, and 230 down the band instead of 375.6, so it stays in the black).
  - 39, About's two lists side by side from 48rem, as on a computer.
  - 40, the story drifts against the page as it scrolls (parallax, depth 0.1: about 45 px each way on a laptop),
    with a mouse and from a tablet's width, never with reduced motion, as the news' cards.
  - 41, News on a tablet: each card on three of the eight columns, left and right in turn, the right ones lower.
  - 42, a news card under the next after a resize: not reproduced at 478 (from 1254, by 991, down to 478 and 390: no
    card over another, the parallax's offsets cleared). The likely cause was the tablet's old layout, where the
    lower cards were moved by a translate the rows knew nothing of; they are lowered by a margin now.
  - 43, balls left on screen after a very fast scroll: since Nov 17 a ball waits its turn before growing in, and a
    name passed quickly left that wait running, so its balls came in after their director had given way. The wait
    is cancelled with the rest. Eight very fast scrolls: stray balls 8 times out of 8 before, 0 after.
  - Found on the way: the footer's menu on a tablet had grown with the phone's bigger links (32 px at 768,
    « contact us » on two lines over IG, FB, LN). There it takes the running text's size.
- 2026-11-17, Sam (22:11): from one filter with no director to another with none, « No director here yet. » stays as
  it is: no fade out and in of the same line.
- 2026-11-17, Sam (22:06, dictated: the colour changes and the filters' changes « un peu plus snappy », and lighter
  for the browser, « étape par étape »; and « tu peux toujours pousser au même tes changements », read as: each
  change goes to main as well as review from now on, until he says otherwise):
  - Quicker: the page's colour changes in 450 ms to or from its own ground (it was 800) and 250 ms between two
    directors (it was 450); a filter's change takes about 800 ms from the click to the last ball in (it took about
    1400): the list out in 150 ms, the names in over 350 ms with 160 ms of stagger at most.
  - One step after the other: the old balls stop their films and shrink (250 ms) while the colour changes; the new
    ones wait for most of that change, then grow in (450 ms, 60 ms apart), each film starting with its ball, not
    before. A name passed quickly while scrolling never starts its balls.
  - Lighter: the balls' frame no longer reads the layout (the names' and the filters' places are read once, when
    the list or the window changes; the frame does arithmetic with the scroll, then writes transforms). Before, that
    read in the middle of a colour change made the browser work the page's styles out twice a frame.
- 2026-11-17, Sam (21:54: « les filtres transitionnent pas au meme timing que le reste, meme la boule et la ligne »).
  Measured frame by frame on a change from a director's colour to the dark page (0.8 s, 250 to 1050 ms after the click):
  - the filters' words ran from 250 to 1850 ms. Each had a colour of its own (--text-2, a color-mix) and a transition
    of its own; while their group's colour changed, the browser started that transition again at every frame, so it
    only got going once the group had finished. They now take their group's colour and are dimmed by opacity: one
    transition, the group's. Measured after: 250 to 1050 ms, as the ground, the nav and the labels.
  - the label's dot and the rule had no transition at all and flipped in one frame, at 250 ms. Both now change over
    the page's duration (project.css, on :root[data-paints]).
- 2026-11-17, Sam (21:40, dictated):
  - Filters: no transition of their own on the hover any more (it ran on another clock than the page's colour when a
    filter changes it; during that change they take the page's). A chosen filter has a dot at its left and moves
    over to make room; pressed again it lets go, back to « All ». « All » has no dot: it is the state with no filter.
  - The balls of the curves (About, Home, News, Contact) seemed to stop in the bend, then leave again. Not a pause in
    the code: they ran at a steady pace along their track, and where the track goes down the page they travelled
    with the scroll, so on screen they slowed to half (93 px per 100 scrolled against 190, Home). Their pace is now
    steady on the screen (src/utils/ball-pace.ts): measured since, 165 to 171 px per 100 scrolled all the way.
  - About's ball stays longer: it is gone when the lower stem is 5 % down the screen, as Contact's and News's (it was
    35 %). At 1440 by 900 it leaves around 1300 px of scroll, where it left around 1010.
  - A director's page, after the last film: the breath before the film dissolves goes from 30 % of a screen to 8 %,
    the dissolve from 90 % to 60 % (612 px from the last film's line to the other directors at 900 high).
  - Closing a film: the opening played the other way. The film stops, grows back to the full screen (base, the
    travel's ease) while the list's lines return, and dissolves into its short version over the end of it; the page
    can be scrolled again when that is over. Chosen over a fade to black: it answers the opening and never leaves
    the screen empty.
  - Footer: IG, FB, LN against the right of their column. Their addresses are not on the current site (Webflow,
    read only: its footer holds only the logo, its nav only « contact us »; a web search found none either): they
    stay text until Curveball gives them. Nothing invented.
  - News: three more dates, from LBB Online's own list of Curveball's news (September 5, 2025 for the Neymarc
    Brothers, July 31, 2025 for CLR, September 12, 2024 for Connor Carroll). Still without a date: Jake Cameron
    (LBB) and Michael Chemaly (The Howler).
- 2026-11-17, Sam (19:40, dictated: a filter's change still felt like a lag, « deux ou trois switches » of colour in a
  second or two; he asked to think of a few ways first and to take the best):
  - Three ways weighed. Slowing or staggering each part: the same number of changes, only longer. Holding the page's
    own colour while a filter is in use: one change less, and the colour no longer follows the name on screen.
    Taken: work out at the click who will be active in the new list, and move each part once, to where it ends.
  - So: the same director still active after the filter, the colour and the balls do not move, only the names
    change; another one or nobody, the colour goes straight from the old one to the new one as the new names rise
    in (it went by the page's black on the way before), the old balls shrink where they are and the new ones grow
    in with the names. Measured over five changes: one change of colour each, none when the director stays.
- 2026-11-17, Sam (18:41, dictated, two messages):
  - Watching a film: it settles into its own format as it fades in, not after (base, 800 ms, the travel's ease, an
    ease in-out; it was slow, 1200 ms, and started 450 ms late). Around a film that does not fill the screen: pure
    black, not the brand's black (« on va tricher le background »).
  - The short versions that play behind a director's list of films (the reel) were 1280 px at a strong compression,
    which showed on a full screen: cut again from the films at up to 1920 px (1080 for a vertical one, never above
    the film's own size), capped at 2.5 Mbps, the same three scenes of four seconds. 61 files, 183 MB in
    public/media/films (they were 64): temporary, until the films leave Dropbox for a video host.
- 2026-11-17, Sam (18:38 and 18:39, dictated, with a screenshot of About's story):
  - A filter's change on the directors list is one movement instead of a jump: the active name lets go (its balls
    shrink where they are, held in place while the list changes), the list fades out (fast), changes while nothing
    of it shows, then the names that stay, or « No director here yet. », rise in one after the other (medium,
    ease-out, 300 ms of stagger at most) and the name under the middle of the screen takes the colour and the
    balls. Reduced motion: the list changes at once, as before.
  - About's story, below 64rem: really centred in the black stem this time. Its box is a column, which the
    property used at 18:05 does not centre; measured since, 72 px above and below at 535 wide, 16 and 16 at 390.
- 2026-11-17, Sam (18:34, dictated, with a screenshot of the footer's rule):
  - The plain footer's rule spans the columns, margin to margin, as the rules of the pages do: neither the whole
    screen (18:05's reading) nor a margin short at each end (what it was before).
  - « No director here yet. »: in the names' size without their capitals (Lumos's text-transform-none), on two
    lines, in the list's own box so it starts where the first name does; the screen-tall block is gone, the section's
    own space before what follows is enough (« too much »).
- 2026-11-17, Sam (18:05, dictated, a list of corrections after looking at the review):
  - Footer on a phone: the round symbol is back, margin to margin, in the page's colour (the wordmark put there
    earlier today was a misreading of « logo »). The pages and « contact us » are bigger than the line under them
    (text-menu on a phone 34 to 56, system/curveball.json) and closer together (each trimmed to its letters,
    --space-2 apart), « même si c'est un peu moins accessible ».
  - A new global class, .logo-art (project.css): a logo as wide as its box, for the nav's and the footer's symbol
    and Home's wordmark, which each wrote the same three declarations.
  - About, below 64rem: the story is centred in the height of the curve's black stem (1093 to 1680 of the drawing),
    no longer hung from its top.
  - News: each article's date from its link. Two articles read so far (LBB Online: March 4, 2024 for the launch,
    which two cards link to; May 16, 2024 for Joe Pernice and James Niebuhr). The five others wait for Sam's
    approval of the page reads; no date is invented. A card without a date keeps its source at the left.
  - Layouts that rearrange when something is missing (checked on Contact, News, a director's page): a person
    without a photo shows no empty circle and opens on the name; without a city the links take its place; Contact's
    team, drawn as a scatter of portraits, stands in plain rows while nobody has a photo, and the scatter comes
    back with the first one.
  - Watching a film: a ring turns at the pointer while the film loads, between « Play » and « Close » (the word
    « Loading » with reduced motion), and again if the film stalls; the rule is pressed or dragged to move through
    the film (a band of --space-5 on it; the left and right arrows move five seconds); the film shows in its own
    format, read from the file (16:9 stays 16:9, a vertical film vertical), coming in as big as its short version
    and settling to its size (slow, the travel's ease); the address names the film (?film=<its id>, not a page of
    its own: 61 more pages for the same content), so Back closes it where the page was, Forward opens it again,
    and a link opens the page at that film (its sound then waits for a click, as browsers ask). Astro's router
    reloads the page on any step to an entry that carries a state: the film's entry and the page's carry none
    while a film is open.
  - Over a film, one colour: the film's title was the browser's own white for a button; it now takes the stone of
    the rule, « Play », the client and the year.
  - The balls' loops cut again from the films: one scene of four seconds, 640 px, a much lighter compression
    (61 files, 30 MB in public/media/films, temporary until the films leave Dropbox).
  - Directors: under a filter with nobody, « No director here yet. » in the names' size and colour, a screen tall
    so the footer stays out of sight; no ball rises above the foot of the filters' row; on a director's page, four
    times the space between the other directors and the footer; the plain footer's rule runs from one edge of the
    screen to the other.
- 2026-11-17, Sam (17:35, dictated, with the Figma's three frames of a film being watched; his comments 33, 34, 35
  and his reply on 25, handled at his ask in the conversation):
  - Watching a film (DirectorReel; the dialog player of Nov 12 is gone). « Play » follows the pointer over the reel;
    a click there, or on a line's title, plays that film whole, with its sound, in place: the film itself loads over
    its short version and fades in once it plays (medium); the page is held (wheel, touch, the scroll keys; Lenis
    stopped), so the film's line stays where it was; the other lines and the colour's gradient fade out; the line's
    rule fills with the film's time (six times its weight) and its triangle is a pause (the title pauses and plays,
    the space bar too). « Close » follows the pointer: a click anywhere else, Escape or the film's end leaves. Two
    seconds without the pointer moving while it plays: the line, the label and the pointer fade out; a move, a key
    or a pause brings them back. A vertical film shows whole on black (read from the file, no field to fill). The
    label is text at the system pointer, not the Figma's pixel hand (Sam, Nov 11: « pas ces curseurs-là »); fine
    pointers only. A touch screen and the keyboard get a « Close » button (top right). No way to mute yet (Sam:
    later). Checked in a browser at 1440: play, the line unmoved (793 before and after), the wheel held, idle at
    2 s, pause, space, Escape. Not checked: a touch screen, Safari, a vertical film.
  - Comment 25, again (« je vois encore le même problème »): the rule of Nov 17 sat in project.css, the patterns
    layer, and lost to each component's own transition: nothing had changed. It is in DirectorsHome's styles now
    (the components layer). Measured frame by frame on a director's page: the ground, the labels, the filter's
    options, the names and « View director » all end between 800 and 900 ms (before: options 250, names 450, the
    menu's mark and « View director » at once).
  - Comment 33, the footer below 48rem: the wordmark margin to margin in the symbol's place, then the pages and
    « contact us » one under the other in a new text style of the Web System, `text-menu` (Large on a computer, 34
    on a phone, as h2; it shrinks from 34 to 16 between 390 and 1023, so a tablet's links are a little bigger than
    before, 23 at 768). system/gen.py now writes a fluid value's bounds in either order.
  - Comment 34, About below a computer: the story sits in the curve's lower stem. The enlarged drawing is the same
    size on every phone (968 wide, one unit 0.035rem; it was 1.9 times the screen), so the stem holds the story at
    any width; About's is 230 units further right on a phone, its bend cut more, so its outer corner clears the
    text; what follows comes up over the second curve's black. At 360 wide the story's last two lines still touch
    the red. The ball at rest is left out there with reduced motion. CurveBand takes the same fixed size.
  - Comment 35: the news cards' titles are a new text style, h4 (Bold 40 / 95 % / -3 % at 1728, 30 on a tablet, 24
    on a phone), in place of h3 (57). Not in the Figma.
  - Health: the « fills its frame » rules six components each wrote are Lumos's own classes now (`cover-absolute`,
    `object-fit-cover`): 2 accepted failures are fixed, 24 remain (review/data/rules-baseline.json still lists the
    2: to take out with `npm run rules -- --accept`).

- 2026-11-17, Sam (15:27, « go pour tout »: his comments 23, 25, 26, 27, 29, 31, 32; 15:28 and 15:29, two captures:
  « alignement du cercle est pas centré avec le texte », « enquire n'est pas aligné non plus »):
  - A director's portrait is centred on the capitals of the name's first line (its foot on that line's baseline,
    then down by half of what it has over the cap height, `--cap-height`); it was centred in the line's box, lower
    than the capitals. Measured at 478, 1254 and 1440: 0 to 0.3 px between the two centres.
  - ArrowLink: its words are a flex item, so a text box of their own, and now trimmed to their capitals as every
    other text: « Enquire about … » lines up with « contact us » in the menu (top and foot the same). Every arrow
    link follows (« Read », « Start a conversation », « View director »): each sits about 3 px higher in its box.
  - Comment 25: while the page changes colour, the links that have a colour transition of their own (menu, footer,
    the directors list's names and filter options) take the page's duration and curve (`data-painting` on <html>
    for the time of the change, project.css); they changed in 250 ms while the grounds took 450 to 800.
  - Comment 23: every curve's ball leaves later. News and Contact: when its exit is 5 % down the screen (was 35 %);
    Home: 10 % above the screen's top (was 5 % down). About not changed: its ball follows the whole page's scroll.
  - Comments 29, 31, 32, below a computer: the curve's drawing (CurveBand, AboutStory) is enlarged, 1.9 times on a
    phone and 1.3 on a tablet, and cut by the screen's left edge, its bend and its ball kept; the title « We got a
    curveball for ya. » sits on the top stem, its foot just above the bend's opening, as on a computer; on Home
    the call and its link stand in the lower stem. The title is bigger on a phone: h1 is 56 at 390 (was 44; the
    directors list sets its own size there). On a phone the ball at rest is left out of Home's band with reduced
    motion (it would sit under the call).
  - Comment 27: News and Contact's bands rise behind the section before them below a computer too (1100 of the
    drawing's units; their upper 1320 are empty there), so the empty stretch under the last section is gone.
  - Comment 26: the team is the collection « Team » with the six people of the current site's contact page (name,
    role, email, as written there), in place of the starter's sample (its four people, CardTeam, the page
    « Test du contenu » and the Figma's five copies of Nic Weinfeld are gone). Sam asked for a collection; the rule
    of Oct 28 would have made it a block of Contact. No portrait, city or bio on the current site: the round frame
    stays empty, the rest is not shown. A sixth place in the scatter, which the Figma does not draw: column 1,
    1650 down. The accepted rule failure on the copied « cover » block lost CardTeam: the same debt, its key updated.

- 2026-11-17, Sam (14:51, « fill out le CMS le plus possible avec les infos que tu peux trouver », and his comments
  22, 24, 28 and 30 in OP System, handled at his ask in the conversation):
  - Directors: « Based », « Clients », the Location filter and a short name, from each bio and from the films'
    names in the current site's CMS; nothing taken from elsewhere. Clients: the brands a bio names, else the
    director's own films (six at most). Left empty, the bio not saying it: where Connor Carroll, Dylan Mulick, Joe
    Pernice, Ryan Scott and the Neymarc Brothers are based (the web gives the brothers both New York and Hoboken),
    Kevin Douglas's clients. Industries only where the bio uses the filter's own word (Michael Chemaly: Comedy; LU &
    LOU: Fashion; Baz & Wilder and Ben Strang: Docustyle). Jasper Soloff's are still the Figma's. « ABS » in Krista
    Liney's bio kept as written (ABC?). The short name is the first name (« Enquire about Michael »): the full name
    ran into « contact us » in the menu at 1254.
  - Comment 28: more space at the top of every page below a computer. `--page-top` is its own value of the Web
    System now (120 on a phone and a tablet, was 80 to 114; 192 at 1728 as before), no longer the large section space.
  - Comment 22: Contact's four blocks are in two columns from 480 wide (was 768).
  - Comment 24: a director's portrait sits on the first line of the name when a long name takes two (was centred
    on both).
  - Comment 30: the directors list's names are a little bigger on a phone (76 at 390, 92 at 478; was 72 and 80).
  - Not done yet: comments 23, 25, 26, 27, 29, 31, 32.

- 2026-11-17, Sam (14:24, dictated: « starter les vidéos un peu plus tôt ... que l'utilisateur voit la vidéo déjà en
  train de jouer », « même chose pour les images », « remplacer le projet Lexus sur la homepage », « pour les bulles
  ... faire jouer des petits thumbnails, des vidéos, 2 scènes de 3-4 secondes en loop ... les héberger à un endroit
  temporaire », « une version plus courte des vidéos »):
  - Each of the 61 visible films has two short files cut from its cover video, silent, in the repository
    (public/media/films/, 75 MB: 9 of loops, 66 of short versions), a temporary home until the films have a video
    host: a loop for the balls (two scenes of 3 s, 25 % and 60 % in, 400 px square) and a short version (three
    scenes of 4 s, 15 %, 45 % and 72 % in, 1280 wide). Two new fields of « Films »: `loop` and `preview`.
  - The balls of the directors list play their film's loop over its still while they are out.
  - Home's opening and a director's reel play the short version behind the page (else the cover, else the film);
    the player still opens the whole film from Dropbox.
  - Loading ahead: Home's first film loads with the page and the next one while the current plays, so a film is
    already moving as it fades in; a reel's first film loads with the page and starts half a screen before the reel
    shows, the next one loads while the current plays; the balls' stills and loops of the first two names load a
    screen and a half before the list, then two names ahead of the active one (was one).
  - Home's featured work: Volvo / Jimmy Chin takes Lexus's place (its film did not hold the full screen well).
  - Checked in a browser without reduced motion (1440): Home's films, the balls' loops and a reel load ahead and
    play. Not checked: a real phone, Safari.

- 2026-11-17, Sam (14:11: « featured work sur le hero: peux tu mettre 6 projets videos pour voir ? on changera plus
  tard », « les images fixes des films: oui! », « News: oui tu peux changer les images. améliorer »):
  - Home's opening shows six films of the collection, their cover video playing over their still: Perrier, PUMA,
    Lexus, Uber, Takis, Booksy (one per director, a first choice to see it: the team's comes later).
    src/data/featured.ts now only names the films by id; the opening reads their still, video, client and agency from
    the collection (a film's name stands for its client until the client is written; no agency line without one).
    The active film plays muted while the opening is on screen; the counter's pause stops it with the turning; none
    with reduced motion. The Figma's hero still and rooftop frame are gone.
  - Every film has a still: one frame taken from its cover video, 35 % in (Lexus and Outback 9 s in: the first frame
    was a title card), 1600 wide at most. Stand-ins until the client supplies pictures: the directors list's balls,
    the reel before its film loads, Home's opening.
  - News: the three montages recut for the round frame. Joe Pernice and James Niebuhr: the two portraits recut side
    by side in a square. The two launch cards: one photo each of the team's photo booth strip (the old logo beside it
    is out), from the larger of the two files.
  - Checked in a browser without reduced motion: Home's films play and turn, a director's reel plays its film.

- 2026-11-17, Sam (14:05, the two hosts opened to the session: « c'est fait »): the pictures of the current site.
  - The 14 directors' portraits and the 8 news photos are Webflow's own files, brought as JPEG (1600 and 1200 wide at
    most). Jasper Soloff's portrait is now the client's, not the Figma's. Three news photos are wide montages that the
    round frame cuts (the two launch cards, which also carry the old logo, and Joe Pernice with James Niebuhr): to
    recrop or replace, a choice for the team.
  - Every video address was asked for: 129 of 130 answer with a film. « Daytona Double Dose »'s two big files are
    gone from Dropbox (404): its player uses its cover. The eleven addresses on www.dropbox.com are written on
    Dropbox's file host, the form that was tested. Not checked: the films playing in a browser on the preview.
  - Still not done: a still per film (the directors list's balls stay empty).

- 2026-11-17, Sam (13:56, « webflow sert uniquement au contenu. commence la migration vers astro pour le contenu »;
  « tout ce qui est design: garder les règles du nouveau site »): the content of the current site's CMS (Webflow's
  three exports of Nov 17: Directors 14, Works 116, News 8) replaces the placeholders; nothing of the design changes.
  - Directors (collection): the 14, their name and bio word for word, their website and cover video (two new fields,
    shown nowhere yet). Their order is Webflow's (ties by name), written 1 to 14. Their colour stays the site's rule,
    teal, mustard, red in turn down the list (Webflow's own colours are not used). Visible: the 11 with a film to
    show; Ryan Scott, Krista Liney and Ben Strang are hidden (every film of theirs is hidden in Webflow). Jasper
    Soloff is a draft in Webflow and kept visible (the design's model page; his cities, clients and portrait stay the
    Figma's): to confirm. No « Based », « Clients », industries or location in Webflow: empty, the filters too.
  - Films (collection `projects`): the 116 under their Webflow slug; the 24 copies of Factor are gone. `cover` (new:
    Webflow's Cover Video) plays behind the reel, `video` (the Dropbox « Big Display » file) opens in the player, the
    cover when a film has no other file; `link` (new) keeps a Vimeo page. A director's reel is Webflow's own list of
    their projects, in its order; a director with no list (Kevin Douglas, Joe Pernice) shows their films not hidden.
    Hidden: Webflow's drafts and hidden films, and those outside their director's list (3 of Connor Carroll's): 61
    visible. No client, agency, year or still in Webflow: a line shows its title alone, the balls of the directors
    list and the reel's still wait for pictures. Not brought: a second video (4 films), the GIFs (51).
  - News (block, src/data/news.ts): the 8, newest first (Webflow's order reversed), each « Read » to its article. The
    source is named from the link (LBB Online, The Howler); no date and no text in Webflow, so a card shows neither
    (CardNews: date, text and photo optional). « Curveball Films Launches » and « Team Behind Five to Sixty… » are the
    same article twice, kept as the client has them.
  - Errors fixed in the client's data: « This is Baseballl » is « This is Baseball »; Lexus's video address had a
    second address pasted in it, Kevin Douglas's cover two addresses end to end (the first kept); LU & LOU's website
    without its tracking. Noted, not changed: the film « ESPNW » has the slug `nissan`.
  - Not done: no picture could be fetched (Webflow's and Dropbox's hosts are closed to the session): no portrait but
    Jasper's, no news photo (the round frame stays empty), no still. The Dropbox links were not played. Home's six
    featured works and Contact's team are not in the exports: unchanged. The six old news portraits stay in the
    repository: Contact's team uses them.

- 2026-11-12, Sam (20:06, « GO! lance ca! », the starter's checks brought to the sites made before them): Curveball takes `npm run rules`, `measure`, `widths` and `compare`, the starter's shot script (it waits for every image, whole) and the rule check in the build (it stops on a machine on a new failure, it only warns on Cloudflare). Nothing of the site changes: compared before and after, 17 pages of HTML, 34 pictures and 248 presses the same. The 26 failures the rules find today (10 raw values, 7 groups of copied rules, 5 column numbers, 2 text styles, 1 page with a style, the bids email written in four files) are accepted as the debt from before the rules, each with its reason, in `review/data/rules-baseline.json`: the list only shrinks. Not done: the system file in the starter's new form (system/curveball.json and gen.py stay), the short CLAUDE.md, a target for `measure` (no page of Curveball is tied to its Figma with `data-figma` on every element).

- 2026-11-12, Sam (12:44, a screenshot of Home on Yaara Sumeruk: « trop de chose se passe en même temps ici.
  changement couleur bg, la grosse boule rouge arrive en même temps. séparer les 2 actions, léger overlap si
  nécessaire ... plus d'espace sous yaara si nécessaire »): Home's curve band waits for the directors, one step after
  the other: the last name gives its colour back to the black, about a third of a screen later the ball rolls in, then
  the red band rises. The band starts 80 % of a screen below the last name's foot (less the list's own space under
  it, never less than the 110 it had); on a phone half a screen above its CTA. Under Yaara: 664 px of black at
  1440 x 900 (was 145). Measured: the ball shows 0.29 to 0.35 of a screen after the black from a phone to 1920; at a
  quick wheel scroll the black is back before it. The components page's sample keeps its spacing.

- 2026-11-12, Sam (comment 14, the home): the gradient under the opening, from the films to the directors, is half
  a screen tall instead of a whole one (`.hero-home_fade`, 50svh).
- 2026-11-12, Sam (comment 15, a director's page): the gradient from the director's colour into the film is shorter,
  65 % of a screen instead of 90 % (`.director-reel_fade.is-in`), so more of the film shows on arrival; the gradient
  after the last project keeps 90 %.
- 2026-11-12, Sam (his comment in OP System, 11:59: « une anim similaire à la page director individuelle pour la
  transition entre hero et contenu plus bas, visuel fixed, parallax, gradient, beaucoup plus d'espace entre Featured
  work et Directors »): Home's stills are fixed behind the page, seen only within the opening (clip-path); after the
  first screen a screen-tall eased gradient draws the ground up over them while they rise slower than the scroll, 24 %
  of a screen as they grow 6 % (a parallax: the reel's own travel since comment 13, « bcp plus de parallax »), their
  foot faded out under the ground so no edge shows and the opening keeps the design's framing; the directors follow
  on that ground. The gradient takes the directors' colour with the page.

- 2026-11-12, Sam (his ten comments in OP System, 11:27 to 11:40, handled at his ask in the conversation):
  - Home's opening: the featured row sits at the foot of the first screen, the menu's margin under it. The featured
    work turns by itself: six seconds each while the row's rule fills, the next still fading in over the last as it
    settles, the client and agency cross-fading, the counter's digit rolling up. The counter is its pause (a hover or
    a focus in the row pauses it too; it waits off screen and in a hidden tab); with reduced motion it does not turn
    by itself (WCAG 2.2.2). Each featured work now has a still in src/data/featured.ts: the design's three film
    frames in turn until the real ones are supplied.
  - The directors list: « View director » at the active row's far right from a tablet up (the row is one link), a
    name not active answers a hover from 30 % to half only; the last name gives way to the black when its foot is 40 %
    down the screen (was 25 %).
  - The directors list's « View director » is one for the whole list now: it travels from name to name as each
    becomes active (base, ease-out) instead of fading out and in on each row, fades in on the first and out after the
    last, and links to the active director (Sam's reply on comment 4).
  - Home's curve: its ball leaves when the lower stem is 5 % down the screen (was 35 %), later in the scroll.
  - The footer stays within one screen on a computer: the symbol is the Figma's 531 at most, smaller on a short
    screen (144 at least).
  - A director's page: the bio's dot without the plus (the global .dot-label.is-plus is gone); the first film's line
    comes half a screen sooner; the film rises at its own pace as the colour dissolves into it (a parallax).
  - About: the call sheet and the schedule drift at their own pace as the page scrolls (fine pointer, tablet up).

- 2026-11-12, Sam (comment 13, a director's page): much more parallax on the reel's film. It is now a third of a
  screen taller than the screen and rises through it slower than the scroll: about a quarter of a screen while the
  colour dissolves into it (settling from 108 % to its size), then the rest over the whole reel, until the other
  directors cover it (was 14 % of a screen during the dissolve only). The foot's shade stays on the screen.

- 2026-11-12, Sam (10:51, with screenshots: the directors' balls, the time on each name, the colour changes, About's
  text, the page changes, a director's page): third pass on the directors and the motion.
  - The directors' balls follow the Figma's hover frames: each director has their own three (their films), placed as
    those frames place them, the size they draw (238 at 1728); two to four are out at once, rising with the scroll
    faster than the names; they grow in when the name becomes active and shrink away when it gives way. The seven
    wandering balls are gone.
  - The first name is caught a quarter of a screen early and the last kept a quarter late. The colour changes on the
    travel curve, over base to or from the page's own ground (« la transition en noir trop snappy ») and medium
    between two directors.
  - The whole page takes the colour: Home's opening (its fade to the ground is the ground's colour through a mask),
    the curve's « u » on Home (it is the page's ground showing through the red), the reel and « Other Directors »,
    the footer (its symbol black on a red ground). The space under the last name no longer jumps: it was set on the
    theme class that the colour swaps.
  - A director's page opened from a link showed its opening black: the list of the page being left still answered a
    scroll during the change and put its theme back. A component now stops before the next page is swapped in
    (src/utils/page.ts), and the list reads each page's own theme from the markup (`data-page-theme`).
  - The reel's growing ball is gone, for the Figma's gradient done cleanly: the film is fixed behind the page, the
    opening's colour dissolves into it through a long eased gradient, and the dark rises over it after the last film.
  - About: no text is split into lines any more (the line spacing went wrong); the title and each block of the story
    simply fade in, the story as the ball reaches it on a computer.
  - A page change no longer shows the next page before its animation: the veil waits until the page's scripts have
    set it up, and what a script brings in is hidden from the first paint (`data-await`).
  - A director's opening: « Based » and « Clients » on their own line above the names, as the Figma sets them.
  - Home's curve starts 110 lower: its ball only grazes the last name as it rolls in.
  - Checked on a phone profile (CPU slowed four times): a transition on every element while the colour changed cost
    a quarter of a second per change; only the grounds and the named text change by a transition now (Home: one
    long task over the whole list, was five before this pass).

- 2026-11-12, Sam (Nov 11, 23:27: « une passe pour vérifier le site au complet ... ensuite la version tablette, la
  version mobile »; decided by Claude): the whole-site pass, at 1728, 1440, 1024, 768 and 390.
  - The reel's ball was a rounded square on a phone held upright (the round token is 100vw, smaller than a ball as
    wide as the screen's diagonal): it is a circle at every size now.
  - The reel's ball is there from the first screen: it rises into view just under the opening (never cut by the
    stage's edge), so the colour under a short opening is never an empty field on a phone or a tablet.
  - The last film now holds the screen for a third of a screen before the ball shrinks away; the stage lets go when
    the ball is a fifth of its size, so the other directors come up sooner after it (the empty dark after the reel
    was most of a screen on a phone).
  - When a director's name lights the page on a director's page, the strip of the reel still on screen takes the
    colour too (it stayed black, a hard edge).
  - On a tablet the reel's line gives the agency two columns (« Wieden+Kennedy » broke in the middle).
  - About's ball ran its whole way in about 200 px of scroll on a phone (three times the scroll's pace): on a tablet
    and a phone it now leaves when the lower stem is 10 % down the screen, not 35 %, about one and a half times the
    scroll's pace.
  - The rooftop still (a placeholder from the Figma) had a carousel's dots in its foot: cropped off.
  - Checked and kept: the page changes from a coloured directors list (Home to a director, a director to another,
    Home to About), the colours and the opening elements; the phone profile (CPU slowed four times) scrolls About
    with no long task, Home and a director's page with one short hitch where the page changes colour (a whole-page
    restyle, about 15 ms at full speed).

- 2026-11-12, Sam (00:33 to 00:36, from his phone: « la boule peut sortir de l'autre bord, sur les autres pages
  aussi », « le background couleur doit changer sur toute la page », « scale up apparaître, down disparaître en haut,
  plus smooth », « noms plus gros, sur 2 lignes », « transition ... vidéo full screen pas smooth: plus immersif,
  scrollytelling », « juste un fade sans masque »): second pass on the motion.
  - Every curve's ball now runs its whole stroke: in from beyond one edge, through the Figma's rest, out beyond the
    other (Home and News out on the left, Contact on the right, About out by the left along its lower stem). The
    ball passes behind the directors' names and the CTA (they keep their place above it), never cut.
  - The directors list turns the whole page to the active director's colour (the page's theme switches; on a
    director's page « Other Directors » follows it), quickly (fast) so a quick scroll does not linger on mixed
    colours. Its balls are born low in the list, grow in, rise, shrink to nothing near the top and are born again
    with another film; their speed follows the scroll's, smoothed; they no longer cross any edge. Their pictures
    are the build's own files on the staging (the optimized ones did not resolve there: Sam saw broken images).
  - On a phone the names are 72 to 80 px, each on two lines.
  - A director's reel is told by the scroll: from the opening's colour a ball rises carrying the film and grows to
    fill the screen; the projects' lines scroll over it; after the last, the ball shrinks away upward into the dark
    and the other directors follow. The colour melt and the dark fade are gone.
  - About's title and heading fade up, no mask (it cut the descenders).
  - The 404 in English, in the site's look; the footer's line keeps the Figma's three lines on a computer (1421 wide).

- 2026-11-12, Sam (Nov 11, 23:27: the new Figma pages, « les noms seraient actifs au milieu de l'écran », « la vidéo
  reste fixe en background et va switch en fade smooth », « la balle qui va ... reveal le texte »; 00:21: « la boule
  peut voyager all the way, même sortir du cadre »): the directors' pages, About, the directors list's colours.
  - The directors list (Home, the directors' page, « Other Directors » on each director's page): the name crossing the
    middle of the screen is active (not on hover, as asked): the section takes that director's colour, the name turns
    black, the others black at 30 %, and balls carrying the director's films rise through the screen, the near ones
    faster than the page (parallax), with a little weight (a spring) and a drift that settles within four seconds of
    rest; a ball fades before it would touch the list's edge, so none is cut by another section. Each director has a
    colour (the collection's new field, teal, mustard, red in turn, the Figma's James, Jasper, Kevin), used by their
    page too.
  - Home's curve no longer rises behind the last names (the colours would have shown its black behind them): it
    starts after the list. Its ball travels the whole stroke now, in from beyond the left edge, round the bend past the
    right edge, to its rest, on a layer over the sections so it is never cut.
  - A director's page (/directors/<id>, from the collection): the opening in their colour (portrait, name, the bio
    with the Figma's plus, Based, Clients, « Enquire about … » in the menu on a computer, under the bio below it,
    writing to bids@ with the director's name as the subject), then the reel: the film holds the screen while each
    project's line scrolls over it, the film cross-fading as a line comes in; the page's colour melts into the film
    and is gone once it fills the screen; after the last project, a fade to the dark and « Other Directors ». A film
    file plays muted in the reel and opens the player (sound, progress in the rule, pause, Close or Escape).
  - The films are a collection (« Films »: title, director, client, agency, year, still, film link, vertical), since
    they show on the director's page and in Home's balls. Placeholders: three per director, copies of the Figma's
    Factor (Wieden+Kennedy, 2024), their stills the Figma's two film frames (no film files yet: the player waits
    for them). Jasper Soloff's bio, cities, clients and portrait are the Figma's; the others' are to write.
  - The directors' own page (/directors, the menu's link): the list alone, no Figma frame of its own.
  - About (/about): built as drawn on a computer (the curve opening under the menu, the story in its bend, « Let's
    swing for the fences. » by the ball, the call sheet and the schedule on the second curve), stacked below a
    computer. The ball rolls in along the top stem behind the title as the page opens, the title's lines rising;
    the scroll carries it round the bend, the story appearing line by line as it passes, the last heading and its
    link as it lands. New text style « lead » (Bold 24, the story) and OP's travel and leave curves in the tokens.
  - The footer on a director's page and About is plain (a rule, no curve) with the red symbol, as the Figma draws them.

- 2026-11-11, Sam (23:05 to 23:38: « les boules ... sont trop grosses, ils dépassent ... comme dans Figma », « qu'au
  scroll down, la boule voyage à travers sa shape », « le lenis Smooth scroll », « pas de grosse boule ... juste un
  gros fade avec les couleurs qui vont changer, les éléments qui apparaissent », « pas ces curseurs-là », « faudrait
  pas que la boule soit coupée »): the curve band's balls, the page change, the cursors.
  - The balls measured on the Figma's render (the PDF), not on its layer boxes (737 and 729, larger than drawn): Home
    276 at 1167, 1342; News 273 at 1123.5, 1610.8; Contact 273 at 1556.5, 1612.3 (cut by the right edge, as drawn).
  - Each ball travels through its stroke as the page scrolls (scrubbed, GSAP ScrollTrigger on Lenis): along the
    stroke's centre line, filling it by the share the Figma gives it at rest (Home 97 %, News 93.6 %, Contact 93.1 %;
    the brand guide's rule, a ball fills its stroke), so it shrinks a little round a bend and lands on the Figma's
    centre and radius. Home's trip starts on the upper bend, clear of the last director names, and lands when its
    rest point is 60 % down the screen; News and Contact roll in from the edge. The tracks are computed from the
    shapes by system/curve-tracks.py (src/data/curve-tracks.json). Reduced motion: the ball rests where the Figma has it.
  - No section paints over the band any more (the directors section had its own dark ground, which cut the ball).
  - Smooth scroll on, light (Lenis; medium until Nov 18).
  - The page change is a colour fade (transition custom): the page dissolves into its own colour, the colour turns to
    the next page's, the next page comes up with its opening elements rising into place (data-page-reveal). The ball
    cover tried first is gone. Back and forward cut; reduced motion a short crossfade.
  - No custom cursor on this site (the Figma's pixel hand only shows what is clickable): removed, with « Play »,
    which was only a cursor label. A custom cursor only when the team asks for one.

- 2026-11-11, Sam (« on teste de faire un nouveau site ensemble »): News and Contact built from the Figma.
  - News: the head, then the cards in three columns starting at three heights as drawn (the right one level with the
    heading's last line, the left 112 lower, the middle 384 lower), 192 between two cards of a column; two columns on
    a tablet (the right one lower, a translate), one on a phone (every other card against the right edge), always in
    the news' order. The cards are a block of the page (src/data/news.ts, Modifier), not a collection: they link to
    articles elsewhere, no page of their own. The Figma's six identical cards stay as placeholders (their title and
    their text name different directors: to fix when the real news are in); « Read » shows without a link until then.
  - Contact: the four ways in at columns 1 and 6, each block writing to its address; on hover the Figma's dot comes in
    before the question (a scale and a translate, nothing around it moves). The team: five people where the Figma
    scatters them (from the rule: column 10, 238 down; 5, 540; 1, 898; 9, 1047; 5, 1232; in the design unit), in
    order on a tablet (two columns) and a phone (every other one to the right). « Where it started » is a statement
    over the full width; its « Start a conversation » writes to bids@ (the Figma gives it no target; Home's goes to
    the Contact page). Placeholders kept: every block writes to bids@curveballfilms.com, every person is Nic Weinfeld,
    Email and LinkedIn show as text until their addresses are in. Copy fixed: the double space in « Got a job? Got a
    curveball? ».
  - One space per relation, applied: a block's question to its text 40 (Figma 48), a portrait to the name 32 (18 to
    42), a rule to its label 20 (34 on « The team » and « Where it started »).
  - The curve on News and Contact rises behind the section above it on a computer (1260 and 991, as drawn); on a
    tablet and a phone, where the sections above are laid out otherwise, it follows them.

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

- 2026-11-12, Sam (comment 16, the footer): the footer's one screen is now counted from its symbol and menu, which
  reach the screen's top with the site's margin over them, not from the footer's top: the curve's big space above
  them sits over the screen, so the symbol is larger on a computer (the Figma's 531 at most, 144 at least).
- 2026-11-12, Samuel Charpentier (comment 17): Home's curve above the footer takes About's layout: « We got a curveball
  for ya. » at h1's size on the « u »'s top stem (as About), the call « Off the usual playbook? ... » kept at its size
  (h3) in the lower stem where About puts « Let's swing », its link at the stem's foot, both on the margin; below a
  computer, as About: the title, the drawing, then the call. Read « même taille de typo » as the call's own size: at
  h1's it takes four lines, more than the stem holds.
- 2026-11-12, Samuel Charpentier (comment 18): About's « Start a conversation » never showed on a computer: each block
  fades in as the ball comes level with it, and the link (1607 down the band) sits below the ball's lowest point
  (1386.5). A block below that point now shows when the ball reaches it, just after « Let's swing ».
- 2026-11-12, Samuel Charpentier (comment 19): less space between Home's last director and the curve below, from a
  tablet up: the band now starts 65 % of a screen below the last name's colour change instead of 80 % (about 140 px
  less on a laptop), the ball still rolling in just after the colour goes back to black.
- 2026-11-12, Samuel Charpentier (comment 20): the directors list's names not active answer a hover even more quietly,
  30 % to 40 % (a new tone of the Web System, `--tone-hover`) instead of half.
- 2026-11-16, Samuel Charpentier (comment 21): on a computer, About's two story paragraphs fade in with the page's
  opening, just after the title (70 ms apart), instead of waiting for the ball to come level with them; « Let's swing »
  and its link still wait for the ball. Below a computer, where the story sits under the drawing, unchanged.
- 2026-11-18, Samuel Charpentier (OP System's Expérience): smooth scroll light instead of medium (Lenis's lerp 0.16
  instead of 0.1: the page glides for less time after the wheel). Loader and page transition unchanged.
- 2026-11-18, Samuel Charpentier (« créer les pages template sur nos projets actuels »): the directors' pages say they
  come from a collection. site.json gives each `collection: "directors"` and its `item` (integrations/op-system.mjs,
  `templateRoutes`: a dynamic route whose getStaticPaths reads a collection), and the template's name, « Director »
  (op.config.json `templates`). OP System's pages list files them under Templates, one row, instead of among the
  pages. Nothing changes on the site itself.
- 2026-11-18, same change, its general form: `templateRoutes` reads any dynamic route that names one of the site's collections (the form the other sites of the studio need), no longer `getItems` alone. site.json unchanged: 11 directors' pages, « Director ».
- Nov 23, 2026 (Sam: « une passe… sur tous nos sites… optimisés pour le fonctionnement de l'app et de Astro »): the site brought up to OP System's CMS of today. (1) OP's « Draft » state: `draft` on the three collections, the staging shows a draft and the live build leaves it out (src/utils/content.ts `STAGING`, astro.config.mjs `__OP_STAGING__`), site.json says `content.drafts` so the app offers it. (2) The lists of a collection's items in site.json (`lists`, Contenu's « Shows in »: 26 lists). (3) The home's featured films are a list with a rule, « featured-work » in src/data/lists.json (picked by hand, in that order: the same six), read with `listed` and marked with `ruleMarks` (src/utils/lists.ts and list-rule.ts from the starter, `npm run test:rules` 8 of 8): the team and the client change them in Edit's List options, no request to Claude; src/data/featured.ts is gone. (4) The lists of a block as data, written by the app itself: the news (src/data/news.json), Contact's blocks (contact-blocks.json), the footer's social links (social.json), About's four columns (about-call-sheet-1.json and the others), each item with an id; the .ts files only read them (listFrom, src/utils/data-list.ts). (5) A director's page has « For Google » (seoTitle, seoDescription, ogImage), empty: the page says what it said. Checked: `npm run check` 0 errors, the build (rules 0 failures, the accepted fact-twice now named by its JSON file), the 18 built pages the same but for the list marks. Not looked at in pictures: the HTML is the same.
- 2026-11-25, Sam (« allons-y avec l'option 1. Tu peux la créer ... sur notre site »): Home's intro, the study's
  option 1 (« La plongée », artifact « Curveball, l'intro de la marque »), with his notes: the bottom ball runs the
  whole of its letter and leaves the frame, always inside the stroke with a little room each side (it shrinks where
  the stroke narrows: the brand rule, 97 %, the same « u » as Home's curve; system/intro-tracks.py writes
  src/data/intro-tracks.json); the opening's elements come in earlier (from half the dive) and one after another, the
  row's rule drawn from the left; the shapes always rise a little. src/components/section/HomeIntro.astro (its head
  part decides before the first paint, `html[data-intro]`), on src/pages/index.astro; tokens `--intro-hold`,
  `--intro-dive-duration`, `--intro-layer` (system/gen.py). The footer's sentence moved to src/data/site.ts (`LINE`),
  read by the footer and the intro. HeroHome's featured time waits for the intro (`home-intro:end`). The sentence is
  the footer's h2 (« We're » with its capital, as the footer; the storyboard set it in lower case: to confirm).
- 2026-11-25, Sam (« utiliser la taille de typo H2, ... alignée sur la grille, dans la même colonne que Directors About
  et News »; « enlève le mouvement de translate sur l'axe des Y »; « faire l'intro en CSS ... que ça load
  instantanément »; « enlever le mouvement d'apparition des deux shapes »): the intro is CSS from the first paint. The
  letters are an SVG in place from the start (no entrance; the red is one path with the letters as holes, so the film
  shows through when the black thins, no mask); the balls run on keyframes the component writes from the tracks
  (transform, played by the browser even while the scripts load); the dive is a CSS scale of the drawing round where
  the sentence was read, both letters together (the « r »'s faster growth needed a script: gone); the opening's
  elements and the row's rule are CSS animations on the same clock. The rise of the shapes is gone. The sentence is
  h3, the storyboard's size (57 at 1728; the system's h2 is the footer's 98, the size it had), in the menu's column
  (`half`) on a computer and on the margin upright. The script left only hurries it (a click, a key, the wheel, a
  swipe: five times faster) and tells the page it has ended; without it the intro still plays, and the page comes
  back after 9 s.
- 2026-11-25, Sam (screenshots of the dive: squares of an older frame, « ça bug, ça glitch »; « j'enlèverais le script
  qui accélère »; « ramener le petit effet d'apparition des shapes, sur l'axe des X, inversé, plus subtil, plus
  smooth »): the dive is drawn on a canvas again, on the CSS's clock (the wrap's animation); the SVG redrawn by CSS at
  every frame, full screen, made the browser show tiles of an older frame when it fell behind. The canvas brings
  back the « r »'s faster growth. The first frame stays CSS: each letter is its own SVG and slides in from its side
  (the « u » from the left, the « r » from the right, 8 % of the drawing, slow x 1.25 on ease-smooth), its ball with it.
  Nothing hurries the intro any more (the script only draws the dive, holds the smooth scroll and tells the page it
  ended); without the script it fades into the page at the dive.
- 2026-11-25, Sam (« accentuer la première animation ... qui partent de plus loin et viennent se placer avec un ease à
  la fin »; « faire apparaître le texte de la même façon »; « un petit délai entre l'apparition du texte et des
  boules ... la première bulle en haut, quand elle est à mi-chemin, la bulle du bas »): the letters slide in from 24 %
  of the drawing (8 % before) and settle on ease-smooth; the sentence slides in the same way from the left with the « u »
  instead of fading up; the « r »'s ball starts at 1.1 s, the « u »'s at the first one's half way, each 2 s through its
  letter. The dive now starts at 4.15 s (`--intro-hold`, 2.95 s before) so the second ball has left the frame: about
  7 s in all instead of 5.4. The rest unchanged.
- 2026-11-25, Sam (« commencer le scale plus tôt ... quand elle est à 50 % sortie »; « un petit scale subtil tout le
  long de l'animation pour tease »; « toujours un léger translate tout au long ... que ça feel pas statique »): the dive
  starts as the « u »'s ball is half out of the frame (`--intro-hold` 3.975 s, 3.7 s upright, where the drawing runs
  past the left edge and the ball leaves sooner; measured: 55 % out at 1440, 47 % at 390, 57 % at 1024 x 1366), the
  canvas carrying the ball out on its letter. The letters' slide now lasts the whole first frame (ease-smooth, until
  the dive) and the drawing comes nearer the whole time (93 % to 100 %, linear), so the dive's growth carries it on.
  The letters' run-ons are about a screen past the edge (many screens before): drawn that long, the browser painted the
  scaled layer coarse (the « r »'s arm stepped). About 6.4 s in all.
- 2026-11-25, Sam (« garder ça plus simple »; « le texte, j'aimais mieux avant, plus de bas en haut, plus subtil »; « les
  boules une petite affaire plus lentement, plus en même temps : la deuxième juste un mini délai après l'apparition de
  la première »; « en ce moment on dirait plein d'étapes séparées »): the sentence rises in again (base, ease-out,
  1.25 rem, 70 ms a line, from 0.3 s) instead of sliding from the left; the balls run 2.6 s (2 s before) and show
  together as the sentence settles, the « u »'s about 0.25 s after the « r »'s (measured at 1440, 1920, 390 and 430;
  upright the « u »'s sets off later, its stem starting on the screen). The dive still starts as the « u »'s ball is
  half out, now at 3.1 s (3.38 s upright): about 5.3 s in all. The slow zoom and the letters' slide stay.
- 2026-11-25, Sam (« le bloc texte en entier va voyager de gauche à droite, à peu près en même temps que sa shape ...
  le texte ne va pas dépasser la shape noire ... pas au même timing ou à la même distance, un genre de parallaxe »):
  the sentence as a whole slides in from the left with the « u » until the dive (ease-smooth), from 32 % of the screen
  where the letters come from 24 %: always a little ahead of its letter, so never past the black. Its lines still rise
  in one after another. Upright, where it sits on the margin, it comes in from the screen's edge.

