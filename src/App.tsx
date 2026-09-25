import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experiences from './components/Experiences';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Coming back from a case study (e.g. /#projects): the section only exists
  // after React renders, so the browser can't jump to it on its own.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

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
