/* The symbol as three rings, each [inner, outer] radius in the logo's own units (src/assets/logo/symbol.svg, 548.743
   across, its centre at C). The first state is the logo itself; the footer's easter egg turns through the three while
   the pointer is on it (Sam, Nov 25, the Figma's « Animation reference » and its two states, all brought to the
   logo's outside). */
export const C = 274.372;
/** The width of the logo's fine lines, and of the cut that makes its C. */
export const LINE = 8.09;
export const STATES: [number, number][][] = [
  // the logo: two fine lines, the hole
  [
    [202.489, 274.372],
    [122.772, 194.655],
    [42.542, 114.426],
  ],
  // one fine line near the edge, a wide hole: the two inner rings meet (Sam's capture, Nov 25, its line as wide as the
  // logo's)
  [
    [242.88, 274.372],
    [118.6, 234.79],
    [86.3, 119.6],
  ],
  // three thin rings
  [
    [253.35, 274.372],
    [165.04, 186.07],
    [76.74, 97.76],
  ],
];
