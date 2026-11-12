/* Home's featured work, shown one at a time in the opening (« Featured work 1 — 6 »). The Figma shows one (Factor,
   Wieden+Kennedy) and counts six: six copies of it until the real six are in, edited on the canvas with OP System's
   Modifier (data-op-list). Each one's still and film are to supply. */
export type Featured = { client: string; agency: string };

export const featured: Featured[] = Array.from({ length: 6 }, () => ({
  client: "Factor",
  agency: "Wieden+Kennedy",
}));
