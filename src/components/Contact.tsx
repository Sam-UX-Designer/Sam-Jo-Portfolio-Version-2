import ParallaxSection from './ParallaxSection';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <ParallaxSection id="contact" image="/GetinTouch.png" tint={0.2} className="flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-8 text-center" style={{ minHeight: 850 }}>
        <div className="flex flex-col items-center justify-center" style={{ minHeight: 850 }}>
          <span className="section-label">Get in Touch</span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mt-4 mb-8 text-white" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            Let's Talk
          </h2>
        <a
          href="mailto:samueljothi1919@gmail.com"
          className="inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all duration-500 hover:scale-[1.03] shadow-lg"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}
        >
          <Mail size={18} /> samueljothi1919@gmail.com
        </a>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Contact;
