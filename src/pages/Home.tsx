import React from 'react';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../constants';
import { Monitor, Library as LibraryIcon, Trophy, Code, Newspaper } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            src={CONTACT_INFO.heroBg} 
            alt="Students at Fenster International School" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/70 to-white"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white space-y-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.15] drop-shadow-2xl text-white">
              Join us at <span className="text-gold">Fenster International School</span> today where we provide both local and international curriculum
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Empowering students through global academic excellence and world-class educational standards.
            </p>
          </motion.div>
          
          <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.4, duration: 0.5 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button className="w-full sm:w-auto bg-accent text-white px-10 py-5 rounded-lg text-lg font-bold hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-accent/20 active:scale-95">
              Enroll Today
            </button>
            <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-lg text-lg font-bold hover:bg-white/20 transition-all">
              Explore Programs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Brief Intro */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Welcome to FIS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              Shaping Future Leaders for a Globalized World
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Fenster International School, we don't just teach modules; we cultivate mindsets. Our unique curriculum blends rigorous Nigerian standards with internationally recognized pathways, preparing students for success in local universities and life in Canada.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Dual-Curriculum Academic Excellence",
                "Dedicated Canadian Immigration Guidance",
                "Vocational Skills & Leadership Training"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
              alt="Collaboration at FIS" 
              className="rounded-3xl shadow-2xl object-cover w-full h-[400px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl text-white font-bold text-2xl">
                10+
              </div>
              <p className="text-sm font-semibold text-slate-800">Years of Educational Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Programs Preview */}
      <section className="bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-primary">Academic Opportunities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Discover a world of possibilities through our specialized academic tracks designed for every stage of your journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Secondary School", desc: "Foundational excellence with a focus on both WAEC and international integration.", icon: "🎓" },
              { title: "Diploma Programs", desc: "Short-term specialized courses focusing on technical and vocational skills.", icon: "📜" },
              { title: "Study in Canada", desc: "Complete support for University admissions, work permits, and permanent residency.", icon: "🇨🇦" },
            ].map((program, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="text-5xl mb-6">{program.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{program.title}</h3>
                <p className="text-slate-600 mb-8">{program.desc}</p>
                <button className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group/btn">
                  Learn More
                  <svg className="transform group-hover/btn:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Clubs Section */}
      <section className="bg-primary py-24 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs">Standard Infrastructure</span>
                <h2 className="text-4xl md:text-5xl font-bold">World-Class Facilities & Engaging Clubs</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  We provide an environment that fosters both academic rigor and creative exploration through our modern infrastructure and student-led organizations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { name: "ICT Facility", icon: <Monitor size={24} className="text-gold" />, desc: "State-of-the-art computer labs with high-speed internet." },
                  { name: "Library", icon: <LibraryIcon size={24} className="text-gold" />, desc: "A vast collection of academic and recreational resources." },
                  { name: "Sport Facility", icon: <Trophy size={24} className="text-gold" />, desc: "Modern sport grounds for athletics, football, and more." },
                  { name: "Coding Club", icon: <Code size={24} className="text-gold" />, desc: "Developing the next generation of software engineers." },
                  { name: "News Club", icon: <Newspaper size={24} className="text-gold" />, desc: "Fostering journalism and communication skills." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gold">{item.name}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop" 
                  alt="Students in library" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                   <p className="text-white italic font-light">"Education is the most powerful weapon which you can use to change the world."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
