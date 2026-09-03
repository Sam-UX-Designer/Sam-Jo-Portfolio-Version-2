import SplitParallax from './SplitParallax';
import {
  Calendar, Lightbulb, Search, Workflow, MousePointer, Frame,
  Layers, PenTool, Grid3x3, RefreshCw, Rocket, Sparkles,
  LayoutDashboard, Bot, Zap, Users, CircleCheck,
} from 'lucide-react';

interface Skill { label: string; icon: React.ReactNode; }

const SKILLS: Skill[] = [
  { label: 'Product Thinking', icon: <Lightbulb size={14} /> },
  { label: 'UX Research', icon: <Search size={14} /> },
  { label: 'User Flows', icon: <Workflow size={14} /> },
  { label: 'Interaction Design', icon: <MousePointer size={14} /> },
  { label: 'Wireframing', icon: <Frame size={14} /> },
  { label: 'Prototyping', icon: <Grid3x3 size={14} /> },
  { label: 'UI Design', icon: <PenTool size={14} /> },
  { label: 'Design Systems', icon: <Layers size={14} /> },
  { label: 'Usability & Iteration', icon: <RefreshCw size={14} /> },
  { label: 'End-to-End Design', icon: <Rocket size={14} /> },
  { label: 'AI Product Design', icon: <Sparkles size={14} /> },
  { label: 'Dashboard Design', icon: <LayoutDashboard size={14} /> },
  { label: 'AI Agents', icon: <Bot size={14} /> },
  { label: 'Rapid Experimentation', icon: <Zap size={14} /> },
  { label: 'Cross-functional Collaboration', icon: <Users size={14} /> },
  { label: 'Product Decisions', icon: <CircleCheck size={14} /> },
];

const Experiences: React.FC = () => {
  return (
    <SplitParallax id="experiences" bg="/exp-bg.png" fg="/exp-fg.png" tint={0.14} className="py-24">
      <div className="w-full max-w-6xl mx-auto px-8">
        {/* Header — Inter font */}
        <span className="section-label">Journey</span>
        <h2 className="text-4xl sm:text-6xl font-bold mt-3 mb-4 text-white tracking-tight" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>
          Experiences
        </h2>
        <p className="text-white/85 text-base max-w-xl mb-10" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
          My professional journey so far — the place where I've grown, built and created impact.
        </p>

        {/* Company card — heavy frosted dark glass */}
        <div className="frost-panel rounded-[1.375rem] p-8 mb-4 max-w-[850px]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
                <span className="text-3xl font-bold text-white">P</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight">PEPUL (Workfast AI)</h3>
                <p className="text-white/70 text-sm mt-1">AI-Powered Product Experience Platform</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end text-white/85 text-sm font-medium">
                <Calendar size={14} /> Sep 19, 2022 – Present
              </div>
              <div className="flex items-center gap-3 justify-end mt-2">
                <span className="text-white/60 text-sm">Full-time</span>
                <span className="px-3 py-1 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-400/15 border border-emerald-400/30">4 Years</span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-white/12 my-6" />

          {/* Timeline — aligned columns */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div>
              <p className="text-white/60 text-xs mb-1.5">Sep 19, 2022</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                <span className="text-white font-semibold">Junior UI/UX Designer</span>
              </div>
              <p className="text-blue-300/80 text-xs mt-1 ml-[18px]">Joined the team</p>
            </div>
            <div className="border-t border-dashed border-white/25 w-16 sm:w-32 hidden sm:block" />
            <div className="text-right">
              <p className="text-white/60 text-xs mb-1.5">Present</p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-white font-semibold">Product Designer</span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] shrink-0" />
              </div>
              <p className="text-blue-300/80 text-xs mt-1 mr-[18px]">Current Role</p>
            </div>
          </div>
        </div>

        {/* What I work on — heavy frosted dark glass, flat square-round chips */}
        <div className="frost-panel rounded-[1.375rem] p-8 max-w-[850px]">
          <div className="flex items-center gap-2 mb-5">
            <PenTool size={16} className="text-white/70" />
            <span className="text-white font-semibold">What I work on</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((s) => (
              <span key={s.label} className="flex items-center gap-2 px-4 h-10 frost-chip text-white/90 text-sm">
                <span className="text-white/60">{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SplitParallax>
  );
};

export default Experiences;
