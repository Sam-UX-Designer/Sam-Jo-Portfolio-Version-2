const PLACEHOLDER_COUNT = 2;

const Experiences: React.FC = () => {
  return (
    <section id="experiences" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
      <span className="section-label text-primary">Journey</span>
      <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-16 text-foreground">Experiences</h2>

      <div className="flex flex-col gap-4">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="liquid-glass rounded-[2rem] px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-40">
                Role {i + 1}
              </span>
              <p className="display-font text-2xl mt-2 text-foreground opacity-30">Company name</p>
            </div>
            <span className="text-xs text-muted-foreground opacity-30 whitespace-nowrap">Dates · waiting for content</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
