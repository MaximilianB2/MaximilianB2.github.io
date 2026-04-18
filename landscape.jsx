// Loss-landscape backdrop with a constraint that the optimum touches.

const { useEffect, useRef, useMemo } = React;

// Analytic height field. Domain 0..100. Lower = better.
function heightAt(x, y) {
  const g1 = Math.exp(-(((x - 18) ** 2) / 280 + ((y - 18) ** 2) / 220)) * 1.0;
  const g2 = Math.exp(-(((x - 78) ** 2) / 260 + ((y - 42) ** 2) / 300)) * 0.55;
  const g3 = Math.exp(-(((x - 28) ** 2) / 400 + ((y - 72) ** 2) / 260)) * 0.35;
  const well = -Math.exp(-(((x - 80) ** 2) / 900 + ((y - 82) ** 2) / 800)) * 1.2;
  return g1 + g2 + g3 + well + 0.1 * Math.sin(x * 0.15) * Math.cos(y * 0.18);
}

// Constraint g(x,y) <= 0. A curved boundary passing through the lower-right
// that separates the (unconstrained) minimum in the bottom-right well from
// the feasible region above-left of the curve. Active at the solution.
// Line: y = 0.55*x + 30  (roughly diagonal across bottom-right).
// Feasible: y <= 0.55*x + 30 - 6*sin(x/18)  (a gently wavy boundary).
function constraintY(x) {
  return 0.55 * x + 30 - 6 * Math.sin(x / 18);
}
function gConstraint(x, y) {
  // positive = infeasible (below the boundary curve in our y-up-is-down SVG frame)
  return y - constraintY(x);
}
function constraintD() {
  const pts = [];
  for (let x = -2; x <= 102; x += 2) pts.push([x, constraintY(x)]);
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
}

// Marching squares contours
function contourPaths(level, res = 56) {
  const step = 100 / res;
  const grid = [];
  for (let j = 0; j <= res; j++) {
    const row = [];
    for (let i = 0; i <= res; i++) row.push(heightAt(i * step, j * step));
    grid.push(row);
  }
  const segs = [];
  const interp = (x1, y1, v1, x2, y2, v2) => {
    const t = (level - v1) / (v2 - v1);
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
  };
  for (let j = 0; j < res; j++) {
    for (let i = 0; i < res; i++) {
      const x0 = i * step, x1 = (i + 1) * step;
      const y0 = j * step, y1 = (j + 1) * step;
      const v00 = grid[j][i], v10 = grid[j][i+1], v11 = grid[j+1][i+1], v01 = grid[j+1][i];
      let code = 0;
      if (v00 > level) code |= 1;
      if (v10 > level) code |= 2;
      if (v11 > level) code |= 4;
      if (v01 > level) code |= 8;
      if (code === 0 || code === 15) continue;
      const pts = [];
      if ((v00 > level) !== (v10 > level)) pts.push(interp(x0, y0, v00, x1, y0, v10));
      if ((v10 > level) !== (v11 > level)) pts.push(interp(x1, y0, v10, x1, y1, v11));
      if ((v11 > level) !== (v01 > level)) pts.push(interp(x1, y1, v11, x0, y1, v01));
      if ((v01 > level) !== (v00 > level)) pts.push(interp(x0, y1, v01, x0, y0, v00));
      if (pts.length >= 2) segs.push([pts[0], pts[1]]);
      if (pts.length === 4) segs.push([pts[2], pts[3]]);
    }
  }
  return segs;
}

// Projected gradient descent: standard step, then if infeasible, project
// back onto the boundary along the constraint normal. Terminates on the
// active boundary — the constrained optimum.
function descentPath(steps = 140) {
  let x = 14, y = 14;
  const pts = [[x, y]];
  const eps = 0.4;
  for (let k = 0; k < steps; k++) {
    const h  = heightAt(x, y);
    const hx = (heightAt(x + eps, y) - h) / eps;
    const hy = (heightAt(x, y + eps) - h) / eps;
    const lr = 1.9 + k * 0.01;
    x -= lr * hx;
    y -= lr * hy;
    // slight drift
    x += Math.sin(k * 0.32) * 0.18;
    y += Math.cos(k * 0.26) * 0.18;
    // Project if infeasible: constraint boundary y = f(x). Here we project
    // vertically for simplicity (close enough at gentle slopes).
    const cy = constraintY(x);
    if (y > cy) y = cy;
    x = Math.max(3, Math.min(97, x));
    y = Math.max(3, Math.min(97, y));
    pts.push([x, y]);
  }
  return pts;
}

function segsToD(segs) {
  return segs.map(([a, b]) => `M${a[0].toFixed(2)} ${a[1].toFixed(2)} L${b[0].toFixed(2)} ${b[1].toFixed(2)}`).join(" ");
}
function ptsToD(pts) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
}

function Landscape() {
  const markerRef = useRef(null);
  const haloRef = useRef(null);

  const { contours, bolds, pathD, pts, cD, endPt } = useMemo(() => {
    const levels = [-1.1, -0.9, -0.7, -0.5, -0.35, -0.2, -0.05, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1.0];
    const boldLevels = new Set([-0.9, -0.35, 0.1, 0.55, 1.0]);
    const contours = [];
    const bolds = [];
    for (const L of levels) {
      const segs = contourPaths(L, 56);
      if (boldLevels.has(L)) bolds.push(segsToD(segs));
      else contours.push(segsToD(segs));
    }
    const pts = descentPath(140);
    return { contours, bolds, pathD: ptsToD(pts), pts, cD: constraintD(), endPt: pts[pts.length - 1] };
  }, []);

  useEffect(() => {
    /* --- Archived: Marker scroll logic ---
    const onScroll = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const t = Math.max(0, Math.min(1, window.scrollY / max));
      const idx = t * (pts.length - 1);
      const i0 = Math.floor(idx), i1 = Math.min(pts.length - 1, i0 + 1);
      const f = idx - i0;
      const x = pts[i0][0] + (pts[i1][0] - pts[i0][0]) * f;
      const y = pts[i0][1] + (pts[i1][1] - pts[i0][1]) * f;
      if (markerRef.current) {
        markerRef.current.setAttribute("cx", x);
        markerRef.current.setAttribute("cy", y);
      }
      if (haloRef.current) {
        haloRef.current.setAttribute("cx", x);
        haloRef.current.setAttribute("cy", y);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    --------------------------------------- */
  }, [pts]);

  return (
    <div className="landscape" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {contours.map((d, i) => <path key={`c${i}`} className="contour" d={d} />)}
        {bolds.map((d, i) => <path key={`b${i}`} className="contour bold" d={d} />)}
        {/* <path className="constraint" d={cD} /> */}
        {/* <path className="path" d={pathD} /> */}
        {/* Endpoint sits on the constraint — mark it with a tiny tick */}
        {/*
        <circle className="end-ring" cx={endPt[0]} cy={endPt[1]} r="1.2" />
        <circle ref={haloRef} className="marker-halo" r="1.2" cx="14" cy="14" />
        <circle ref={markerRef} className="marker-core" r="0.45" cx="14" cy="14" />
        */}
      </svg>
    </div>
  );
}

Object.assign(window, { Landscape });
