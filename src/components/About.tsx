const About: React.FC = () => {
  return (
    <section id="about" className="relative z-10 w-full max-w-4xl mx-auto px-8 py-32 text-center">
      <span className="section-label text-primary">About</span>
      <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-10 text-foreground">The Story So Far</h2>
      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed opacity-30">
        Your bio goes here — waiting for the exact wording (school name, title, focus) before this is written.
      </p>
    </section>
  );
};

export default About;
