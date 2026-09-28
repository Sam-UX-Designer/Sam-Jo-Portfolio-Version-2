import { useEffect } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { useTheme } from './lib/theme';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Workflow from './sections/Workflow';
import Workforce from './sections/Workforce';
import Tools from './sections/Tools';
import UseCases from './sections/UseCases';
import SeeTheWork from './sections/SeeTheWork';
import Control from './sections/Control';
import HowItWorks from './sections/HowItWorks';
import Preview from './sections/Preview';
import Why from './sections/Why';
import Security from './sections/Security';
import { FinalCta, Footer } from './sections/Closing';

/**
 * AI Agents World: the website.
 * Portfolio → My Projects → AI Agents World → this page.
 *
 * An experience centre rather than a brochure: the first screen is the real
 * product, and one goal runs free before anything asks for an account. The
 * sections after it explain what the visitor just saw, in the order of the
 * brief: problem, workflow, workforce, tools, use cases, visibility, control,
 * how it works, the three screens, why, trust, and a way back in.
 */
export default function AawPage() {
  const { choice, choose } = useTheme();

  // Looping light only runs where someone can see it.
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
          className="sr-only rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>

        <Nav choice={choice} onChoose={choose} />

        <main id="main">
          <Hero />
          <Problem />
          <Workflow />
          <Workforce />
          <Tools />
          <UseCases />
          <SeeTheWork />
          <Control />
          <HowItWorks />
          <Preview />
          <Why />
          <Security />
          <FinalCta />
        </main>

        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
