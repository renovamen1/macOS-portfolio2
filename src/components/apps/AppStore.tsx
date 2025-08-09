interface AppTileData {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  rating: number; // 0-5
  hasInAppPurchases?: boolean;
  image: string; // image url
}

interface AppStoreProps {
  width?: number;
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="px-6 pt-6 pb-3">
    <h2 className="text-2xl font-semibold text-c-800">{title}</h2>
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

const GetButton = () => (
  <button
    className="px-3 py-1.5 rounded-full bg-c-200 text-c-800 hover:bg-c-300 active:bg-c-400 transition"
  >
    Get
  </button>
);

const AppTile = ({ app }: { app: AppTileData }) => (
  <div className="group flex items-center justify-between px-6 py-3 hover:bg-c-100/70">
    <div className="flex items-center space-x-4">
      <div className="size-14 rounded-xl overflow-hidden bg-white shadow">
        <img src={app.image} alt={app.name} className="size-full object-cover" />
      </div>
      <div className="flex flex-col">
        <span className="text-c-900 font-medium">{app.name}</span>
        <span className="text-c-500 text-sm">{app.subtitle}</span>
        <div className="mt-1 flex items-center space-x-2 text-xs text-c-600">
          <StarRating rating={app.rating} />
          <span>•</span>
          <span>{app.category}</span>
          {app.hasInAppPurchases && (
            <span className="text-c-500">• In‑App Purchases</span>
          )}
        </div>
      </div>
    </div>
    <GetButton />
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
    className={`w-full h-10 px-3 rounded-lg text-left flex items-center space-x-2 transition ${
      active ? "bg-c-200 text-c-900" : "text-c-700 hover:bg-c-100"
    }`}
    onClick={onClick}
  >
    <span className={`${icon} text-xl`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const HeroBanner = () => (
  <div className="mx-6 mt-6 rounded-2xl overflow-hidden relative">
    <div
      className="h-44 sm:h-60 w-full bg-gradient-to-br from-sky-500 to-indigo-500"
    />
    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
      <div className="text-xs uppercase tracking-wide opacity-90">Discover</div>
      <div className="text-2xl sm:text-3xl font-semibold">Apps for your everyday</div>
      <div className="mt-2 text-white/80 max-w-xl text-sm">
        Curated picks to help you create, work, and play. Updated daily.
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
    image: "img/icons/typora.png"
  }
];

const AppStore = ({ width }: AppStoreProps) => {
  const [active, setActive] = useState("Discover");
  const isNarrow = (width ?? 1024) < 820;

  return (
    <div className="w-full h-full bg-c-white text-c-800 grid" style={{ gridTemplateColumns: isNarrow ? "1fr" : "260px 1fr" }}>
      {!isNarrow && (
        <aside className="h-full border-r border-c-300/50 p-3 bg-c-50">
          <div className="px-2 pb-2 text-xs uppercase tracking-wide text-c-500">App Store</div>
          <div className="space-y-1">
            {[
              { label: "Discover", icon: "i-heroicons:sparkles-20-solid" },
              { label: "Arcade", icon: "i-heroicons:game-controller-20-solid" },
              { label: "Create", icon: "i-heroicons:paint-brush-20-solid" },
              { label: "Work", icon: "i-heroicons:briefcase-20-solid" },
              { label: "Play", icon: "i-heroicons:play-circle-20-solid" },
              { label: "Develop", icon: "i-heroicons:code-bracket-20-solid" },
              { label: "Categories", icon: "i-heroicons:squares-2x2-20-solid" },
              { label: "Updates", icon: "i-heroicons:arrow-path-20-solid" }
            ].map((item) => (
              <SidebarItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                active={active === item.label}
                onClick={() => setActive(item.label)}
              />
            ))}
          </div>
        </aside>
      )}

      <main className="h-full overflow-y-auto">
        {/* Top Bar */}
        <div className="h-12 sm:h-14 w-full flex items-center justify-between px-4 sm:px-6 border-b border-c-300/50 bg-c-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            {isNarrow && (
              <button
                className="size-8 rounded-lg bg-c-200 flex-center text-c-700"
                onClick={() => setActive((a) => a)}
                title="Menu"
              >
                <span className="i-heroicons:squares-2x2-20-solid" />
              </button>
            )}
            <div className="font-semibold text-c-900">{active}</div>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="h-8 w-64 bg-c-200 rounded-md px-2 flex items-center">
              <span className="i-heroicons:magnifying-glass-20-solid text-c-500 mr-1" />
              <input
                className="flex-1 bg-transparent outline-none text-sm text-c-700 placeholder:text-c-500"
                placeholder="Search"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <HeroBanner />

          <SectionTitle title="Apps We Love" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-0">
            {curatedApps.map((app) => (
              <AppTile key={app.id} app={app} />
            ))}
          </div>

          <SectionTitle title="Top Free" />
          <div className="pb-8">
            {curatedApps
              .concat(curatedApps)
              .slice(0, 6)
              .map((app, idx) => (
                <div key={`top-${idx}`} className="flex items-center justify-between px-6 py-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-6 text-c-500 text-sm">{idx + 1}</div>
                    <div className="size-10 rounded-lg overflow-hidden bg-white shadow">
                      <img src={app.image} alt={app.name} className="size-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-c-900 font-medium leading-5">{app.name}</span>
                      <span className="text-c-500 text-xs">{app.category}</span>
                    </div>
                  </div>
                  <GetButton />
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppStore;
