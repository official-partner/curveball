/* Contact's blocks and team, edited on the canvas with OP System's Modifier (data-op-list). The Figma's copy word for
   word (one double space fixed in « Got a job? Got a curveball? »); its placeholders kept as placeholders: every
   block writes to bids@curveballfilms.com, every person is Nic Weinfeld, until the real ones are in. Email and
   LinkedIn show as text until their addresses are in. */
import photo1 from "@/assets/content/news/news-2.jpg";
import photo2 from "@/assets/content/news/news-1.jpg";
import photo3 from "@/assets/content/news/news-3.jpg";
import photo4 from "@/assets/content/news/news-5.jpg";
import photo5 from "@/assets/content/news/news-4.jpg";

export type ContactBlock = { title: string; text: string; email: string };

export const blocks: ContactBlock[] = [
  {
    title: "Got a job? Got a curveball?",
    text: "Briefs, bids, availability, awkward timelines. This is the one you want.",
    email: "bids@curveballfilms.com",
  },
  {
    title: "Writing something?",
    text: "Briefs, bids, availability, awkward timelines. This is the one you want.",
    email: "bids@curveballfilms.com",
  },
  {
    title: "Are you a director?",
    text: "We look at everything, and we answer. Send a reel and a sentence about what you're chasing.",
    email: "bids@curveballfilms.com",
  },
  {
    title: "Want to work with us?",
    text: "We look at everything, and we answer. Send a reel and a sentence about what you're chasing.",
    email: "bids@curveballfilms.com",
  },
];

export type Person = {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  bio: string;
  photo: ImageMetadata;
  alt: string;
};

const person = {
  name: "Nic Weinfeld",
  role: "Founder & CEO",
  location: "Los Angeles",
  email: "",
  linkedin: "",
  bio: "Started Five to Sixty in his second year at USC and has grown it into a group of four companies. Still answers his own phone, which nobody expects.",
};

export const people: Person[] = [
  { ...person, photo: photo1, alt: "A smiling man in a blue sweater, arms crossed" },
  { ...person, photo: photo2, alt: "A man in a cap and a black T-shirt, on a dark background" },
  { ...person, photo: photo3, alt: "A bearded man beside a film camera, in black and white" },
  { ...person, photo: photo4, alt: "A man with a moustache in a red beanie" },
  { ...person, photo: photo5, alt: "A man in a beanie and a jacket by a car, in black and white" },
];
