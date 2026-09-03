import { useRef, useEffect, useState } from 'react';

interface SplitParallaxProps {
  bg: string;        // background layer, e.g. "/exp-bg.png"
  fg: string;        // foreground layer (transparent PNG), e.g. "/exp-fg.png"
  id?: string;
  tint?: number;     // dark overlay between layers
  className?: string;
  children: React.ReactNode;
}

/**
 * Two-layer parallax: a background and a transparent foreground that stay
 * perfectly aligned at rest, but drift at slightly different speeds on scroll
 * (bg slower, fg faster) to create natural cinematic depth.
 * Both layers use the same box + object-cover so they never misalign or gap.
 */
const SplitParallax: React.FC<SplitParallaxProps> = ({
  bg, fg, id, tint = 0.12, className = '', children,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      const s = sectionRef.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress -1 (below) → 1 (above)
      const progress = (rect.top + rect.height / 2 - winH / 2) / (winH / 2 + rect.height / 2);
      // bg drifts less (slower), fg drifts more (faster)
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${(-progress * 14).toFixed(1)}px, 0) scale(1.08)`;
      if (fgRef.current) fgRef.current.style.transform = `translate3d(0, ${(-progress * 28).toFixed(1)}px, 0) scale(1.08)`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} id={id} className={`relative w-full overflow-hidden ${className}`}>
      {/* Background layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ backgroundImage: `url("${bg}")`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.08)' }}
      />
      {/* Dark tint between layers */}
      <div className="absolute inset-0 z-[1]" style={{ backgroundColor: `rgba(0,10,20,${tint})` }} />
      {/* Foreground layer (transparent PNG, same box so it stays aligned) */}
      <div
        ref={fgRef}
        className="absolute inset-0 z-[2] will-change-transform pointer-events-none"
        style={{ backgroundImage: `url("${fg}")`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.08)' }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default SplitParallax;
