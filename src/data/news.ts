/* News and awards: the cards of the News page, edited on the canvas with OP System's Modifier (data-op-list). The
   Figma repeats one card six times (its title and its text name different directors): placeholders until the real
   news are in. Each card links to its article (to supply). */
import news1 from "@/assets/content/news/news-1.jpg";
import news2 from "@/assets/content/news/news-2.jpg";
import news3 from "@/assets/content/news/news-3.jpg";
import news4 from "@/assets/content/news/news-4.jpg";
import news5 from "@/assets/content/news/news-5.jpg";
import news6 from "@/assets/content/news/news-6.jpg";

export type NewsItem = {
  source: string;
  date: string;
  title: string;
  text: string;
  href: string;
  photo: ImageMetadata;
  alt: string;
};

const card = {
  source: "LBB Online",
  date: "May 2024",
  title: "Curveball Films Signs Joe Pernice and James Niebuhr",
  text: "Curveball Films has signed director Michael Chemaly, whose work combines character-driven comedy with inventive visual storytelling across sports and gaming campaigns.",
  href: "",
};

/* In the Figma's order, column by column: the right column's first card is the highest, then the left, then the middle */
export const news: NewsItem[] = [
  { ...card, photo: news1, alt: "A man in a cap and a black T-shirt, on a dark background" },
  { ...card, photo: news2, alt: "A smiling man in a blue sweater, arms crossed" },
  { ...card, photo: news3, alt: "A bearded man beside a film camera, in black and white" },
  { ...card, photo: news4, alt: "A man in a beanie and a jacket by a car, in black and white" },
  { ...card, photo: news5, alt: "A man with a moustache in a red beanie" },
  { ...card, photo: news6, alt: "A crew of ten posing together, in black and white" },
];
