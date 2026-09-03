import ParallaxSection from './ParallaxSection';

const About: React.FC = () => {
  return (
    <ParallaxSection id="about" image="/About.png" tint={0.2} className="flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-8 text-center flex flex-col items-center justify-center" style={{ minHeight: 727 }}>
        <span className="section-label">About</span>
        <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-8 text-white" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.35)' }}>
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
