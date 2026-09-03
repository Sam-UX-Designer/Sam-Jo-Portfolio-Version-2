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
      <Projects />
      <Experiences />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
