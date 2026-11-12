/* Home's featured work, shown one at a time in the opening (« Featured work 1 — 6 »), each with its still. The Figma
   shows one (Factor, Wieden+Kennedy) and counts six: six copies of it until the real six are in, edited on the canvas
   with OP System's Modifier (data-op-list); their stills, the design's three film frames in turn, stand in until each
   one's own still and film are supplied. */
import home from "@/assets/content/home/hero-still.jpg";
import factor from "@/assets/content/projects/factor.jpg";
import rooftop from "@/assets/content/projects/rooftop.jpg";

export type Featured = { client: string; agency: string; still: ImageMetadata };

const stills = [home, factor, rooftop];

export const featured: Featured[] = Array.from({ length: 6 }, (_, i) => ({
  client: "Factor",
  agency: "Wieden+Kennedy",
  still: stills[i % stills.length],
}));
