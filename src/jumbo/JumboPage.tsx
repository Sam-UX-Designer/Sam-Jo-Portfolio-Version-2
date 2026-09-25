import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { useTheme } from './lib/hooks';
import JumboNav from './components/JumboNav';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Loop from './sections/Loop';
import HealthPicture from './sections/HealthPicture';
import HowItWorks from './sections/HowItWorks';
import { Ask, Capture, Explore, Future, Today } from './sections/Showcase';
import Control from './sections/Control';
import Pro from './sections/Pro';
import { FinalCta, Footer } from './sections/Closing';

/**
 * JUMBO AI case study.
 * Portfolio → My Projects → JUMBO AI → this page.
 *
 * Story: problem → the JUMBO loop → the product → control → Pro → action.
 * Each section is its own module in ./sections; screens, links and prices
 * all come from ./config.
 */
const JumboPage: React.FC = () => {
  const { theme, toggle } = useTheme();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>

        <JumboNav theme={theme} onToggleTheme={toggle} />

        <main id="main">
          <Hero />
          <Problem />
          <Loop />
          <HealthPicture />
          <HowItWorks />
          <Today />
          <Future />
          <Capture />
          <Ask />
          <Explore />
          <Control />
          <Pro />
          <FinalCta />
        </main>

        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
};

export default JumboPage;
