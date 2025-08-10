type ShowcaseType = "app" | "website" | "model" | "notebook" | "paper";

interface AppTileData {
  id: string;
  name: string;
  subtitle: string;
  category: string; // e.g. "Productivity", "Computer Vision"
  rating?: number; // optional for models/notebooks
  hasInAppPurchases?: boolean;
  image: string; // image url
  link?: string; // optional external link
  type?: ShowcaseType;
  tags?: string[];
  actions?: { label: string; link: string }[];
}

interface PrabinStudioProps {
  width?: number;
}

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="px-6 pt-10 pb-5">
    <h2 className="text-[22px] sm:text-[28px] tracking-tight font-semibold text-c-900">{title}</h2>
    {subtitle && <p className="text-c-600 text-sm mt-1.5">{subtitle}</p>}
  </div>
);

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const half = rating - fullStars >= 0.5;
  const empty = 5 - fullStars - (half ? 1 : 0);
  return (
    <div className="inline-flex items-center space-x-0.5 text-amber-500">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={`full-${i}`} className="i-heroicons:star-20-solid" />
        ))}
      {half && <span className="i-heroicons:star-20-solid opacity-60" />}
      {Array(empty)
        .fill(0)
        .map((_, i) => (
          <span key={`empty-${i}`} className="i-heroicons:star-20-solid opacity-20" />
        ))}
    </div>
  );
};

const GetButton = ({
  label = "Get",
  disabled,
  onClick
}: {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <button
    className={`px-3.5 py-1.5 rounded-full text-sm font-semibold tracking-wide transition ${
      disabled
        ? "bg-c-200 text-c-500 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-md shadow-black/10"
    }`}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 rounded-full border border-c-300/70 bg-c-100/80 text-c-700 text-xs backdrop-blur-xl">
    {children}
  </span>
);

const ActionChip = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    className="px-2.5 py-1 rounded-full text-xs border border-c-300/70 text-c-700 bg-white/60 hover:bg-white/90 active:bg-white transition backdrop-blur-xl shadow-sm"
    onClick={onClick}
  >
    {label}
  </button>
);

const Logo = ({ name, src }: { name: string; src: string }) => {
  const [broken, setBroken] = useState(false);
  const initial = name?.[0]?.toUpperCase() ?? "P";

  if (broken || !src) {
    return (
      <div className="size-14 rounded-2xl bg-gradient-to-br from-c-200 to-c-300 border border-gray-200/50 shadow-sm flex-center text-c-800 font-semibold">
        {initial}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${name} logo`}
      className="size-full object-cover"
      onError={() => setBroken(true)}
    />
  );
};

const AppTile = ({
  app,
  buttonLabel,
  disabled,
  onButtonClick,
  actionVariant = "button"
}: {
  app: AppTileData;
  buttonLabel?: string;
  disabled?: boolean;
  onButtonClick?: () => void;
  actionVariant?: "button" | "chips";
}) => (
  <div className="group rounded-2xl p-4 bg-c-100/80 dark:bg-c-800/50 border border-gray-200/50 dark:border-gray-800/40 backdrop-blur-xl shadow-sm hover:shadow-lg transition duration-200 hover:-translate-y-0.5">
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4 min-w-0">
        <div className="size-14 rounded-2xl overflow-hidden bg-white shadow flex-center border border-gray-200/50">
          <Logo name={app.name} src={app.image} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-c-900 dark:text-c-100 font-semibold">{app.name}</span>
          <span className="text-c-600 dark:text-c-300 text-sm">{app.subtitle}</span>
          <div className="mt-2 flex items-center flex-wrap gap-2 text-xs text-c-600 dark:text-c-300">
            {app.rating !== undefined ? <StarRating rating={app.rating} /> : null}
            <span className="text-c-500 dark:text-c-400">{app.category}</span>
            {app.tags && app.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>
      {app.actions && app.actions.length > 0 ? (
        actionVariant === "chips" ? (
          <div className="flex items-center gap-2 flex-shrink-0">
            {app.actions.map((a) => (
              <ActionChip key={a.label} label={a.label} onClick={() => window.open(a.link, "_blank")} />
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            {app.actions.map((a) => (
              <GetButton key={a.label} label={a.label} onClick={() => window.open(a.link, "_blank")} />
            ))}
          </div>
        )
      ) : (
        <GetButton label={buttonLabel} disabled={disabled} onClick={onButtonClick} />
      )}
    </div>
  </div>
);

const SidebarItem = ({
  label,
  icon,
  active,
  onClick
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    className={`w-full h-10 px-3 rounded-xl text-left flex items-center space-x-2 transition ${
      active
        ? "bg-blue-500/10 text-c-900 border border-blue-400/30"
        : "text-c-700 hover:bg-c-100/70 border border-transparent"
    }`}
    onClick={onClick}
  >
    <span className={`${icon} text-[18px]`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const HeroBanner = () => (
  <div className="mx-6 mt-6 rounded-3xl overflow-hidden relative">
    <div className="h-44 sm:h-56 w-full bg-gradient-to-br from-[#0ea5e9] to-[#7c3aed]" />
    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
      <div className="backdrop-blur-xl bg-black/10 rounded-2xl p-4 sm:p-5 text-white border border-white/15 shadow-lg">
        <div className="text-[10px] uppercase tracking-wide opacity-90">Showcase</div>
        <div className="text-[22px] sm:text-3xl font-semibold tracking-tight">Projects in Data Science & ML</div>
        <div className="mt-1.5 text-white/85 max-w-2xl text-sm">
          Apps, websites, and machine learning models I've built as a DS/ML undergraduate.
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <Tag>Python</Tag>
          <Tag>PyTorch</Tag>
          <Tag>TensorFlow</Tag>
          <Tag>React</Tag>
          <Tag>LLMs</Tag>
        </div>
      </div>
    </div>
  </div>
);

const curatedApps: AppTileData[] = [
  {
    id: "bear",
    name: "Bear",
    subtitle: "Write beautifully",
    category: "Productivity",
    rating: 4.7,
    hasInAppPurchases: true,
    image: "img/icons/bear.png"
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    subtitle: "Code with confidence",
    category: "Developer Tools",
    rating: 4.8,
    image: "img/icons/vscode.png"
  },
  {
    id: "safari",
    name: "Safari",
    subtitle: "Fast, personal browsing",
    category: "Utilities",
    rating: 4.5,
    image: "img/icons/safari.png"
  },
  {
    id: "typora",
    name: "Typora",
    subtitle: "A markdown editor, done right",
    category: "Productivity",
    rating: 4.4,
    image: "/img/icons/typora.png"
  }
];

// Custom sections for your content
const myProjects: AppTileData[] = [
  {
    id: "portfolio",
    name: "Personal Portfolio",
    subtitle: "Showcase and contact",
    category: "Project",
    image: "img/icons/launchpad/resume.png",
    link: "https://example.com/portfolio",
    type: "website",
    tags: ["React", "Vite", "UnoCSS"],
    actions: [
      { label: "Live", link: "https://example.com/portfolio" },
      { label: "Code", link: "https://github.com/your-handle/portfolio" }
    ]
  },
  {
    id: "macos-portfolio",
    name: "macOS Portfolio",
    subtitle: "This interactive site",
    category: "Project",
    image: "/img/icons/prabinstudio.svg",
    link: "https://example.com/macos-portfolio",
    type: "website",
    tags: ["React", "Zustand"],
    actions: [
      { label: "Live", link: "https://example.com/macos-portfolio" },
      { label: "Code", link: "https://github.com/your-handle/macos-portfolio" }
    ]
  },
  {
    id: "cli-tools",
    name: "CLI Tools",
    subtitle: "Developer utilities",
    category: "Project",
    image: "img/icons/terminal.png",
    link: "https://example.com/cli-tools",
    type: "app",
    tags: ["Node.js", "Python"],
    actions: [
      { label: "Docs", link: "https://example.com/cli-tools" },
      { label: "Code", link: "https://github.com/your-handle/cli-tools" }
    ]
  }
];

const myWebsites: AppTileData[] = [
  {
    id: "blog",
    name: "Tech Blog",
    subtitle: "Articles & notes",
    category: "Website",
    image: "img/icons/launchpad/resume.png",
    link: "https://example.com/blog",
    type: "website",
    tags: ["Markdown", "SSG"],
    actions: [
      { label: "Read", link: "https://example.com/blog" }
    ]
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    subtitle: "Professional profile",
    category: "Website",
    image: "img/icons/linkedin.svg",
    link: "https://linkedin.com/in/your-handle",
    type: "website",
    tags: ["Career"],
    actions: [
      { label: "Open", link: "https://linkedin.com/in/your-handle" }
    ]
  },
  {
    id: "x",
    name: "X (Twitter)",
    subtitle: "Follow updates",
    category: "Website",
    image: "img/icons/xapp.svg",
    link: "https://x.com/your-handle",
    type: "website",
    tags: ["Social"],
    actions: [
      { label: "Follow", link: "https://x.com/your-handle" }
    ]
  }
];

const mlModels: AppTileData[] = [
  {
    id: "cv-detr",
    name: "Object Detection (DETR)",
    subtitle: "End-to-end transformer detector",
    category: "Computer Vision",
    image: "img/icons/launchpad/rl.png",
    type: "model",
    tags: ["PyTorch", "Transformers"],
    actions: [
      { label: "Demo", link: "https://example.com/detr-demo" },
      { label: "Code", link: "https://github.com/your-handle/detr" },
    ]
  },
  {
    id: "nlp-qa",
    name: "Question Answering",
    subtitle: "BERT-based extractive QA",
    category: "NLP",
    image: "img/icons/launchpad/meta.png",
    type: "model",
    tags: ["HuggingFace", "BERT"],
    actions: [
      { label: "Demo", link: "https://example.com/qa-demo" },
      { label: "Code", link: "https://github.com/your-handle/qa-model" }
    ]
  }
];

const notebooks: AppTileData[] = [
  {
    id: "eda-notebook",
    name: "Exploratory Data Analysis",
    subtitle: "EDA template with pandas & seaborn",
    category: "Notebook",
    image: "img/icons/launchpad/rl.png",
    type: "notebook",
    tags: ["Python", "Pandas", "Seaborn"],
    actions: [
      { label: "View", link: "https://nbviewer.org/your-notebook" },
      { label: "Code", link: "https://github.com/your-handle/eda-template" }
    ]
  },
  {
    id: "llm-prompts",
    name: "LLM Prompting",
    subtitle: "Few-shot and chain-of-thought",
    category: "Notebook",
    image: "img/icons/launchpad/notebook.png",
    type: "notebook",
    tags: ["LLM", "Prompt Engineering"],
    actions: [
      { label: "View", link: "https://nbviewer.org/your-llm-notebook" }
    ]
  }
];

const PrabinStudio = ({ width }: PrabinStudioProps) => {
  const [active, setActive] = useState("Overview");
  const [filter, setFilter] = useState<ShowcaseType | "all">("all");
  const [search, setSearch] = useState("");
  const isNarrow = (width ?? 1024) < 820;

  const query = search.trim().toLowerCase();
  const matchesQuery = (a: AppTileData) => {
    if (!query) return true;
    const hay = [a.name, a.subtitle, a.category, ...(a.tags ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(query);
  };

  const filteredProjects = myProjects.filter(matchesQuery);
  const filteredWebsites = myWebsites.filter(matchesQuery);
  const filteredModels = mlModels.filter(matchesQuery);
  const filteredNotebooks = notebooks.filter(matchesQuery);

  return (
    <div className="w-full h-full bg-c-white text-c-800 grid" style={{ gridTemplateColumns: isNarrow ? "1fr" : "260px 1fr" }}>
      {!isNarrow && (
        <aside className="h-full border-r border-c-300/40 p-3 bg-c-50/70 dark:bg-c-800/40 backdrop-blur-xl">
          <div className="px-2 pb-2 text-xs uppercase tracking-wide text-c-500">Prabin's Studio</div>
          <div className="space-y-1">
            {[
              { label: "Overview", icon: "i-heroicons:sparkles-20-solid" },
              { label: "Apps", icon: "i-heroicons:cpu-chip-20-solid" },
              { label: "Websites", icon: "i-heroicons:globe-alt-20-solid" },
              { label: "Models", icon: "i-heroicons:beaker-20-solid" },
              { label: "Notebooks", icon: "i-heroicons:book-open-20-solid" }
            ].map((item) => (
              <SidebarItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                active={active === item.label}
                onClick={() => {
                  setActive(item.label);
                  const mapping: Record<string, ShowcaseType | "all"> = {
                    Overview: "all",
                    Apps: "app",
                    Websites: "website",
                    Models: "model",
                    Notebooks: "notebook"
                  };
                  setFilter(mapping[item.label] ?? "all");
                  setSearch("");
                }}
              />
            ))}
          </div>
        </aside>
      )}

      <main className="h-full overflow-y-auto">
        {/* Top Bar */}
        <div className="h-12 sm:h-14 w-full flex items-center justify-between px-4 sm:px-6 border-b border-c-200/60 bg-c-white/80 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            {isNarrow && (
              <button
                className="size-8 rounded-xl bg-c-100/80 border border-c-300/50 flex-center text-c-700"
                onClick={() => setActive((a) => a)}
                title="Menu"
              >
                <span className="i-heroicons:squares-2x2-20-solid" />
              </button>
            )}
            <div className="font-semibold text-c-900">{active}</div>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="h-9 w-64 bg-c-100/80 border border-c-300/50 rounded-full px-3 flex items-center backdrop-blur-xl">
              <span className="i-heroicons:magnifying-glass-20-solid text-c-500 mr-1.5" />
              <input
                className="flex-1 bg-transparent outline-none text-sm text-c-700 placeholder:text-c-500"
                placeholder={
                  filter === "all"
                    ? "Search projects, websites, models, notebooks"
                    : `Search ${filter}s`
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {filter === "all" && <HeroBanner />}

          {(filter === "all" || filter === "app" || filter === "website" || filter === "model" || filter === "notebook") && (
            <>
              {filter === "all" && (
                <>
                  <SectionTitle title="Featured" subtitle="A few highlights across apps, websites, and ML." />
                  <div className="mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...filteredProjects.slice(0, 1), ...filteredModels.slice(0, 1), ...filteredWebsites.slice(0, 1)].map(
                      (app) => (
                        <AppTile key={app.id} app={app} />
                      )
                    )}
                  </div>
                </>
              )}

              {(filter === "all" || filter === "app") && (
                <>
                  <SectionTitle title="My Projects" />
                  <div className="mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(filter === "all" ? filteredProjects : filteredProjects).map((app) => (
                      <AppTile
                        key={app.id}
                        app={app}
                        actionVariant="chips"
                      />
                    ))}
                  </div>
                </>
              )}

              {(filter === "all" || filter === "website") && (
                <>
                  <SectionTitle title="My Websites" />
                  <div className="mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(filter === "all" ? filteredWebsites : filteredWebsites).map((app) => (
                      <AppTile
                        key={app.id}
                        app={app}
                        buttonLabel="Open"
                        onButtonClick={() => app.link && window.open(app.link, "_blank")}
                      />
                    ))}
                  </div>
                </>
              )}

              {(filter === "all" || filter === "model") && (
                <>
                  <SectionTitle title="ML Models" />
                  <div className="mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(filter === "all" ? filteredModels : filteredModels).map((app) => {
                      const filteredActions = (app.actions ?? []).filter(a => /^(demo|code)$/i.test(a.label));
                      return (
                        <AppTile key={app.id} app={{ ...app, actions: filteredActions }} />
                      );
                    })}
                  </div>
                </>
              )}

              {(filter === "all" || filter === "notebook") && (
                <>
                  <SectionTitle title="Notebooks" />
                  <div className="pb-8 mx-auto max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(filter === "all" ? filteredNotebooks : filteredNotebooks).map((app) => {
                      const filteredActions = (app.actions ?? []).filter(a => /^(demo|code)$/i.test(a.label));
                      return (
                        <AppTile key={app.id} app={{ ...app, actions: filteredActions }} />
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PrabinStudio;
