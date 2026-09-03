import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, ArrowDown, ArrowRight } from 'lucide-react';
import LinkedinIcon from './icons/LinkedinIcon';

/**
 * "Design Brain" chat widget — currently DISABLED for safety.
 * The original had a Gemini API key hardcoded in the frontend, which is unsafe
 * (frontend keys are publicly visible and can be abused). To enable it, add a
 * Vercel serverless function (/api) holding the key server-side and call that.
 */
const useSamAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const askSam = async (query: string) => {
    if (!query.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, content: query }];
    setMessages(newMessages);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setMessages([
      ...newMessages,
      { role: 'assistant', content: "This is a preview. I'll be properly connected soon — check back!" },
    ]);
    setIsLoading(false);
  };

  return { messages, isLoading, askSam };
};

const Hero: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, askSam } = useSamAI();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    askSam(input);
    setInput('');
  };

  const scrollToBuild = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col overflow-hidden bg-background">
      {/* Image background (replaces the old video). Upload /hero.png to public. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        {/* soft dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1428]/70 via-[#0a1428]/30 to-[#0a1428]/80" />
      </div>

      {/* Hero content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow */}
        <p className="text-[13px] sm:text-sm font-semibold tracking-[0.25em] uppercase mb-6 animate-fade-rise">
          <span className="text-white/90">AI Generalist</span>
          <span className="text-white/40"> &amp; </span>
          <span className="text-[#1683FF]">Product Designer</span>
        </p>

        {/* Headline — Inter, bold */}
        <h1 className="animate-fade-rise text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white max-w-4xl">
          Where purpose takes shape through{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #1683FF, #2D9BFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            design.
          </span>
        </h1>

        {/* Description */}
        <p className="animate-fade-rise-delay mt-6 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
          I design thoughtful experiences and build intelligent solutions that make life simpler, smarter and more human.
        </p>

        {/* CTA */}
        <button
          onClick={scrollToBuild}
          className="animate-fade-rise-delay group mt-9 inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-500 hover:scale-[1.03]"
          style={{
            background: 'rgba(22,131,255,0.1)',
            border: '1px solid rgba(22,131,255,0.5)',
            boxShadow: '0 0 25px rgba(22,131,255,0.25)',
          }}
        >
          Explore my work
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </main>

      {/* Down arrow — smooth scroll to What I Build */}
      <button
        onClick={scrollToBuild}
        aria-label="Scroll to projects"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors duration-300 animate-bounce"
      >
        <ArrowDown size={24} />
      </button>

      {/* Control Cluster (Bottom Right) — unchanged */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {isChatOpen && (
          <div className="w-[340px] max-w-[calc(100vw-4rem)] h-[500px] liquid-glass rounded-[2rem] flex flex-col animate-fade-rise shadow-[0_32px_64px_-12px_rgba(0,0,0,0.9)] overflow-hidden border border-white/10 mb-2">
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-[10px] tracking-[0.2em] uppercase opacity-70">Design Brain</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/20 hover:text-white">
                <X size={14} />
              </button>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll">
              {messages.length === 0 && (
                <div className="text-[13px] text-muted-foreground leading-relaxed italic opacity-40 text-xl">
                  How shall we merge intelligence with form today?
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/10 text-cyan-50 border border-cyan-500/20'
                        : 'bg-white/5 text-muted-foreground border border-white/10'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-1 items-center px-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" />
                </div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="p-4 bg-black/40 border-t border-white/5">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Sam AI..."
                  className="w-full bg-white/5 rounded-2xl py-3.5 px-5 pr-12 text-[12px] font-medium tracking-tight focus:outline-none focus:bg-white/10 border border-white/10 transition-all placeholder:opacity-20"
                />
                <button type="submit" className="absolute right-3 top-2.5 p-1 text-cyan-400 hover:scale-110">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex flex-col items-end text-[9px] uppercase tracking-[0.4em] font-bold pointer-events-none opacity-40">
          <span className="text-cyan-400">AI Generalist</span>
          <span className="mt-1">Product Design</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="liquid-glass px-4 h-10 rounded-full flex items-center justify-center text-[10px] font-bold tracking-[0.2em] uppercase text-white shadow-lg pointer-events-none">
            SAM
          </div>
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`liquid-glass w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
              isChatOpen ? 'text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-white'
            }`}
          >
            {isChatOpen ? <X size={20} /> : <Sparkles size={20} />}
          </button>
          <a
            href="https://www.linkedin.com/in/samuel411"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center bg-white/5 transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl"
            title="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
