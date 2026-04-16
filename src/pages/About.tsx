import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Eye, Award } from 'lucide-react';

const values = [
  { 
    title: "Excellence", 
    desc: "We strive for the highest standards in everything we do, from academics to character building.",
    icon: <Award className="text-gold" size={32} />
  },
  { 
    title: "Integrity", 
    desc: "Acting with honesty and strong moral principles is at the heart of our community.",
    icon: <Shield className="text-gold" size={32} />
  },
  { 
    title: "Innovation", 
    desc: "We embrace new ideas and technologies to prepare our students for a changing world.",
    icon: <Target className="text-gold" size={32} />
  },
  { 
    title: "Global Mindset", 
    desc: "We foster an environment that appreciates diversity and international perspectives.",
    icon: <Eye className="text-gold" size={32} />
  }
];

export default function About() {
  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="bg-primary py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Our Story</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Discover the foundation of excellence that drives Fenster International School.</p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" 
              alt="School campus" 
              className="rounded-3xl shadow-2xl object-cover w-full h-[500px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold rounded-full -z-10 animate-pulse opacity-10"></div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">A Legacy of Quality Education</h2>
              <div className="w-20 h-1.5 bg-gold rounded-full"></div>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              Fenster International School (FIS) was founded with a singular purpose: to bridge the gap between local educational standards and global opportunities. With campuses in Nigeria and Canada, we offer a truly international experience that prepares students for the challenges of tomorrow.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our holistic approach ensures that students are not only academically proficient but also socially responsible and culturally aware. We prioritize personal growth, leadership development, and vocational mastery through our <strong>standard ICT facility, library, and world-class sport facilities</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-24 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-6 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary">Our Mission</h3>
            <p className="text-slate-600 text-lg leading-relaxed italic font-light">
              "To empower students through high-quality, international standard education that prepares them to study, work, and thrive in a global environment, specifically fostering pathways between Nigeria and Canada."
            </p>
          </div>
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-6 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-bold text-primary">Our Vision</h3>
            <p className="text-slate-600 text-lg leading-relaxed italic font-light">
              "To be a leading global educational hub recognized for academic excellence, innovative teaching, and being the primary bridge for students seeking international career and life opportunities."
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">Our Core Values</h2>
          <p className="text-slate-500">The pillars that define the Fenster experience.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="text-center space-y-6 p-8 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
              <div className="w-16 h-16 mx-auto bg-gold/10 rounded-2xl flex items-center justify-center">
                {v.icon}
              </div>
              <h4 className="text-xl font-bold text-primary">{v.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
