import ParallaxSection from './ParallaxSection';

const Contact: React.FC = () => {
  return (
    <ParallaxSection id="contact" image="/GetinTouch.png" tint={0.2} className="min-h-screen flex items-start justify-center pt-24 pb-40">
      <div className="w-full max-w-4xl mx-auto px-8 text-center">
        <span className="section-label">Get in Touch</span>
        <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-8 text-foreground" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
          Let's Talk
        </h2>
        <a
          href="mailto:samueljothi1919@gmail.com"
          className="inline-block liquid-glass rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white hover:tracking-[0.4em] transition-all duration-500"
        >
          samueljothi1919@gmail.com
        </a>
      </div>
    </ParallaxSection>
  );
};

export default Contact;
