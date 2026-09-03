import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import LinkedinIcon from './icons/LinkedinIcon';

/**
 * "Design Brain" chat widget.
 *
 * IMPORTANT: This does NOT call an AI model yet. The original version had a
 * Gemini API key hardcoded directly in this file — that's unsafe, because
 * any key placed in frontend code is visible to anyone who opens dev tools
 * on the live site, and could be copied and used to run up charges.
 *
 * To make this live, add a small serverless function (e.g. Vercel's
 * `/api` folder) that holds the real key on the server, and have this
 * component call that endpoint instead of Gemini directly.
 */
const useSamAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const askSam = async (query: string) => {
    if (!query.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, content: query }];
    setMessages(newMessages);
    setIsLoading(true);

    // Placeholder response — safe stand-in until a secure backend is connected.
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

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col overflow-hidden bg-background">
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover brightness-[0.45] contrast-[1.05]">
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center -mt-24">
        <h1 className="animate-fade-rise display-font text-6xl leading-[1.0] tracking-[-0.04em] sm:text-8xl md:text-9xl text-foreground max-w-6xl">
          Where <span className="text-muted-foreground italic">purpose</span> takes <br className="hidden sm:block" />
          shape <span className="text-muted-foreground italic">through design.</span>
        </h1>
        <p className="animate-fade-rise-delay mt-10 max-w-2xl text-base text-muted-foreground sm:text-lg font-medium leading-relaxed opacity-60">
          I'm Sam, a Product Designer & AI Generalist. Engineering thoughtful interfaces powered by adaptive intelligence.
        </p>
      </main>

      {/* Control Cluster (Bottom Right) */}
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
                <div className="text-[13px] text-muted-foreground leading-relaxed italic opacity-40 display-font text-xl">
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
