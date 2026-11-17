/* Home's featured work, shown one at a time in the opening (« Featured work 1 — 6 »): six films of the collection
   « Films », by their id (the file's name in src/content/projects/), in this order. Each brings its still, its cover
   video, its client and its agency. A first six to see the opening with films (Sam, Nov 17): the team's choice comes
   later. Edited on the canvas with OP System's Modifier (data-op-list). */
export type Featured = { project: string };

export const featured: Featured[] = [
  { project: "perrier" },
  { project: "puma" },
  { project: "lexus" },
  { project: "uber" },
  { project: "takis" },
  { project: "booksy" },
];
