import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { CONTACT_INFO } from '../constants';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary',
        isScrolled ? 'shadow-lg py-3' : 'py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={CONTACT_INFO.logo} 
            alt="Fenster International School Logo" 
            className="w-12 h-12 object-contain rounded-lg bg-white p-1"
          />
          <div className="flex flex-col">
            <span className="font-bold text-xl leading-none text-white transition-colors">
              Fenster
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-gold transition-colors">
              International School
            </span>
          </div>
        </Link>

        {/* Desktop Links & Actions */}
        <div className="hidden md:flex items-center gap-4 lg:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-xs lg:text-sm font-semibold transition-all hover:text-gold relative group whitespace-nowrap',
                location.pathname === link.href ? 'text-gold' : 'text-white'
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300",
                location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </Link>
          ))}
          <div className="flex items-center gap-2.5 lg:gap-3">
            <a
              href={CONTACT_INFO.portalUrl}
              target={CONTACT_INFO.portalUrl && CONTACT_INFO.portalUrl !== '#' ? "_blank" : undefined}
              rel={CONTACT_INFO.portalUrl && CONTACT_INFO.portalUrl !== '#' ? "noopener noreferrer" : undefined}
              className="flex items-center gap-1.5 lg:gap-2 bg-gold text-primary hover:bg-gold/90 px-3.5 lg:px-4 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-bold shadow-md hover:shadow-gold/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <GraduationCap size={16} />
              School Portal
            </a>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 lg:gap-2 bg-accent text-white px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-bold hover:shadow-xl hover:shadow-accent/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <Phone size={15} />
              Apply Now
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col px-6 py-8 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'text-lg font-medium transition-colors',
                    location.pathname === link.href ? 'text-accent' : 'text-slate-600'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href={CONTACT_INFO.portalUrl}
                  target={CONTACT_INFO.portalUrl && CONTACT_INFO.portalUrl !== '#' ? "_blank" : undefined}
                  rel={CONTACT_INFO.portalUrl && CONTACT_INFO.portalUrl !== '#' ? "noopener noreferrer" : undefined}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl text-base font-bold hover:bg-primary/90 transition-colors shadow-md"
                >
                  <GraduationCap size={18} className="text-gold" />
                  School Portal
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-xl text-base font-bold hover:bg-red-700 transition-colors shadow-md"
                >
                  <Phone size={18} />
                  Chat with FIS
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
