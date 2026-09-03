import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'About', href: '#about' },
];

const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 z-20 mx-auto flex w-full max-w-7xl items-center px-8 py-10 left-1/2 -translate-x-1/2">
      <div className="text-2xl font-bold tracking-tight text-white shrink-0">
        SAM'S<span className="text-[#1683FF]">®</span>
      </div>

      <div className="hidden md:flex flex-1 justify-center gap-10 lg:gap-14">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground transition-all duration-500 hover:text-white hover:tracking-[0.5em] whitespace-nowrap"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground transition-all duration-500 hover:text-white hover:tracking-[0.5em] whitespace-nowrap"
        >
          Contact
        </a>
      </div>

      <div className="md:w-32 flex justify-end">
        <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full p-4 md:hidden z-50">
          <div className="liquid-glass rounded-[2rem] p-8 flex flex-col gap-6 text-center shadow-2xl">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold uppercase tracking-widest text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs font-bold uppercase tracking-widest text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
