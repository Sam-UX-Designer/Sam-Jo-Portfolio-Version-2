const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative z-10 w-full max-w-4xl mx-auto px-8 py-32 text-center">
      <span className="section-label text-primary">Get in Touch</span>
      <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-10 text-foreground">Let's Talk</h2>
      <a
        href="mailto:samueljothi1919@gmail.com"
        className="inline-block liquid-glass rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-foreground hover:tracking-[0.4em] transition-all duration-500"
      >
        samueljothi1919@gmail.com
      </a>
    </section>
  );
};

export default Contact;
