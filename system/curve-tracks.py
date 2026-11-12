# The tracks the curve band's balls travel on: the centre line of each black stroke, with the ball's radius along it.
# Writes src/data/curve-tracks.json. Run: python3 -I system/curve-tracks.py   (needs numpy, scipy, pillow)
#
# The brand rule (the guide's 5.2 Curves): a ball always fills its stroke by the same share. Each band keeps the share
# the Figma gives its ball at rest (Home 97 %, News 93.6 %, Contact 93.1 %), so the ball shrinks a little where the
# stroke narrows round a bend and lands exactly on the Figma's centre and radius.
# Method: each shape is rasterised at 2 px per Figma unit, the distance to the nearest edge is taken inside it, and a
# rough guide line is snapped onto the ridge of that distance (the stroke's centre), smoothed, and resampled every
# STEP units. The shapes below mirror src/components/section/CurveBand.astro (Contact's arm is drawn past its real
# end, 1780, so the end cap does not pinch the width near the ball).
# Where each trip starts:
#   home     all the way (Sam, Nov 12: « la boule peut voyager all the way, même sortir du cadre »): in from beyond the
#            left edge along the top stem, round the bend (past the right edge), into the lower stem (its arms drawn
#            past their real end, -194.7, so the end cap does not pinch the width where the ball comes in);
#   news     just outside the right edge, coming down the stroke's turn;
#   contact  just outside the left edge, the same turn mirrored.
import json, math, os, re
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "data", "curve-tracks.json")
STEP = 6.0
WIDTH = 1728

BANDS = {
    "home": dict(
        y=-226.84,
        d="M1852.96 949.314C1848.7 336.304 1465.57 0 924.931 0L-900 0L-900 587.468L882.361 587.468C1163.32 587.468 1337.86 710.921 1342.12 949.314C1346.38 1208.99 1171.84 1319.67 886.618 1319.67L-900 1319.67L-900 1907.14L929.188 1907.14C1444.29 1907.14 1857.22 1511.24 1852.96 949.314Z",
        ball=(1167, 1342, 276),
        guide="M -420 66.9 L 903.7 66.9 C 1314.5 66.9 1593.3 296.8 1597.6 722.5 C 1600.8 1037.3 1429.1 1259.7 1167 1342 L 900 1386.5",
        start=("first", None),
    ),
    "news": dict(
        y=0,
        d="M2265.01 957.828C2260.76 1570.84 1877.63 1907.14 1336.99 1907.14L-39.7122 1907.14L-39.7122 1319.67L1294.42 1319.67C1575.38 1319.67 1749.92 1196.22 1754.17 957.828C1758.43 698.15 2143.2 587.468 1857.98 587.468L1791.58 587.468L1791.58 0L1900.55 0C2415.65 0 2269.27 395.902 2265.01 957.828Z",
        ball=(1123.5, 1610.8, 273),
        guide="M 2009.6 900 L 2009.6 957.8 C 2005.3 1383.5 1726.5 1613.4 1315.7 1613.4 L 900 1613.4",
        start=("hidden-right", None),
    ),
    "contact": dict(
        y=0,
        d="M-524.684 957.828C-520.427 1570.84 -137.295 1907.14 403.345 1907.14L2400 1907.14L2400 1319.67L445.916 1319.67C164.953 1319.67 -9.58459 1196.22 -13.8417 957.828C-18.0987 698.15 -402.872 587.468 -117.652 587.468L-51.2505 587.468L-51.2505 0L-160.223 0C-675.321 0 -528.941 395.902 -524.684 957.828Z",
        ball=(1556.5, 1612.3, 273),
        guide="M -269.3 900 L -269.3 957.8 C -265 1383.5 13.8 1613.4 424.6 1613.4 L 1700 1613.4",
        start=("hidden-left", None),
    ),
    # About (Figma 15:597): the same « u » as Home's, 92.5 to the left, its band starting 206.2 down the page; the
    # ball rolls in along the top arm when the page opens, then the scroll carries it round the bend to its rest (its
    # arm drawn past its real end, -287, so the end cap does not pinch the width where the ball comes in)
    "about": dict(
        y=0,
        d="M1760.62 722.38C1764.88 1284.31 1351.95 1680.21 836.85 1680.21L-900 1680.21L-900 1092.74L794.28 1092.74C1079.5 1092.74 1254.04 982.06 1249.78 722.38C1245.52 483.99 1070.99 360.54 790.02 360.54L-900 360.54L-900 -226.93L832.59 -226.93C1373.23 -226.93 1756.37 109.37 1760.62 722.38Z",
        ball=(1288.6, 1226.4, 260.5),
        guide="M -320 66.9 L 811.2 66.9 C 1222 66.9 1500.8 296.8 1505.1 722.5 C 1508.3 1037.3 1336.6 1259.7 1074.5 1342 L 800 1386.5",
        start=("first", None),
    ),
}


def parse(d):
    """Absolute M/L/H/V/C/Z (all these paths use) to polylines, cubic curves flattened."""
    toks = re.findall(r"[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?", d)
    i, cmd, cur, start, out, poly = 0, None, (0.0, 0.0), (0.0, 0.0), [], []
    f = lambda k: float(toks[i + k])
    while i < len(toks):
        t = toks[i]
        if t in "MLHVCZ":
            cmd = t
            i += 1
            if cmd == "Z":
                poly.append(start); out.append(poly); poly = []; cur = start
            continue
        if cmd == "M":
            cur = (f(0), f(1)); i += 2; start = cur; poly = [cur]; cmd = "L"
        elif cmd == "L":
            cur = (f(0), f(1)); i += 2; poly.append(cur)
        elif cmd == "H":
            cur = (f(0), cur[1]); i += 1; poly.append(cur)
        elif cmd == "V":
            cur = (cur[0], f(0)); i += 1; poly.append(cur)
        elif cmd == "C":
            p0, p1, p2, p3 = cur, (f(0), f(1)), (f(2), f(3)), (f(4), f(5)); i += 6
            for k in range(1, 81):
                u = k / 80
                a, b, c, e = (1 - u) ** 3, 3 * (1 - u) ** 2 * u, 3 * (1 - u) * u * u, u ** 3
                poly.append((a * p0[0] + b * p1[0] + c * p2[0] + e * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + e * p3[1]))
            cur = p3
    if poly:
        out.append(poly)
    return out


def resample(pts, step):
    pts = np.asarray(pts, float)
    s = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(pts, axis=0).T))])
    n = max(2, int(round(s[-1] / step)) + 1)
    t = np.linspace(0, s[-1], n)
    return np.stack([np.interp(t, s, pts[:, 0]), np.interp(t, s, pts[:, 1])], 1)


def sampler(D, ox, oy, ss):
    h, w = D.shape
    def at(x, y):
        X, Y = (x + ox) * ss, (y + oy) * ss
        if not (0 <= X < w - 2 and 0 <= Y < h - 2):
            return -1.0
        x0, y0 = int(X), int(Y); fx, fy = X - x0, Y - y0
        v = D[y0:y0 + 2, x0:x0 + 2]
        return float(v[0, 0] * (1 - fx) * (1 - fy) + v[0, 1] * fx * (1 - fy) + v[1, 0] * (1 - fx) * fy + v[1, 1] * fx * fy)
    return at


out = {}
for name, b in BANDS.items():
    polys = parse(b["d"])
    allp = np.concatenate([np.asarray(p) for p in polys])
    ox, oy = -allp[:, 0].min() + 20, -allp[:, 1].min() + 20
    W, H = int(allp[:, 0].max() + ox + 20), int(allp[:, 1].max() + oy + 20)
    SS = 2
    img = Image.new("L", (W * SS, H * SS), 0)
    draw = ImageDraw.Draw(img)
    for p in polys:
        draw.polygon([((x + ox) * SS, (y + oy) * SS) for x, y in p], fill=255)
    D = ndimage.distance_transform_edt(np.asarray(img) > 127) / SS
    at = sampler(D, ox, oy, SS)

    guide = np.concatenate([np.asarray(p) for p in parse(b["guide"])])
    guide[:, 1] -= b["y"]
    g = resample(guide, STEP)
    tang = np.gradient(g, axis=0); tang /= np.hypot(*tang.T)[:, None]
    nrm = np.stack([-tang[:, 1], tang[:, 0]], 1)
    ridge = []
    for (x, y), (nx, ny) in zip(g, nrm):
        offs = np.arange(-160, 160.5, 0.5)
        vals = [at(x + nx * o, y + ny * o) for o in offs]
        o = offs[int(np.argmax(vals))]
        ridge.append((x + nx * o, y + ny * o))
    ridge = np.asarray(ridge)
    k = 9
    pad = np.concatenate([np.repeat(ridge[:1], k, 0), ridge, np.repeat(ridge[-1:], k, 0)])
    ker = np.ones(2 * k + 1) / (2 * k + 1)
    centre = resample(np.stack([np.convolve(pad[:, 0], ker, "valid"), np.convolve(pad[:, 1], ker, "valid")], 1), STEP)
    half = np.array([at(x, y) for x, y in centre])
    centre[:, 1] += b["y"]

    bx, by, br = b["ball"]
    share = br / at(bx, by - b["y"])
    radius = half * share
    end = int(np.hypot(centre[:, 0] - bx, centre[:, 1] - by).argmin())
    kind, val = b["start"]
    if kind == "first":
        begin = 0
    elif kind == "x>=":
        begin = next(i for i in range(end) if centre[i, 0] >= val)
    elif kind == "hidden-right":
        begin = max(i for i in range(end) if centre[i, 0] - radius[i] >= WIDTH + 2)
    else:
        begin = max(i for i in range(end) if centre[i, 0] + radius[i] <= -2)
    pts = np.column_stack([centre, radius])[begin:end + 1].copy()
    # the last stretch eases onto the Figma's exact centre and radius (a few units off the centre line)
    m = min(24, len(pts) - 1)
    for j in range(m + 1):
        w = (j / m) ** 2
        i = len(pts) - 1 - m + j
        pts[i] = pts[i] * (1 - w) + np.array([bx, by, br]) * w
    out[name] = [round(float(v), 1) for v in pts.ravel()]
    print(f"{name}: share {share:.4f}, {len(pts)} points from ({pts[0,0]:.0f}, {pts[0,1]:.0f}) r {pts[0,2]:.0f} to ({pts[-1,0]:.1f}, {pts[-1,1]:.1f}) r {pts[-1,2]:.1f}, radius {pts[:,2].min():.0f} to {pts[:,2].max():.0f}")

with open(OUT, "w") as fh:
    json.dump(out, fh, separators=(",", ":"))
print("wrote", os.path.relpath(OUT))
