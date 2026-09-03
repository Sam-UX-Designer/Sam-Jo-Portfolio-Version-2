import ParallaxSection from './ParallaxSection';

const About: React.FC = () => {
  return (
    <ParallaxSection id="about" image="/About.png" tint={0.2} className="py-40">
      <div className="w-full max-w-4xl mx-auto px-8 text-center">
        <span className="section-label text-primary">About</span>
        <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-10 text-foreground">The Story So Far</h2>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Your bio goes here — waiting for the exact wording (school name, title, focus) before this is written.
        </p>
      </div>
    </ParallaxSection>
  );
};

export default About;
