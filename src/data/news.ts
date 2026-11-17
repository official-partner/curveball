/* News and awards: the cards of the News page, edited on the canvas with OP System's Modifier (data-op-list). The
   client's eight news, from the current site's CMS (Nov 17), the newest first; each card links to its article. The
   current site has no date and no text for them, and their photos are to bring in: a card shows what it has. */
export type NewsItem = {
  source: string;
  date?: string;
  title: string;
  text?: string;
  href: string;
  photo?: ImageMetadata;
  alt?: string;
};

export const news: NewsItem[] = [
  {
    source: "The Howler",
    title: "Curveball Films Signs Director Michael Chemaly",
    href: "https://thehowler.news/curveball-films-signs-director-michael-chemaly",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Hires Jake Cameron as Executive Producer",
    href: "https://lbbonline.com/news/curveball-films-hires-jake-cameron-as-executive-producer",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Welcomes Directing Duo Neymarc Brothers",
    href: "https://lbbonline.com/news/Curveball-Films-Directing-Duo-Neymarc-Brothers",
  },
  {
    source: "LBB Online",
    title: "Team Behind Five to Sixty Launches Rostered Production Company Curveball",
    href: "https://lbbonline.com/news/team-behind-five-to-sixty-launches-rostered-production-company-curveball",
  },
  {
    source: "LBB Online",
    title: "Connor Carroll Signs with Curveball Films",
    href: "https://lbbonline.com/news/connor-carroll-signs-with-curveball-films",
  },
  {
    source: "LBB Online",
    title: "CLR Cranks the Heat with 'So Hot, So Clean' Sequel",
    href: "https://lbbonline.com/news/CLR-So-Hot-So-Clean-Betty-Curveball-Films",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Signs Joe Pernice and James Niebuhr",
    href: "https://www.lbbonline.com/news/directors-joe-pernice-and-james-niebuhr-sign-to-curveball-films",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Launches",
    href: "https://www.lbbonline.com/news/team-behind-five-to-sixty-launches-rostered-production-company-curveball",
  },
];
