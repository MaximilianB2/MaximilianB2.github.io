// Section components

const { useState, useEffect, useMemo, useRef } = React;

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function SectionHead({ id, title, meta }) {
  return (
    <div className="section-head" id={id}>
      <h2>{title}</h2>
      {meta && <span className="meta">{meta}</span>}
    </div>
  );
}

/* ---------- Hero / Bio ---------- */
function Hero() {
  return (
    <section className="hero reveal">
      <Eyebrow>01 — {BIO.role}</Eyebrow>
      <div className="hero-row" style={{marginTop: 18}}>
        <img className="portrait portrait-lg" src={BIO.photo} alt={BIO.name} />
        <div>
          <h1>
            {BIO.name}.
          </h1>
          <p className="lede" style={{marginTop: 22}}>
            PhD candidate at Imperial College London, working with the{" "}
            <a href={BIO.groups[0].url} target="_blank" rel="noreferrer">OptiML-PSE</a>{" "}
            and{" "}
            <a href={BIO.groups[1].url} target="_blank" rel="noreferrer">Tsay</a>{" "}
            groups on reinforcement learning, Bayesian optimization, and process
            systems engineering.
          </p>
          <div className="quick sans">
            <span>{BIO.location}</span>
            <span><a href={`mailto:${BIO.email}`}>{BIO.email}</a></span>
            <span><a href={BIO.scholar} target="_blank" rel="noreferrer">google scholar</a></span>
            <span><a href={`https://github.com/${BIO.github}`} target="_blank" rel="noreferrer">github/{BIO.github}</a></span>
            <span><a href={`https://linkedin.com/in/${BIO.linkedin}`} target="_blank" rel="noreferrer">linkedin</a></span>
            <span><a href="#cv">CV (PDF)</a></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bio() {
  return (
    <section className="section bio reveal" id="about">
      <SectionHead title="About" meta="02" />
      <p>
        I'm in the third year of a PhD in Chemical Engineering &amp; Computer Science at Imperial,
        supervised in the PSE group. My work sits between RL theory  and the messier job of getting those ideas to survive a
        real industrial plant.
      </p>
      <p>
        My thesis — <em>{BIO.thesis}</em> — is advised by{" "}
        <a href="https://www.optimlpse.co.uk/" target="_blank" rel="noreferrer">Dr. Antonio del Rio-Chanona</a>{" "}
        and <a href="https://www.doc.ic.ac.uk/~ctsay/group/" target="_blank" rel="noreferrer">Dr. Calvin Tsay</a>,
        across the Department of Chemical Engineering and the Department of Computing.
      </p>
      <p>
        Previously: MSc (Distinction) at Imperial, BEng (1st) at Edinburgh. Recent stops
        include Secondmind (batch BO), CrossnoKaye (offline RL for refrigeration), and the
        Alberta Machine Intelligence Institute (model-based RL for demand response).
      </p>
      <div className="now">{BIO.now}</div>
    </section>
  );
}

/* ---------- Publications ---------- */
function Publication({ pub, open, onToggle, onCopy, copied }) {
  return (
    <div className={`pub ${open ? "open" : ""}`} onClick={onToggle}>
      <div className="year mono">{pub.year}</div>
      <div className="body">
        <h3>{pub.title}</h3>
        <div className="venue">
          {pub.authors} · <em>{pub.venue}</em>
          {pub.venueNote && <> · {pub.venueNote}</>}
          {pub.kind && <> · {pub.kind}</>}
        </div>
        <div className="abstract">{pub.abstract}</div>
        <div className="tags">
          {pub.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
      <div className="actions" onClick={e => e.stopPropagation()}>
        <button onClick={() => onCopy(pub)} className={copied ? "copied" : ""}>
          {copied ? "copied" : "bibtex"}
        </button>
        <button onClick={(e) => { e.stopPropagation(); alert(`PDF for ${pub.bibkey} not attached in this demo.`); }}>
          pdf
        </button>
      </div>
    </div>
  );
}

function Publications() {
  const [openIdx, setOpenIdx] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [topic, setTopic] = useState("all");
  const [year, setYear] = useState("all");
  const [kind, setKind] = useState("all");

  const topics = useMemo(() => {
    const s = new Set();
    PUBLICATIONS.forEach(p => p.tags.forEach(t => s.add(t)));
    return ["all", ...Array.from(s)];
  }, []);
  const years = useMemo(() => ["all", ...Array.from(new Set(PUBLICATIONS.map(p => p.year))).sort((a,b)=>b-a)], []);

  const filtered = PUBLICATIONS.filter(p =>
    (topic === "all" || p.tags.includes(topic)) &&
    (year === "all"  || p.year === year) &&
    (kind === "all"  || p.kind === kind)
  );

  const copy = async (pub) => {
    try { await navigator.clipboard.writeText(pub.bib); } catch {}
    setCopiedKey(pub.bibkey);
    setTimeout(() => setCopiedKey(k => (k === pub.bibkey ? null : k)), 1400);
  };

  return (
    <section className="section reveal" id="research">
      <SectionHead title="Research" meta={`03 — ${PUBLICATIONS.length} papers`} />

      <div className="filters">
        <div className="group">
          <span className="label">type</span>
          {[["all","all"],["journal","journal"],["conference","conference"]].map(([k,l]) => (
            <button key={k} className={`chip ${kind === k ? "active" : ""}`} onClick={() => setKind(k)}>{l}</button>
          ))}
        </div>
        <div className="group">
          <span className="label">topic</span>
          {topics.map(t => (
            <button key={t} className={`chip ${topic === t ? "active" : ""}`} onClick={() => setTopic(t)}>{t}</button>
          ))}
        </div>
        <div className="group">
          <span className="label">year</span>
          {years.map(y => (
            <button key={y} className={`chip ${year === y ? "active" : ""}`} onClick={() => setYear(y)}>{y}</button>
          ))}
        </div>
      </div>

      <div style={{marginTop: 20}}>
        {filtered.map((p, i) => (
          <Publication
            key={p.bibkey}
            pub={p}
            open={openIdx === p.bibkey}
            onToggle={() => setOpenIdx(openIdx === p.bibkey ? null : p.bibkey)}
            onCopy={copy}
            copied={copiedKey === p.bibkey}
          />
        ))}
        {filtered.length === 0 && <div className="muted sans" style={{padding: "40px 0", fontSize: 13}}>No papers match these filters.</div>}
      </div>
    </section>
  );
}

/* ---------- Software ---------- */
function Software() {
  return (
    <section className="section reveal" id="software">
      <SectionHead title="Software" meta="04" />
      <div className="list">
        {SOFTWARE.map((s, i) => (
          <div className="item" key={i}>
            <div className="when mono">repo</div>
            <div className="what">
              <h3>{s.name}</h3>
              <div className="sub"><em>{s.blurb}</em></div>
            </div>
            <div className="where"><a href={s.url} target="_blank" rel="noreferrer">github →</a></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Writing ---------- */
function Writing() {
  return (
    <section className="section reveal" id="writing">
      <SectionHead title="Writing" meta="04 — notes, essays, field reports" />
      <div className="list writing">
        {WRITING.map((w, i) => (
          <div className="item" key={i}>
            <div className="when mono">{w.when}</div>
            <div className="what">
              <h3>{w.title}</h3>
              <div className="sub"><em>{w.tag}</em></div>
              <p>{w.excerpt}</p>
              <a className="readmore plain" href="#" onClick={e => e.preventDefault()}>Read</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Talks ---------- */
function Talks() {
  return (
    <section className="section reveal" id="talks">
      <SectionHead title="Talks" meta="05" />
      <div className="list">
        {TALKS.map((t, i) => (
          <div className="item" key={i}>
            <div className="when mono">{t.when}</div>
            <div className="what">
              <h3>{t.what}</h3>
              <div className="sub"><em>{t.sub}</em></div>
            </div>
            <div className="where">{t.where}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Teaching ---------- */
function Teaching() {
  return (
    <section className="section reveal" id="teaching">
      <SectionHead title="Teaching" meta="06" />
      <div className="list">
        {TEACHING.map((t, i) => (
          <div className="item" key={i}>
            <div className="when mono">{t.when}</div>
            <div className="what">
              <h3>{t.what}</h3>
              <div className="sub"><em>{t.sub}</em></div>
            </div>
            <div className="where">{t.where}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Consultancy ---------- */
function Consultancy() {
  return (
    <section className="section reveal" id="consulting">
      <SectionHead title="Consulting" meta="07" />
      <div className="consult">
        <span className="badge">Available · RL & BO</span>
        <div className="copy">
          <h3>Reinforcement Learning and Bayesian Optimization</h3>
          <p>
            I take on a small number of consulting engagements each year — typically helping teams
            apply Reinforcement Learning and Bayesian Optimization to decision-making and 
            optimization problems. Happy to scope a short discovery call.
          </p>
        </div>
        <a className="cta plain" href={`mailto:${BIO.email}?subject=Consulting%20enquiry`}>
          Get in touch →
        </a>
      </div>
    </section>
  );
}

/* ---------- CV ---------- */
function CV() {
  return (
    <section className="section reveal" id="cv">
      <SectionHead title="CV" meta="08" />
      <div className="list">
        <div className="item">
          <div className="when mono">PDF</div>
          <div className="what">
            <h3>Curriculum vitae</h3>
            <div className="sub"><em>Updated April 2026</em></div>
          </div>
          <div className="where"><a href="uploads/cv_file-1776519300473.pdf" target="_blank" rel="noreferrer">Download →</a></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section className="section reveal" id="contact">
      <SectionHead title="Contact" meta="09" />
      <p style={{maxWidth: 560, color: "var(--ink-2)"}}>
        The best way to reach me is email. I read everything; I reply to most things within
        a week. For consulting enquiries, please include a one-line description of the problem.
      </p>
      <div style={{marginTop: 20, fontFamily: "var(--sans)", fontSize: 14, display: "flex", gap: 22, flexWrap: "wrap"}}>
        <a href={`mailto:${BIO.email}`}>{BIO.email}</a>
        <a href={`https://github.com/${BIO.github}`} target="_blank" rel="noreferrer">github</a>
        <a href={`https://linkedin.com/in/${BIO.linkedin}`} target="_blank" rel="noreferrer">linkedin</a>
        <a href={BIO.scholar} target="_blank" rel="noreferrer">google scholar</a>
      </div>
    </section>
  );
}

Object.assign(window, {
  Hero, Bio, Publications, Software, Writing, Talks, Teaching, Consultancy, CV, Contact, SectionHead
});
