import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'features', 'benefits', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'Benefits', id: 'benefits' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-glass' : 'bg-transparent'}`}
      style={{ fontFamily: 'var(--font-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 group" aria-label="GreenVerse Home">
          <img src="/greenlogo.png" alt="GreenVerse Logo" className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
          <span className="text-lg font-bold text-gradient hidden sm:block">GreenVerse</span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`nav-link text-sm font-semibold tracking-wide text-gray-700 hover:text-green-600 transition-colors ${activeSection === link.id ? 'active text-green-600' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Contact Us button */}
        <div className="hidden md:block">
          <button onClick={() => scrollTo('contact')} className="btn-primary text-sm">
            Contact Us
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:text-green-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <div className="px-6 py-4 flex flex-col gap-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left text-sm font-semibold py-2 text-gray-700 hover:text-green-600 transition-colors border-b border-gray-100 ${activeSection === link.id ? 'text-green-600' : ''}`}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} className="btn-primary text-sm w-fit mt-2 mx-auto">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
