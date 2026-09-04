import { useState } from 'react';
import { Sparkles, Pencil, Lock, ArrowUpRight } from 'lucide-react';
import ParallaxSection from './ParallaxSection';

/**
 * Project icon images.
 * Upload your real icons into the project's `public` folder using these exact
 * filenames and they will appear automatically — no layout changes needed.
 */
const PROJECT_ICON_1 = '/project-1.png';
const PROJECT_ICON_2 = '/project-2.png';
const PROJECT_ICON_3 = '/project-3.png';
const PROJECT_ICON_4 = '/project-4.png';
const PROJECT_ICON_5 = '/project-5.png';

type TabId = 'generalist' | 'designer';

interface ProjectCard {
  id: string;
  index: string;
  name: string;
  desc: string;
  tag: string;
  tags: string[];
  icon: string;      // image path from /public
  tagColor: string;
}

interface TabData {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  tagline: string;
  cards: ProjectCard[];
}

const TABS: TabData[] = [
  {
    id: 'generalist',
    label: 'AI Generalist',
    icon: <Sparkles size={15} />,
    tagline: 'Building useful intelligence into everyday experiences.',
    cards: [
      {
        id: 'g1', index: '01', name: 'AI Chat', tag: 'AI APP',
        desc: 'Conversational AI assistant for smarter everyday productivity.',
        tags: ['AI Assistant', 'LLM'],
        icon: PROJECT_ICON_1,
        tagColor: '#a5b4fc',
      },
      {
        id: 'g2', index: '02', name: 'Insight Hub', tag: 'AI APP',
        desc: 'AI-powered analytics that turns data into clear insights.',
        tags: ['Analytics', 'Visual Intelligence'],
        icon: PROJECT_ICON_2,
        tagColor: '#6ee7b7',
      },
      {
        id: 'g3', index: '03', name: 'TaskPilot', tag: 'AI APP',
        desc: 'Intelligent task manager that plans, prioritizes and gets things done.',
        tags: ['Productivity', 'Automation'],
        icon: PROJECT_ICON_3,
        tagColor: '#fdba74',
      },
    ],
  },
  {
    id: 'designer',
    label: 'Product Designer',
    icon: <Pencil size={15} />,
    tagline: 'Shaping thoughtful interfaces from problem to product.',
    cards: [
      {
        id: 'd1', index: '01', name: 'Workfast AI', tag: 'PRODUCT',
        desc: 'Coming soon — case study in progress.',
        tags: ['SaaS', 'Product Design'],
        icon: PROJECT_ICON_4,
        tagColor: '#93c5fd',
      },
      {
        id: 'd2', index: '02', name: 'PEPUL', tag: 'PRODUCT',
        desc: 'Coming soon — case study in progress.',
        tags: ['Social', 'AI App'],
        icon: PROJECT_ICON_5,
        tagColor: '#c4b5fd',
      },
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
    <ParallaxSection id="projects" image="/WhatIBuild.png" tint={0.2} className="pt-20 pb-24 min-h-[900px]">
      <div className="w-full max-w-7xl mx-auto px-8 flex flex-col min-h-[calc(900px-11rem)]">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="section-label">What I Build</span>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mt-4 text-foreground leading-[0.95]">Sam as a</h2>
        </div>

        {/* Toggle — smooth sliding indicator */}
        <div className="flex justify-center mb-6">
          <div className="liquid-glass rounded-full p-1.5 flex items-center gap-1 relative">
            {/* Sliding pill */}
            <span
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white/5 shadow-[0_0_25px_rgba(34,211,238,0.25)] border border-cyan-400/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: active === 'generalist' ? '6px' : '50%',
                right: active === 'generalist' ? '50%' : '6px',
              }}
            />
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`relative z-10 flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-500 flex-1 whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <span className={`transition-colors duration-500 ${isActive ? 'text-cyan-300' : ''}`}>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tagline */}
        <p
          key={activeTab.id}
          className="text-center text-white opacity-90 text-sm sm:text-base max-w-md mx-auto mb-24"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
        >
          {activeTab.tagline}
        </p>

        {/* Cards — no animation (matches the working Experience cards exactly) */}
        <div
          key={`${activeTab.id}-grid`}
          className={`grid gap-6 max-w-5xl mx-auto mt-auto ${
            activeTab.cards.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {activeTab.cards.map((card) => {
            const showSoon = comingSoon === card.id;
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="group card-glass p-6 text-center flex flex-col items-center transition-all duration-500 hover:border-white/40 cursor-pointer"
              >
                {/* Top row: index/tag + arrow */}
                <div className="flex items-start justify-between w-full mb-4">
                  <div className="text-left">
                    <span className="block text-[10px] font-bold tracking-[0.2em] text-white/50">{card.index}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 mt-0.5">{card.tag}</span>
                  </div>
                  <span className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} className="text-white" />
                  </span>
                </div>

                {/* App icon image slot — drop your real icon into /public using the
                    filename in the PROJECT_ICON_* constants above. Size/radius fixed. */}
                <img
                  src={card.icon}
                  alt={`${card.name} icon`}
                  className="w-20 h-20 rounded-[1.25rem] object-cover mb-4"
                />

                {/* Name */}
                <h3 className="display-font text-2xl text-white mb-2">{card.name}</h3>

                {/* Description OR coming soon */}
                {showSoon ? (
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300 my-3">
                    <Lock size={12} /> Coming Soon
                  </span>
                ) : (
                  <p className="text-white/70 text-sm leading-relaxed mb-4 px-2">{card.desc}</p>
                )}

                {/* Tag chips */}
                <div className="flex flex-wrap gap-2 justify-center mt-auto">
                  {card.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold liquid-glass"
                      style={{ color: card.tagColor }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Projects;
