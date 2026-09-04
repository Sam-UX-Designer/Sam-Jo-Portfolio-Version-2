import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'About', href: '#about' },
];

const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 z-20 w-full px-8 py-10">
      <div className="w-full flex items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-normal text-white shrink-0">
          SAM'S<span className="text-[#1683FF]">®</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14 ml-auto">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[10px] font-bold uppercase tracking-normal text-muted-foreground transition-colors duration-500 hover:text-white whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-[10px] font-bold uppercase tracking-normal text-muted-foreground transition-colors duration-500 hover:text-white whitespace-nowrap"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto flex justify-end">
          <button
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full p-4 md:hidden z-50">
            <div className="liquid-glass rounded-[2rem] p-8 flex flex-col gap-6 text-center shadow-2xl">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-xs font-bold uppercase tracking-normal text-foreground"
                >
                  {item.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="text-xs font-bold uppercase tracking-normal text-foreground"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
