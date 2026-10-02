import { useEffect } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { useTheme } from './lib/theme';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import HowItWorks from './sections/HowItWorks';
import Aha from './sections/Aha';
import Features from './sections/Features';
import Intelligence from './sections/Intelligence';
import Desktop from './sections/Desktop';
import Design from './sections/Design';
import Privacy from './sections/Privacy';
import { FinalCta, Footer } from './sections/Closing';

/**
 * Finance Buddy project page.
 * Portfolio → What I Built → Finance Buddy → this page.
 *
 * Told as scroll scenes, like a product page: the promise, the problem, how
 * it works, the moment it clicks, what it does, Super Intelligence, the big
 * screen, design details (say hello to the mascot), privacy, then the way in. Each scene pins while the visitor
 * scrolls through it. Every screen is a real capture of the app.
 */
export default function FinanceBuddyPage() {
  const { theme, toggle } = useTheme();

  // The mascots' idle loops only run where someone can see them.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute('data-idle', !e.isIntersecting)),
      { rootMargin: '200px 0px' },
    );
    document.querySelectorAll('main section').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only rounded-full bg-btn px-4 py-2.5 text-sm font-semibold text-btn-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>

        <Nav theme={theme} onToggleTheme={toggle} />

        <main id="main">
          <Hero />
          <Problem />
          <HowItWorks />
          <Aha />
          <Features />
          <Intelligence />
          <Desktop />
          <Design />
          <Privacy />
          <FinalCta />
        </main>

        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
