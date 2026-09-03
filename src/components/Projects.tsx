const PLACEHOLDER_COUNT = 3;

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
      <span className="section-label text-primary">Selected Work</span>
      <h2 className="display-font text-4xl sm:text-6xl mt-4 mb-16 text-foreground">Projects</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="liquid-glass rounded-[2rem] aspect-[4/5] flex flex-col items-center justify-center gap-3 text-center px-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground opacity-40">
              Project {i + 1}
            </span>
            <span className="text-xs text-muted-foreground opacity-30">Waiting for content</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
