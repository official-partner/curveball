/* News and awards: the cards of the News page, edited on the canvas with OP System's Modifier (data-op-list). The
   client's eight news, from the current site's CMS (Nov 17), the newest first; each card links to its article. The
   current site has no date and no text for them, so a card shows neither; their photos are the current site's. */
import photo1 from "@/assets/content/news/curveball-films-signs-director-michael-chemaly.jpg";
import photo2 from "@/assets/content/news/curveball-films-hires-jake-cameron-as-executive-producer.jpg";
import photo3 from "@/assets/content/news/curveball-films-welcomes-directing-duo-neymarc-brothers.jpg";
import photo4 from "@/assets/content/news/team-behind-five-to-sixty-launches-rostered-production-company-curveball.jpg";
import photo5 from "@/assets/content/news/connor-carroll-signs-with-curveball-films.jpg";
import photo6 from "@/assets/content/news/clr-cranks-the-heat-with-so-hot-so-clean-sequel.jpg";
import photo7 from "@/assets/content/news/curveball-films-signs-joe-pernice-and-james-niebuhr.jpg";
import photo8 from "@/assets/content/news/curveball-launches.jpg";

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
    photo: photo1,
    alt: "A man in a dark cap and a black sweatshirt, on a dark background",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Hires Jake Cameron as Executive Producer",
    href: "https://lbbonline.com/news/curveball-films-hires-jake-cameron-as-executive-producer",
    photo: photo2,
    alt: "A smiling man in a blue sweater, arms crossed",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Welcomes Directing Duo Neymarc Brothers",
    href: "https://lbbonline.com/news/Curveball-Films-Directing-Duo-Neymarc-Brothers",
    photo: photo3,
    alt: "Two men beside a film camera on set, in black and white",
  },
  {
    source: "LBB Online",
    title: "Team Behind Five to Sixty Launches Rostered Production Company Curveball",
    href: "https://lbbonline.com/news/team-behind-five-to-sixty-launches-rostered-production-company-curveball",
    photo: photo4,
    alt: "Photo booth strips of the team beside the Curveball logo",
  },
  {
    source: "LBB Online",
    title: "Connor Carroll Signs with Curveball Films",
    href: "https://lbbonline.com/news/connor-carroll-signs-with-curveball-films",
    photo: photo5,
    alt: "A bearded man in a rust beanie, facing the camera",
  },
  {
    source: "LBB Online",
    title: "CLR Cranks the Heat with 'So Hot, So Clean' Sequel",
    href: "https://lbbonline.com/news/CLR-So-Hot-So-Clean-Betty-Curveball-Films",
    photo: photo6,
    alt: "A still from the film: a man in a towel in a blue tiled bathroom",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Signs Joe Pernice and James Niebuhr",
    href: "https://www.lbbonline.com/news/directors-joe-pernice-and-james-niebuhr-sign-to-curveball-films",
    photo: photo7,
    alt: "Two portraits side by side: a man in a grey shirt, and a man with a camera by a car",
  },
  {
    source: "LBB Online",
    title: "Curveball Films Launches",
    href: "https://www.lbbonline.com/news/team-behind-five-to-sixty-launches-rostered-production-company-curveball",
    photo: photo8,
    alt: "Photo booth strips of the team beside the Curveball logo",
  },
];
