import { useRef, useEffect, useState } from 'react';

interface ParallaxSectionProps {
  /** Image path from the public folder, e.g. "/What I Build.png" */
  image?: string;
  /** Section id for nav anchoring */
  id?: string;
  /** 0.2 = 20% black tint over the image */
  tint?: number;
  /** How strongly the background drifts on scroll (px range). Higher = more movement */
  strength?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * A section with a fixed-feel parallax background image and a dark tint.
 * The background image drifts slower than scroll to create depth.
 * Uses transform (GPU-friendly) and respects reduced-motion preferences.
 */
const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  image,
  id,
  tint = 0.2,
  strength = 60,
  className = '',
  children,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || !image) return;
    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress: -1 (below viewport) → 1 (above viewport)
      const progress = (rect.top + rect.height / 2 - winH / 2) / (winH / 2 + rect.height / 2);
      bg.style.transform = `translate3d(0, ${(-progress * strength).toFixed(1)}px, 0) scale(1.15)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [image, strength, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {image && (
        <>
          <div
            ref={bgRef}
            className="absolute inset-0 z-0 will-change-transform"
            style={{
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'scale(1.15)',
            }}
          />
          <div className="absolute inset-0 z-0" style={{ backgroundColor: `rgba(0,0,0,${tint})` }} />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default ParallaxSection;
