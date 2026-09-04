import ParallaxSection from './ParallaxSection';

const About: React.FC = () => {
  return (
    <ParallaxSection id="about" image="/About.png" tint={0.15} className="min-h-[750px] py-16">
      {/* Content anchored to TOP, centered horizontally */}
      <div className="w-full max-w-4xl mx-auto px-8 text-center pt-[8vh]">
        <span className="section-label">About</span>
        <h2 className="text-4xl sm:text-6xl font-bold mt-4 mb-6 text-white tracking-tight" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.35)' }}>
          The Story So Far
        </h2>
        <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
          I focus on designing meaningful experiences and intelligent systems that simplify life, spark impact, and feel human at every touchpoint.
        </p>
      </div>
    </ParallaxSection>
  );
};

export default About;
