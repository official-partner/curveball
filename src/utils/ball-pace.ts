/* A ball carried along a track by the scroll, at a steady pace on screen.
   Moved at a steady pace along its track, it is not steady to the eye: where the track runs down the page it travels
   with the scroll and seems to stop, then leaves again where the track turns (Sam, Nov 17: « on dirait qu'il arrête
   son mouvement avant de repartir »). What the eye follows is the ball on the screen, where the page's own movement
   is taken off its descent. So the pace along the track is set, piece by piece, for the ball to cover the same
   distance on screen for every pixel scrolled: faster where the track goes down, slower where it runs across.
   track: [x, y, r, x, y, r, ...] in the drawing's units, its points evenly spaced; from: the point the scroll starts
   it at; range: the scroll's distance, in the same units. Returns scroll progress (0 to 1) to progress along the
   track from that point (0 to 1). */
export const pace = (track: number[], from: number, range: number) => {
  const count = track.length / 3;
  const first = Math.min(Math.max(Math.floor(from), 0), count - 2);
  const pieces: { length: number; down: number }[] = [];
  for (let i = first; i < count - 1; i++) {
    const dx = track[(i + 1) * 3] - track[i * 3];
    const dy = track[(i + 1) * 3 + 1] - track[i * 3 + 1];
    const length = Math.hypot(dx, dy);
    pieces.push({ length, down: length ? dy / length : 0 });
  }
  if (!pieces.length || !(range > 0)) return (q: number) => q;
  // the scroll a piece takes when the ball covers `speed` on screen for each unit scrolled
  const cost = (p: { length: number; down: number }, speed: number) =>
    p.length / (p.down + Math.sqrt(p.down * p.down + speed * speed - 1));
  // the screen speed whose whole trip takes exactly the range (more speed, less scroll)
  let low = 1.0001;
  let high = 100;
  for (let k = 0; k < 48; k++) {
    const mid = (low + high) / 2;
    if (pieces.reduce((sum, p) => sum + cost(p, mid), 0) > range) low = mid;
    else high = mid;
  }
  const marks = [0];
  pieces.forEach((p) => marks.push(marks[marks.length - 1] + cost(p, high)));
  const whole = marks[marks.length - 1] || 1;
  return (q: number) => {
    const at = Math.min(Math.max(q, 0), 1) * whole;
    let a = 0;
    let b = pieces.length;
    while (b - a > 1) {
      const m = (a + b) >> 1;
      if (marks[m] <= at) a = m;
      else b = m;
    }
    const span = marks[a + 1] - marks[a];
    return (a + (span ? (at - marks[a]) / span : 0)) / pieces.length;
  };
};
