import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experiences from './components/Experiences';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative w-full bg-background overflow-x-hidden">
      <Nav />
      <Hero />

      {/* Smooth transition: dark night hero → bright day sections */}
      <div
        className="h-32 w-full"
        style={{
          background: 'linear-gradient(180deg, hsl(220 40% 6%) 0%, #24405f 55%, #6b93c4 100%)',
        }}
      />

      <Projects />
      <Experiences />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
