// Content for Maximilian Bloor's site — sourced from detailed CV

const BIO = {
  name: "Maximilian Bloor",
  handle: "max.bloor",
  role: "PhD, Imperial College London",
  thesis: "Control and Optimisation of Uncertain Chemical Processes",
  advisors: "Dr. E. A. del Rio-Chanona · Dr. C. Tsay",
  location: "London, UK",
  email: "max.bloor@gmail.com",
  github: "MaximilianB2",
  linkedin: "maximilian-bloor",
  scholar: "https://scholar.google.com/citations?user=CfxSo7IAAAAJ&hl=en",
  photo: "assets/max.jpg",
  groups: [
    { name: "OptiML-PSE",  url: "https://www.optimlpse.co.uk/" },
    { name: "Tsay Group",  url: "https://www.doc.ic.ac.uk/~ctsay/group/" }
  ],
  now: "Wrapping up an ML research internship at Secondmind on scalable batch Bayesian optimization. Writing up Gaussian-process Q-learning results."
};

// Publications split into journal / conference (CV order preserved)
const PUBLICATIONS = [
  {
    year: 2025, kind: "journal",
    title: "A Survey and Tutorial of Reinforcement Learning Methods in Process Systems Engineering",
    authors: "M. Bloor, M. Mowbray, E. A. del Rio-Chanona, C. Tsay",
    venue: "Computers & Chemical Engineering",
    tags: ["RL", "PSE", "survey"],
    abstract: "A survey and tutorial introducing reinforcement learning methods to the process-systems-engineering community, with worked examples and an opinionated guide to common pitfalls.",
    bibkey: "bloor2025rlsurvey",
    bib: `@article{bloor2025rlsurvey,
  title   = {A Survey and Tutorial of Reinforcement Learning Methods in Process Systems Engineering},
  author  = {Bloor, Maximilian and Mowbray, Max and del Rio-Chanona, E. A. and Tsay, Calvin},
  journal = {Computers \\& Chemical Engineering},
  year    = {2025}
}`
  },
  {
    year: 2025, kind: "journal",
    title: "Control-Informed Reinforcement Learning for Chemical Processes",
    authors: "M. Bloor, A. Ahmed, N. Kotecha, M. Mercangöz, C. Tsay, E. A. del Rio-Chanona",
    venue: "Industrial & Engineering Chemistry Research",
    tags: ["RL", "control", "PSE"],
    abstract: "Integrating PID control components directly into deep RL policy architectures, improving sample efficiency and robustness to external disturbances across a suite of chemical process benchmarks.",
    bibkey: "bloor2025cirl",
    bib: `@article{bloor2025cirl,
  title   = {Control-Informed Reinforcement Learning for Chemical Processes},
  author  = {Bloor, Maximilian and Ahmed, A. and Kotecha, N. and Mercang{\\"o}z, M. and Tsay, Calvin and del Rio-Chanona, E. A.},
  journal = {Industrial \\& Engineering Chemistry Research},
  year    = {2025}
}`
  },
  {
    year: 2025, kind: "journal",
    title: "PC-Gym: Benchmark Environments for Process Control Problems",
    authors: "M. Bloor, J. Torraca, I. O. Sandoval, A. Ahmed, M. White, M. Mercangöz, C. Tsay, E. A. del Rio-Chanona, M. Mowbray",
    venue: "Computers & Chemical Engineering",
    tags: ["RL", "benchmark", "software"],
    abstract: "An open-source Python library for process-control benchmarking with enforced state/action constraints, paired with baselines comparing RL policies against model-based control.",
    bibkey: "bloor2025pcgym",
    bib: `@article{bloor2025pcgym,
  title   = {PC-Gym: Benchmark Environments for Process Control Problems},
  author  = {Bloor, Maximilian and Torraca, J. and Sandoval, I. O. and Ahmed, A. and White, M. and Mercang{\\"o}z, M. and Tsay, Calvin and del Rio-Chanona, E. A. and Mowbray, Max},
  journal = {Computers \\& Chemical Engineering},
  year    = {2025}
}`
  },
  {
    year: 2025, kind: "conference",
    title: "Gaussian Process Q-Learning for Finite-Horizon Markov Decision Processes",
    authors: "M. Bloor, T. Savage, C. Tsay, E. A. del Rio-Chanona, M. Mowbray",
    venue: "Reinforcement Learning Conference (RLC)",
    tags: ["RL", "GP", "theory"],
    abstract: "An RL framework combining Gaussian processes with Q-learning for finite-horizon MDPs, with theoretical convergence guarantees.",
    bibkey: "bloor2025gpql",
    bib: `@inproceedings{bloor2025gpql,
  title     = {Gaussian Process Q-Learning for Finite-Horizon Markov Decision Processes},
  author    = {Bloor, Maximilian and Savage, T. and Tsay, Calvin and del Rio-Chanona, E. A. and Mowbray, Max},
  booktitle = {Reinforcement Learning Conference (RLC)},
  year      = {2025}
}`
  },
  {
    year: 2025, kind: "conference",
    title: "Hierarchical RL-MPC for Demand Response Scheduling",
    authors: "M. Bloor, E. A. del Rio-Chanona, C. Tsay",
    venue: "IFAC-PapersOnLine (DYCOPS)",
    tags: ["RL", "MPC", "energy"],
    abstract: "A hierarchical scheme combining RL for long-horizon scheduling with MPC for lower-level control, applied to demand response in industrial settings.",
    bibkey: "bloor2025rlmpc",
    bib: `@article{bloor2025rlmpc,
  title   = {Hierarchical RL-MPC for Demand Response Scheduling},
  author  = {Bloor, Maximilian and del Rio-Chanona, E. A. and Tsay, Calvin},
  journal = {IFAC-PapersOnLine (DYCOPS)},
  year    = {2025}
}`
  },
  {
    year: 2025, kind: "conference",
    title: "A Subset Selection Strategy for Gaussian Process Q-Learning of Process Optimization and Control",
    authors: "M. Bloor, T. Savage, C. Tsay, E. A. del Rio-Chanona, M. Mowbray",
    venue: "Systems and Control Transactions (ESCAPE35)",
    tags: ["RL", "GP", "PSE"],
    abstract: "A subset-selection strategy to scale Gaussian-process Q-learning for process optimisation and control problems with many observations.",
    bibkey: "bloor2025subset",
    bib: `@inproceedings{bloor2025subset,
  title     = {A Subset Selection Strategy for Gaussian Process Q-Learning of Process Optimization and Control},
  author    = {Bloor, Maximilian and Savage, T. and Tsay, Calvin and del Rio-Chanona, E. A. and Mowbray, Max},
  booktitle = {Systems and Control Transactions (ESCAPE35)},
  year      = {2025}
}`
  },
  {
    year: 2025, kind: "conference",
    title: "MORL4PC: Multi-Objective Reinforcement Learning for Process Control",
    authors: "N. Kotecha, M. Bloor, C. Tsay, E. A. del Rio-Chanona",
    venue: "Systems and Control Transactions (ESCAPE35)",
    tags: ["RL", "PSE"],
    abstract: "A multi-objective RL formulation for process-control problems balancing throughput, safety, and energy-use objectives.",
    bibkey: "kotecha2025morl4pc",
    bib: `@inproceedings{kotecha2025morl4pc,
  title     = {MORL4PC: Multi-Objective Reinforcement Learning for Process Control},
  author    = {Kotecha, N. and Bloor, Maximilian and Tsay, Calvin and del Rio-Chanona, E. A.},
  booktitle = {Systems and Control Transactions (ESCAPE35)},
  year      = {2025}
}`
  },
  {
    year: 2024, kind: "conference",
    title: "Hierarchical Reinforcement Learning for Plantwide Control",
    authors: "M. Bloor, A. Ahmed, N. Kotecha, C. Tsay, M. Mercangöz, E. A. del Rio-Chanona",
    venue: "Computer Aided Chemical Engineering (ESCAPE34)",
    tags: ["RL", "PSE", "control"],
    abstract: "Applying a hierarchical RL architecture to plantwide control problems, with case studies on integrated chemical processes.",
    bibkey: "bloor2024hrl",
    bib: `@inproceedings{bloor2024hrl,
  title     = {Hierarchical Reinforcement Learning for Plantwide Control},
  author    = {Bloor, Maximilian and Ahmed, A. and Kotecha, N. and Tsay, Calvin and Mercang{\\"o}z, M. and del Rio-Chanona, E. A.},
  booktitle = {Computer Aided Chemical Engineering (ESCAPE34)},
  year      = {2024}
}`
  }
];

const TALKS = [
  { when: "Jan 2026", what: "Gaussian Process Q-Learning for Finite-Horizon MDPs", sub: "Control & Optimization Seminar, Imperial College London", where: "London, UK" },
  { when: "Nov 2025", what: "Control-Informed Reinforcement Learning for Chemical Processes", sub: "AIChE Annual Meeting — Oral", where: "Boston, USA" },
  { when: "Nov 2025", what: "Gaussian Process Q-Learning for Finite-Horizon MDPs", sub: "AIChE Annual Meeting — Poster", where: "Boston, USA" },
  { when: "Aug 2025", what: "Gaussian Process Q-Learning for Finite-Horizon MDPs", sub: "Reinforcement Learning Conference / Tea Time Talks (Amii)", where: "Edmonton, Canada" },
  { when: "Jul 2025", what: "A Subset Selection Strategy for GP Q-Learning", sub: "ESCAPE35", where: "Ghent, Belgium" },
  { when: "Jun 2025", what: "Hierarchical RL-MPC for Demand Response Scheduling", sub: "DYCOPS", where: "Bratislava, Slovakia" },
  { when: "Jul 2024", what: "Control-Informed Reinforcement Learning for Chemical Processes", sub: "ML & AI in (bio)Chemical Engineering, Cambridge University", where: "Cambridge, UK" },
  { when: "Jun 2024", what: "Hierarchical Reinforcement Learning for Plantwide Control", sub: "ESCAPE34", where: "Florence, Italy" }
];

const TEACHING = [
  { when: "2024 – 2025", what: "GTA — Process Dynamics and Control", sub: "MEng Chemical Engineering, Imperial College", where: "PhD TA" },
  { when: "2023 – 2026", what: "Project Supervisor (co)", sub: "MEng & MSc (Computing and Chemical Engineering)", where: "Imperial" }
];

const WRITING = [
  { when: "Feb 2026", title: "Notes on batch Bayesian optimization at scale", excerpt: "Practical considerations when pushing batch BO past a few dozen design variables — kernel choice, acquisition parallelism, and what breaks first.", tag: "note" },
  { when: "Nov 2025", title: "Why PID still beats your RL policy", excerpt: "A defense of classical control as a baseline, and why control-informed architectures are more than a trick — with sharp examples from refrigeration.", tag: "essay" },
  { when: "Aug 2025", title: "An honest field report from an offline-RL deployment", excerpt: "What actually happens when you deploy offline RL against a running industrial plant. Dataset curation ate 80% of the calendar; reward shaping ate most of the rest.", tag: "field report" },
  { when: "May 2025", title: "Gaussian processes, from the outside in", excerpt: "A visual introduction aimed at chemical engineers who keep running into GPs in BO and surrogate modeling, without the measure-theoretic detour.", tag: "tutorial" }
];

const SOFTWARE = [
  { name: "PC-Gym", url: "https://github.com/MaximilianB2/pc-gym", blurb: "Open-source Python library for benchmarking RL in process-control environments, with constrained simulations and model-based baselines." }
];

const NAV_ITEMS = [
  { id: "research",   label: "Research",   count: String(PUBLICATIONS.length).padStart(2, "0") },
  { id: "software",   label: "Software",   count: "01" },
  // { id: "writing",    label: "Writing",    count: String(WRITING.length).padStart(2, "0") },
  { id: "talks",      label: "Talks",      count: String(TALKS.length).padStart(2, "0") },
  { id: "teaching",   label: "Teaching",   count: String(TEACHING.length).padStart(2, "0") },
  { id: "consulting", label: "Consulting", count: "→" },
  { id: "contact",    label: "Contact",    count: "→" }
];

Object.assign(window, { BIO, PUBLICATIONS, TALKS, TEACHING, WRITING, SOFTWARE, NAV_ITEMS });
