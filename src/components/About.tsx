import ParallaxSection from './ParallaxSection';

const About: React.FC = () => {
  return (
    <ParallaxSection id="about" image="/About.png" tint={0.15} className="min-h-[900px] py-20">
      {/* Content anchored to TOP, centered horizontally */}
      <div className="w-full max-w-4xl mx-auto px-8 text-center pt-[10vh]">
        <span className="section-label">About</span>
        <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-6 text-white" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.35)' }}>
          The Story So Far
        </h2>
        <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
          Your bio goes here — waiting for the exact wording (school name, title, focus) before this is written.
        </p>
      </div>
    </ParallaxSection>
  );
};

export default About;
