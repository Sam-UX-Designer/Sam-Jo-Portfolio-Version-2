import { useState } from 'react';
import { Sparkles, Pencil, Lock } from 'lucide-react';

type TabId = 'generalist' | 'designer';

interface ProjectCard {
  id: string;
  index: string;
  name: string;
  tag: string;
}

interface TabData {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  tagline: string;
  cards: ProjectCard[];
}

// Placeholder content — real project details get swapped in later.
const TABS: TabData[] = [
  {
    id: 'generalist',
    label: 'AI Generalist',
    icon: <Sparkles size={15} />,
    tagline: 'Building useful intelligence into everyday experiences.',
    cards: [
      { id: 'g1', index: '01', name: 'Project One', tag: 'AI App' },
      { id: 'g2', index: '02', name: 'Project Two', tag: 'AI App' },
      { id: 'g3', index: '03', name: 'Project Three', tag: 'AI App' },
    ],
  },
  {
    id: 'designer',
    label: 'Product Designer',
    icon: <Pencil size={15} />,
    tagline: 'Shaping thoughtful interfaces from problem to product.',
    cards: [
      { id: 'd1', index: '01', name: 'Project One', tag: 'Product' },
      { id: 'd2', index: '02', name: 'Project Two', tag: 'Product' },
      { id: 'd3', index: '03', name: 'Project Three', tag: 'Product' },
    ],
  },
];

const Projects: React.FC = () => {
  const [active, setActive] = useState<TabId>('generalist');
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const activeTab = TABS.find((t) => t.id === active)!;

  const handleCardClick = (cardId: string) => {
    setComingSoon(cardId);
    setTimeout(() => setComingSoon((current) => (current === cardId ? null : current)), 1600);
  };

  return (
    <section id="projects" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
      {/* Heading */}
      <div className="text-center mb-12">
        <span className="section-label text-primary">What I Build</span>
        <h2 className="display-font text-5xl sm:text-7xl mt-4 text-foreground leading-[0.95]">
          Sam as a
        </h2>
      </div>

      {/* Liquid-glass toggle */}
      <div className="flex justify-center mb-6">
        <div className="liquid-glass rounded-full p-1.5 flex items-center gap-1 relative">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative z-10 flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-500 ${
                  isActive ? 'text-white' : 'text-muted-foreground opacity-50 hover:opacity-80'
                }`}
              >
                <span className={`transition-colors duration-500 ${isActive ? 'text-cyan-300' : ''}`}>
                  {tab.icon}
                </span>
                {tab.label}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/5 shadow-[0_0_25px_rgba(34,211,238,0.25)] border border-cyan-400/30 -z-10" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tagline — swaps with tab */}
      <p
        key={activeTab.id}
        className="text-center text-muted-foreground text-sm sm:text-base opacity-60 max-w-md mx-auto mb-16 animate-fade-rise"
      >
        {activeTab.tagline}
      </p>

      {/* Project cards — swap with tab */}
      <div key={`${activeTab.id}-grid`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-rise">
        {activeTab.cards.map((card) => {
          const showSoon = comingSoon === card.id;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="group liquid-glass rounded-[2rem] aspect-[4/5] flex flex-col justify-between p-8 text-left transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] cursor-pointer"
            >
              {/* Top row */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300/70">
                  {card.tag}
                </span>
                <span className="display-font text-2xl text-muted-foreground opacity-30">
                  {card.index}
                </span>
              </div>

              {/* Center icon */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full liquid-glass flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {activeTab.icon}
                </div>
              </div>

              {/* Bottom label OR coming-soon */}
              <div className="w-full">
                {showSoon ? (
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300 animate-fade-rise">
                    <Lock size={12} /> Coming Soon
                  </span>
                ) : (
                  <span className="display-font text-2xl text-foreground opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    {card.name}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
