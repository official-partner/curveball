# The tracks the home intro's two balls travel on (src/components/section/HomeIntro.astro): the centre line of the
# « u » and the « r » of the wordmark, with the ball's radius along it. Writes src/data/intro-tracks.json.
# Run: python3 -I system/intro-tracks.py   (needs numpy, scipy, pillow)
#
# The intro's first frame is the wordmark itself, turned a quarter and seen very close (Sam's storyboard, Nov 25): the
# middle band is the « u », the top one the « r ». The units here are the wordmark's own (src/assets/logo/logo.svg,
# viewBox 541.135 x 102.631), upright; the intro turns and scales them.
# The brand rule (the guide's 5.2 Curves, and system/curve-tracks.py): a ball always fills its stroke by the same
# share, so it shrinks where the stroke narrows (the bottom of the « u »'s bowl) and keeps a little room on each side
# (Sam, Nov 25: « la boule peut scale down si la shape se rétrécit ... avec un petit padding de chaque côté »). The
# share is Home's curve's (97 %), the same « u ».
# Method (curve-tracks.py's): each letter rasterised, the distance to the nearest edge taken inside it, a guide line
# snapped onto the ridge of that distance (the stroke's centre), smoothed, resampled every STEP units.
# Each trip runs the whole stroke (Sam, Nov 25: « elle finit de l'autre côté complètement, puis elle exit le frame »):
#   u  in from below, up its left stem (the run-on past the letter's real top), round the bowl, up the right stem;
#      the intro runs it backwards on the screen: up through the bowl and out along the band by the left
#   r  in along its arm (run on past the arm's end, off the screen's top), over its shoulder, down its stem and on past
#      the letter's foot (the run-on to the screen's right edge).
import json, os, re
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
LOGO = os.path.join(HERE, "..", "src", "assets", "logo", "logo.svg")
OUT = os.path.join(HERE, "..", "src", "data", "intro-tracks.json")
STEP = 0.5
SS = 20
SHARE = 0.97

# The letters, as the logo draws them, and the run-ons the intro adds (on the stems' own edges, as HomeIntro.astro)
logo = open(LOGO).read()
subpaths = re.findall(r"M[^M]+", re.search(r' d="([^"]+)"', logo).group(1))
LETTERS = {
    "u": dict(path=subpaths[10], runs=[(75.99, -80, 20.4374, 120), (121.9, -80, 20.437, 120)],
              guide=[("L", (86.2, -60)), ("L", (86.2, 69.46)), ("A", (109.17, 69.46, 23, 180, 0)), ("L", (132.12, -60))],
              rest=(117.5, 90.9)),
    "r": dict(path=subpaths[9], runs=[(147.337, 60, 20.437, 200), (187.767, 30.9519, 50, 18.364)],
              guide=[("L", (215, 39.6)), ("L", (179.6, 39.6)), ("A", (179.6, 61.6, 22, -90, -180)), ("L", (157.6, 225))],
              rest=(157.7, 90.6)),
}


def parse(d):
    """Absolute M/L/H/V/C/Z (the wordmark uses only these) to polylines, cubic curves flattened."""
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


def guide_points(steps):
    pts = [steps[0][1]]
    for kind, v in steps[1:]:
        if kind == "L":
            pts.append(v)
        else:
            cx, cy, r, a0, a1 = v
            for k in range(1, 121):
                a = np.radians(a0 + (a1 - a0) * k / 120)
                pts.append((cx + r * np.cos(a), cy + r * np.sin(a)))
    return np.asarray(pts, float)


def resample(pts, step):
    pts = np.asarray(pts, float)
    s = np.concatenate([[0], np.cumsum(np.hypot(*np.diff(pts, axis=0).T))])
    n = max(2, int(round(s[-1] / step)) + 1)
    t = np.linspace(0, s[-1], n)
    return np.stack([np.interp(t, s, pts[:, 0]), np.interp(t, s, pts[:, 1])], 1)


out = {}
for name, L in LETTERS.items():
    polys = parse(L["path"]) + [[(x, y), (x + w, y), (x + w, y + h), (x, y + h)] for x, y, w, h in L["runs"]]
    allp = np.concatenate([np.asarray(p) for p in polys])
    ox, oy = -allp[:, 0].min() + 2, -allp[:, 1].min() + 2
    W, H = int((allp[:, 0].max() + ox + 2) * SS), int((allp[:, 1].max() + oy + 2) * SS)
    img = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(img)
    for p in polys:
        draw.polygon([((x + ox) * SS, (y + oy) * SS) for x, y in p], fill=255)
    D = ndimage.distance_transform_edt(np.asarray(img) > 127) / SS

    def at(x, y):
        X, Y = (x + ox) * SS, (y + oy) * SS
        if not (0 <= X < W - 2 and 0 <= Y < H - 2):
            return -1.0
        x0, y0 = int(X), int(Y); fx, fy = X - x0, Y - y0
        v = D[y0:y0 + 2, x0:x0 + 2]
        return float(v[0, 0] * (1 - fx) * (1 - fy) + v[0, 1] * fx * (1 - fy) + v[1, 0] * (1 - fx) * fy + v[1, 1] * fx * fy)

    g = resample(guide_points(L["guide"]), STEP)
    tang = np.gradient(g, axis=0); tang /= np.hypot(*tang.T)[:, None]
    nrm = np.stack([-tang[:, 1], tang[:, 0]], 1)
    ridge = []
    for (x, y), (nx, ny) in zip(g, nrm):
        offs = np.arange(-6, 6.01, 0.02)
        vals = [at(x + nx * o, y + ny * o) for o in offs]
        o = offs[int(np.argmax(vals))]
        ridge.append((x + nx * o, y + ny * o))
    ridge = np.asarray(ridge)
    k = int(round(3 / STEP))  # smoothing over 3 units of the track, whatever the step
    pad = np.concatenate([np.repeat(ridge[:1], k, 0), ridge, np.repeat(ridge[-1:], k, 0)])
    ker = np.ones(2 * k + 1) / (2 * k + 1)
    centre = resample(np.stack([np.convolve(pad[:, 0], ker, "valid"), np.convolve(pad[:, 1], ker, "valid")], 1), STEP)
    half = np.array([at(x, y) for x, y in centre])
    # the radius follows the stroke, smoothed so it never flickers where the stroke's edge turns a corner
    radius = np.convolve(np.concatenate([np.repeat(half[:1], k, 0), half, np.repeat(half[-1:], k, 0)]), ker, "valid")
    radius = np.minimum(radius, half) * SHARE
    rx, ry = L["rest"]
    rest = int(np.hypot(centre[:, 0] - rx, centre[:, 1] - ry).argmin())
    pts = np.column_stack([centre, radius])
    out[name] = {"points": [round(float(v), 2) for v in pts.ravel()], "rest": rest}
    print(f"{name}: {len(pts)} points, rest #{rest} at ({pts[rest,0]:.2f}, {pts[rest,1]:.2f}) r {pts[rest,2]:.2f}, "
          f"radius {radius.min():.2f} to {radius.max():.2f}, stroke {2*half.min():.2f} to {2*half.max():.2f}")

with open(OUT, "w") as fh:
    json.dump(out, fh, separators=(",", ":"))
print("wrote", os.path.relpath(OUT), os.path.getsize(OUT), "bytes")
