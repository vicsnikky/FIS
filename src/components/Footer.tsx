import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Mail, MapPin, Globe } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const TikTokIcon = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.51-.15-.11-.29-.22-.44-.33v5.6c0 3.11-2.04 5.92-5.06 6.64-3.56.88-7.39-1.12-8.52-4.59-1.22-3.76 1.13-8.11 5.12-8.62.38-.05.77-.07 1.16-.06v4.11c-.34-.04-.69-.03-1.04.04-1.63.35-2.73 1.96-2.48 3.59.27 1.83 2.19 2.97 3.93 2.37 1.25-.43 2.05-1.66 2-2.98.01-4.02-.01-8.04.01-12.06.01-.06.01-.13.01-.19z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-auto pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={CONTACT_INFO.logo} 
                alt="Fenster Logo" 
                className="w-12 h-12 object-contain rounded-lg bg-white p-1"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">Fenster</span>
                <span className="text-[10px] uppercase tracking-tighter text-gold font-bold">International School</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Providing holistic and international standard education to foster global citizens and future leaders.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={CONTACT_INFO.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                title="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={CONTACT_INFO.socials.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                title="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
              <a 
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-4 text-white/70 text-sm font-medium">
              <li><Link to="/about" className="hover:text-gold transition-colors">Our History</Link></li>
              <li><Link to="/programs" className="hover:text-gold transition-colors">Curriculum</Link></li>
              <li><Link to="/gallery" className="hover:text-gold transition-colors">School Life</Link></li>
              <li><Link to="/news" className="hover:text-gold transition-colors">Events</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Apply Now</Link></li>
            </ul>
          </div>

          {/* Contact - Nigeria */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-gold">
              <Globe size={18} />
              FIS Nigeria
            </h4>
            <div className="space-y-4 text-white/70 text-sm">
              <div className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-gold transition-transform hover:scale-110" />
                <span>{CONTACT_INFO.nigeria.address}</span>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="shrink-0 text-gold transition-transform hover:scale-110" />
                <span>{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Contact - Canada */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-gold">
              <Globe size={18} />
              FIS Canada
            </h4>
            <div className="space-y-4 text-white/70 text-sm">
              <div className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-gold transition-transform hover:scale-110" />
                <span>{CONTACT_INFO.canada.address}</span>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="shrink-0 text-gold transition-transform hover:scale-110" />
                <span>{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide text-white/50 uppercase">
          <p>© {currentYear} Fenster International School. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
