// Main app: chrome, layout variants, scroll-reveal, tweaks

const { useState, useEffect, useRef, useMemo } = React;

function Chrome({ current, onTheme, theme }) {
  const items = ["about", "research", "software", "talks", "teaching", "consulting", "contact"];
  return (
    <header className="chrome">
      <a className="brand plain" href="#top">
        <span className="dot" />
        <span>Maximilian Bloor</span>
        <span className="muted mono" style={{marginLeft: 6, fontSize: 11}}>/ {BIO.handle}</span>
      </a>
      <nav>
        {items.map(id => (
          <a key={id} href={`#${id}`} className={current === id ? "current" : ""}>{id}</a>
        ))}
        <button className="theme-toggle" onClick={onTheme} aria-label="toggle theme">
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
}

function SideNav({ current }) {
  return (
    <aside className="sidenav">
      <div className="nav-brand">Maximilian Bloor</div>
      <div className="nav-sub">PhD, Imperial College London</div>
      {NAV_ITEMS.map(n => (
        <a key={n.id} href={`#${n.id}`} data-count={n.count} className={current === n.id ? "current" : ""}>
          {n.label}
        </a>
      ))}
    </aside>
  );
}

/* ---------- V3 Tile landing ---------- */
function TileLanding() {
  const latest = PUBLICATIONS[0];
  return (
    <section className="reveal">
      <div className="hero" style={{paddingBottom: 20}}>
        <Eyebrow>Maximilian Bloor — PhD, Imperial College London</Eyebrow>
        <div className="hero-row" style={{marginTop: 18}}>
          <img className="portrait portrait-lg" src={BIO.photo} alt={BIO.name} />
          <h1>
            {BIO.name}.
          </h1>
        </div>
      </div>
      <div className="tile-grid">
        <a href="#research" className="tile span-3 row-2 plain">
          <div>
            <div className="t-eyebrow">Latest paper</div>
            <h3>{latest.title}</h3>
            <div className="t-body">{latest.abstract}</div>
          </div>
          <div className="t-meta">{latest.venue} · {latest.year}</div>
        </a>
        <a href="#consulting" className="tile span-3 plain accent">
          <div>
            <div className="t-eyebrow">Available</div>
            <h3>BO consulting for chem-eng teams</h3>
          </div>
          <div className="t-meta">{BIO.email}</div>
        </a>
        <a href="#software" className="tile span-2 plain">
          <div className="t-eyebrow">Software</div>
          <h3 style={{fontSize: 18}}>PC-Gym</h3>
          <div className="t-meta">RL benchmark for process control</div>
        </a>
        <a href="#talks" className="tile span-1 plain ghost">
          <div className="t-eyebrow">Talks</div>
          <div className="t-meta" style={{marginTop: "auto", fontSize: 22, color: "var(--ink)", fontFamily: "var(--serif)"}}>{String(TALKS.length).padStart(2, "0")}</div>
        </a>
        <a href="#about" className="tile span-6 plain">
          <div className="t-eyebrow">Now</div>
          <h3 style={{fontSize: 20, maxWidth: 720}}>{BIO.now}</h3>
          <div className="t-meta">{BIO.location}</div>
        </a>
      </div>
    </section>
  );
}

/* ---------- Tweaks panel ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "v1",
  "accent": "ember",
  "theme": "light"
}/*EDITMODE-END*/;

function TweaksPanel({ on, state, set }) {
  return (
    <div className={`tweaks-panel ${on ? "on" : ""}`}>
      <h4>Tweaks</h4>
      <div className="tweak-row">
        <label>Layout</label>
        <div className="opts">
          {[
            ["v1", "Editorial"],
            ["v2", "Two-column"],
            ["v3", "Quiet grid"]
          ].map(([k, l]) => (
            <span key={k} className={`opt ${state.layout === k ? "on" : ""}`} onClick={() => set({layout: k})}>{l}</span>
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Accent</label>
        <div className="swatches">
          {["ember", "moss", "indigo", "plum"].map(c => (
            <span key={c} className={`swatch ${state.accent === c ? "on" : ""}`} data-c={c} onClick={() => set({accent: c})} />
          ))}
        </div>
      </div>
      <div className="tweak-row">
        <label>Theme</label>
        <div className="opts">
          {["light", "dark"].map(t => (
            <span key={t} className={`opt ${state.theme === t ? "on" : ""}`} onClick={() => set({theme: t})}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function useScrollReveal(deps) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    // Immediately reveal anything already in viewport so first-paint content is visible
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95) el.classList.add("in");
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

function useCurrentSection(setCurrent, deps) {
  useEffect(() => {
    const ids = ["about", "research", "software", "talks", "teaching", "consulting", "contact"];
    const onScroll = () => {
      let best = "about";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.4) best = id;
      }
      setCurrent(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, deps);
}

function useEditMode(setState) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const handler = (ev) => {
      const msg = ev.data;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "__activate_edit_mode") setOn(true);
      if (msg.type === "__deactivate_edit_mode") setOn(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({type: "__edit_mode_available"}, "*");
    return () => window.removeEventListener("message", handler);
  }, []);
  const set = (patch) => {
    setState(s => ({...s, ...patch}));
    window.parent.postMessage({type: "__edit_mode_set_keys", edits: patch}, "*");
  };
  return { on, set };
}

function App() {
  const [state, setState] = useState(TWEAK_DEFAULTS);
  const [current, setCurrent] = useState("about");
  const { on, set } = useEditMode(setState);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
    document.documentElement.setAttribute("data-accent", state.accent);
    document.body.setAttribute("data-layout", state.layout);
  }, [state]);

  const toggleTheme = () => set({ theme: state.theme === "dark" ? "light" : "dark" });

  useScrollReveal([state.layout]);
  useCurrentSection(setCurrent, [state.layout]);

  const mainSections = (
    <>
      <Bio />
      <Publications />
      <Software />
      {/* <Writing /> */}
      <Talks />
      <Teaching />
      <Consultancy />
      <CV />
      <Contact />
    </>
  );

  return (
    <div key={state.layout} data-layout={state.layout}>
      <Landscape />
      <Chrome current={current} onTheme={toggleTheme} theme={state.theme} />
      <div id="top" />

      {state.layout === "v2" ? (
        <div className="page">
          <SideNav current={current} />
          <main className="content">
            <Hero />
            {mainSections}
          </main>
        </div>
      ) : (
        <main className={state.layout === "v3" ? "page page-wide" : "page"}>
          {state.layout === "v3" ? <TileLanding /> : <Hero />}
          {mainSections}
        </main>
      )}

      <footer>
        <span>© {new Date().getFullYear()} Maximilian Bloor</span>
        <span>Built as a quiet place to put papers, notes, and the occasional consulting enquiry.</span>
      </footer>

      <TweaksPanel on={on} state={state} set={set} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
