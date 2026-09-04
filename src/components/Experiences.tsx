import ParallaxSection from './ParallaxSection';
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

/** PEPUL logo. Empty on purpose — drop the file in /public and set the path here,
 *  e.g. '/pepul-logo.png'. Until then the logo slot renders as an empty placeholder. */
const PEPUL_LOGO = '';

const Experiences: React.FC = () => {
  return (
    <ParallaxSection id="experiences" image="/Journey.png" tint={0} className="py-16 relative min-h-[820px] flex items-start">
      {/* Content anchored to TOP, constrained to left ~60% so avatar stays visible on right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-16">
        <div className="max-w-[720px]">
          {/* Header — Inter */}
          <span className="section-label">Journey</span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-3 mb-3 text-white tracking-tight" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>
            Experiences
          </h2>
          <p className="text-white/85 text-sm max-w-lg mb-6" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            My professional journey so far — the place where I've grown, built and created impact.
          </p>

          {/* Company card — strong translucent blur */}
          <div className="card-glass p-6 mb-3.5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl shrink-0 overflow-hidden bg-white/[0.06] border border-white/15">
                  {PEPUL_LOGO && (
                    <img src={PEPUL_LOGO} alt="PEPUL logo" className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">PEPUL (Workfast AI)</h3>
                  <p className="text-white/70 text-[13px] mt-0.5">AI-Powered Product Experience Platform</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end text-white/85 text-[13px] font-medium">
                  <Calendar size={14} /> Sep 19, 2022 – Present
                </div>
                <div className="flex items-center gap-3 justify-end mt-2">
                  <span className="text-white/60 text-[13px]">Full-time</span>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold text-emerald-300 bg-emerald-400/15 border border-emerald-400/30">4 Years</span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/12 my-4" />

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div>
                <p className="text-white/60 text-xs mb-1.5">Sep 19, 2022</p>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                  <span className="text-white font-semibold text-[13px]">Junior UI/UX Designer</span>
                </div>
                <p className="text-blue-300/80 text-xs mt-1 ml-[18px]">Joined the team</p>
              </div>
              <div className="border-t border-dashed border-white/25 w-16 sm:w-28 hidden sm:block" />
              <div className="text-right">
                <p className="text-white/60 text-xs mb-1.5">Present</p>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-white font-semibold text-[13px]">Product Designer</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] shrink-0" />
                </div>
                <p className="text-blue-300/80 text-xs mt-1 mr-[18px]">Current Role</p>
              </div>
            </div>
          </div>

          {/* What I work on — strong translucent blur, flat square chips */}
          <div className="card-glass p-6">
            <div className="flex items-center gap-2 mb-4">
              <PenTool size={16} className="text-white/70" />
              <span className="text-white font-semibold">What I work on</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s.label} className="flex items-center gap-2 px-3.5 h-9 frost-chip text-white/90 text-[13px]">
                  <span className="text-white/60">{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Experiences;
