const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full bg-background">
      <div className="w-full max-w-7xl mx-auto px-8 py-10 text-[9px] font-bold uppercase tracking-[0.5em] text-white/20">
        © {new Date().getFullYear()} SAM · PRODUCT DESIGNER &amp; AI GENERALIST
      </div>
    </footer>
  );
};

export default Footer;
