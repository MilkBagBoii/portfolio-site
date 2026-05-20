const portfolio = {
  name: "Your Name",
  initials: "GD",
  itchUrl: "https://yourname.itch.io",
  email: "you@example.com",
  status: "Available for projects",
  summary:
    "Game developer building prototypes, jam games, and release-ready systems across Unity, Unreal Engine, Godot, and custom tools.",
  engines: [
    {
      name: "Unity",
      initials: "U",
      level: "Gameplay and tools",
      color: "#31a8c9",
      confidence: 92,
      notes: "C# gameplay systems, UI flows, input, prototyping, WebGL builds, and iteration tooling."
    },
    {
      name: "Unreal",
      initials: "UE",
      level: "Blueprints and C++",
      color: "#ef4e3a",
      confidence: 78,
      notes: "Blueprint gameplay, C++ extensions, level scripting, animation hooks, and rapid grayboxing."
    },
    {
      name: "Godot",
      initials: "G",
      level: "2D and lightweight 3D",
      color: "#32b06b",
      confidence: 86,
      notes: "GDScript architecture, scene composition, UI, game jams, and fast playable prototypes."
    },
    {
      name: "Custom",
      initials: "C",
      level: "Web and native experiments",
      color: "#7762d6",
      confidence: 70,
      notes: "Small engines, browser games, custom editors, procedural systems, and low-level experiments."
    }
  ],
  skills: [
    {
      title: "Gameplay Systems",
      text: "Player movement, combat loops, ability systems, camera feel, pickups, objectives, and state-driven interactions."
    },
    {
      title: "Rapid Prototyping",
      text: "Fast game-feel passes, jam-scoped production, throwaway tests, and turning rough mechanics into readable loops."
    },
    {
      title: "Technical Art",
      text: "Shader experiments, responsive effects, animation timing, feedback layers, and performance-aware polish."
    },
    {
      title: "Release Readiness",
      text: "Menus, builds, itch.io pages, public links, playtest feedback, accessibility passes, and bug-fix loops."
    }
  ],
  projects: [
    {
      title: "Project One",
      engine: "Unity",
      type: "Action prototype",
      status: "Playable",
      year: "2026",
      description:
        "A tight movement prototype focused on readable combat, responsive controls, and fast restart loops.",
      publicUrl: "https://yourname.itch.io/project-one",
      sourceUrl: "",
      colorA: "#31a8c9",
      colorB: "#f3c84b"
    },
    {
      title: "Project Two",
      engine: "Godot",
      type: "Jam game",
      status: "Released",
      year: "2025",
      description:
        "A small complete game built under jam constraints, with a clean start-to-finish loop and public playable build.",
      publicUrl: "https://yourname.itch.io/project-two",
      sourceUrl: "",
      colorA: "#32b06b",
      colorB: "#171717"
    },
    {
      title: "Project Three",
      engine: "Unreal",
      type: "Systems demo",
      status: "Prototype",
      year: "2025",
      description:
        "A Blueprint and C++ gameplay sandbox for interaction rules, stateful props, and encounter scripting.",
      publicUrl: "",
      sourceUrl: "",
      colorA: "#ef4e3a",
      colorB: "#7762d6"
    },
    {
      title: "Project Four",
      engine: "Custom",
      type: "Browser game",
      status: "Released",
      year: "2024",
      description:
        "A lightweight browser game experiment with hand-tuned arcade feel and minimal custom rendering code.",
      publicUrl: "https://yourname.itch.io/project-four",
      sourceUrl: "",
      colorA: "#f3c84b",
      colorB: "#ef4e3a"
    },
    {
      title: "Project Five",
      engine: "Unity",
      type: "Tooling",
      status: "Prototype",
      year: "2024",
      description:
        "A designer-facing toolset for tuning encounters, testing values, and shortening iteration time.",
      publicUrl: "",
      sourceUrl: "",
      colorA: "#171717",
      colorB: "#31a8c9"
    },
    {
      title: "Project Six",
      engine: "Godot",
      type: "Puzzle game",
      status: "Playable",
      year: "2023",
      description:
        "A compact puzzle project centered on clarity, clean input handling, and a friendly difficulty curve.",
      publicUrl: "https://yourname.itch.io/project-six",
      sourceUrl: "",
      colorA: "#7762d6",
      colorB: "#32b06b"
    }
  ]
};

const state = {
  activeEngine: "All"
};

const bySelector = (selector) => document.querySelector(selector);
const allBySelector = (selector) => Array.from(document.querySelectorAll(selector));

function setProfileContent() {
  document.title = `${portfolio.name} - Game Developer Portfolio`;
  allBySelector("[data-profile-name]").forEach((node) => {
    node.textContent = portfolio.name;
  });
  allBySelector("[data-itch-link]").forEach((node) => {
    node.href = portfolio.itchUrl;
  });

  const emailLink = bySelector("[data-email-link]");
  if (emailLink) {
    emailLink.href = `mailto:${portfolio.email}`;
  }

  bySelector(".brand-mark").textContent = portfolio.initials;
  bySelector("[data-profile-summary]").textContent = portfolio.summary;
  bySelector("[data-build-status]").textContent = portfolio.status;
  bySelector("[data-contact-heading]").textContent = "Let us build something playable.";

  const playableCount = portfolio.projects.filter((project) => project.publicUrl).length;
  bySelector("[data-stat-engines]").textContent = portfolio.engines.length;
  bySelector("[data-stat-projects]").textContent = portfolio.projects.length;
  bySelector("[data-stat-playable]").textContent = playableCount;
}

function renderEngines() {
  const grid = bySelector("[data-engine-grid]");
  grid.innerHTML = "";

  portfolio.engines.forEach((engine) => {
    const card = document.createElement("article");
    card.className = "engine-card";
    card.innerHTML = `
      <div class="engine-meta">
        <span class="engine-token" style="background:${engine.color}">${engine.initials}</span>
        <span class="engine-level">${engine.level}</span>
      </div>
      <h3>${engine.name}</h3>
      <p>${engine.notes}</p>
      <div class="meter" aria-label="${engine.name} experience confidence">
        <span style="--meter-width:${engine.confidence}%; --meter-color:${engine.color}"></span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderFilters() {
  const row = bySelector("[data-filter-row]");
  const engineNames = ["All", ...portfolio.engines.map((engine) => engine.name)];
  row.innerHTML = "";

  engineNames.forEach((engineName) => {
    const button = document.createElement("button");
    button.className = `filter-button${engineName === state.activeEngine ? " is-active" : ""}`;
    button.type = "button";
    button.textContent = engineName;
    button.setAttribute("aria-pressed", String(engineName === state.activeEngine));
    button.addEventListener("click", () => {
      state.activeEngine = engineName;
      renderFilters();
      renderProjects();
    });
    row.appendChild(button);
  });
}

function renderProjects() {
  const grid = bySelector("[data-project-grid]");
  const projects =
    state.activeEngine === "All"
      ? portfolio.projects
      : portfolio.projects.filter((project) => project.engine === state.activeEngine);

  grid.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.style.setProperty("--art-a", project.colorA);
    card.style.setProperty("--art-b", project.colorB);

    const publicLink = project.publicUrl
      ? `<a class="text-link" href="${project.publicUrl}" target="_blank" rel="noreferrer">Play / view</a>`
      : `<span class="text-link secondary" aria-label="Private or unreleased project">Private build</span>`;
    const sourceLink = project.sourceUrl
      ? `<a class="text-link secondary" href="${project.sourceUrl}" target="_blank" rel="noreferrer">Source</a>`
      : "";

    card.innerHTML = `
      <div class="project-art" aria-hidden="true"><span>${project.engine.slice(0, 2).toUpperCase()}</span></div>
      <div class="project-body">
        <div class="tag-row">
          <span class="tag">${project.engine}</span>
          <span class="tag">${project.type}</span>
          <span class="tag">${project.year}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-links">${publicLink}${sourceLink}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderSkills() {
  const matrix = bySelector("[data-skill-matrix]");
  matrix.innerHTML = "";

  portfolio.skills.forEach((skill) => {
    const item = document.createElement("article");
    item.className = "skill-item";
    item.innerHTML = `
      <h3>${skill.title}</h3>
      <p>${skill.text}</p>
    `;
    matrix.appendChild(item);
  });
}

function renderGamesList() {
  const list = bySelector("[data-games-list]");
  const publicProjects = portfolio.projects.filter((project) => project.publicUrl);
  list.innerHTML = "";

  publicProjects.forEach((project) => {
    const row = document.createElement("article");
    const statusClass = project.status.toLowerCase().includes("prototype")
      ? "prototype"
      : project.type.toLowerCase().includes("jam")
        ? "jam"
        : "";

    row.className = "game-row";
    row.innerHTML = `
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="game-detail">${project.engine}</div>
      <span class="status-pill ${statusClass}">${project.status}</span>
      <a class="button button-primary" href="${project.publicUrl}" target="_blank" rel="noreferrer">Play</a>
    `;
    list.appendChild(row);
  });

  if (!publicProjects.length) {
    const empty = document.createElement("p");
    empty.textContent = "Add publicUrl values in script.js and your released games will appear here.";
    list.appendChild(empty);
  }
}

function setupNavigation() {
  const toggle = bySelector(".nav-toggle");
  const links = bySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupHeaderShadow() {
  const header = bySelector("[data-nav]");
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 12 ? "0 8px 30px rgba(23, 23, 23, 0.12)" : "none";
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function drawReel() {
  const canvas = bySelector("#game-reel");
  const context = canvas.getContext("2d");
  const colors = {
    bg: "#101010",
    grid: "#242424",
    cyan: "#31a8c9",
    red: "#ef4e3a",
    yellow: "#f3c84b",
    green: "#32b06b",
    ink: "#171717",
    paper: "#edf1ee",
    violet: "#7762d6"
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;

  function rect(x, y, width, height, fill) {
    context.fillStyle = fill;
    context.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
  }

  function loop() {
    const width = canvas.width;
    const height = canvas.height;
    const t = reducedMotion ? 24 : frame;
    context.clearRect(0, 0, width, height);
    rect(0, 0, width, height, colors.bg);

    for (let x = 0; x < width; x += 48) {
      rect(x, 0, 2, height, colors.grid);
    }
    for (let y = 0; y < height; y += 48) {
      rect(0, y, width, 2, colors.grid);
    }

    const floor = height - 116;
    rect(0, floor, width, 10, colors.paper);
    rect(0, floor + 10, width, 86, "#1b1b1b");

    for (let i = 0; i < 9; i += 1) {
      const platformX = ((i * 156 - t * 2) % (width + 180)) - 90;
      const platformY = 160 + (i % 3) * 82;
      rect(platformX, platformY, 112, 16, [colors.cyan, colors.red, colors.green][i % 3]);
      rect(platformX + 12, platformY + 16, 88, 8, "#0a0a0a");
    }

    const playerX = 170 + Math.sin(t / 18) * 22;
    const playerY = floor - 52 + Math.sin(t / 10) * 8;
    rect(playerX, playerY, 42, 42, colors.yellow);
    rect(playerX + 8, playerY - 20, 26, 22, colors.paper);
    rect(playerX + 29, playerY + 12, 8, 8, colors.bg);
    rect(playerX - 16, playerY + 16, 18, 12, colors.red);
    rect(playerX + 38, playerY + 16, 28, 12, colors.cyan);

    for (let i = 0; i < 6; i += 1) {
      const orbX = width - 180 - i * 92 + Math.sin(t / 20 + i) * 18;
      const orbY = 110 + i * 58 + Math.cos(t / 16 + i) * 16;
      rect(orbX, orbY, 22, 22, [colors.green, colors.yellow, colors.violet][i % 3]);
    }

    rect(width - 242, floor - 116, 168, 88, "#f7f2e8");
    rect(width - 226, floor - 100, 136, 18, colors.ink);
    rect(width - 226, floor - 70, 92, 14, colors.cyan);
    rect(width - 226, floor - 44, 120, 14, colors.red);

    context.fillStyle = colors.paper;
    context.font = "700 26px Inter, Arial, sans-serif";
    context.fillText("PLAYABLE", 36, 58);
    context.fillStyle = colors.yellow;
    context.fillText("MULTI-ENGINE", 36, 92);

    frame += 1;
    if (!reducedMotion) {
      requestAnimationFrame(loop);
    }
  }

  loop();
}

setProfileContent();
renderEngines();
renderFilters();
renderProjects();
renderSkills();
renderGamesList();
setupNavigation();
setupHeaderShadow();
drawReel();
