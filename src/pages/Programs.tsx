import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Globe, School, Briefcase, Baby } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const programCategories = [
  {
    title: "Early Years & Primary",
    subtitle: "Creche, Kindergarten & Primary",
    icon: <Baby className="text-white" size={32} />,
    color: "bg-accent",
    items: [
      "Creche & Daycare Services",
      "Interactive Kindergarten",
      "Foundational Primary Education",
      "Early Literacy & Numeracy"
    ]
  },
  {
    title: "Secondary School",
    subtitle: "Nigerian & International Curriculum",
    icon: <School className="text-white" size={32} />,
    color: "bg-primary",
    items: [
      "Junior Secondary School (JSS1 - JSS3)",
      "Senior Secondary School (SSS1 - SSS3)",
      "WAEC, NECO & JAMB Preparation",
      "IGCSE & Cambridge Pathways"
    ]
  },
  {
    title: "Diploma Programs",
    subtitle: "Short-term Career-Focused Learning",
    icon: <BookOpen className="text-white" size={32} />,
    color: "bg-accent",
    items: [
      "Technical & Vocational Diplomas",
      "Business Management Foundations",
      "Information Technology Certifications",
      "Pre-University Bridge Courses"
    ]
  },
  {
    title: "University & Degrees",
    subtitle: "Higher Education Partnerships",
    icon: <GraduationCap className="text-white" size={32} />,
    color: "bg-primary",
    items: [
      "Undergraduate Degree Pathways",
      "Direct Entry Support",
      "Postgraduate Diplomas",
      "MBA & Executive Education"
    ]
  },
  {
    title: "Work & Live in Canada",
    subtitle: "Complete Relocation Services",
    icon: <Globe className="text-white" size={32} />,
    color: "bg-accent",
    items: [
      "Study Permits & Admissions",
      "Canadian University Placement",
      "Post-Graduation Work Permits",
      "Permanent Residency Guidance"
    ]
  }
];

export default function Programs() {
  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="bg-primary py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Academic Programs</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Explore our diverse academic pathways designed to take you from foundational excellence to global careers.</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programCategories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className={`${cat.color} p-10 flex items-start justify-between`}>
                <div className="space-y-2">
                  <h3 className="text-white text-3xl font-bold">{cat.title}</h3>
                  <p className="text-white/80 font-medium">{cat.subtitle}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  {cat.icon}
                </div>
              </div>
              <div className="p-10">
                <ul className="space-y-4">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-4 text-slate-700 font-medium group-hover:translate-x-1 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 pt-10 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Opportunities</span>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-accent transition-colors flex items-center gap-2">
                    Inquire Details
                    <BookOpen size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-primary rounded-[50px] p-12 md:p-20 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full translate-x-32 -translate-y-32 opacity-10"></div>
          <div className="relative z-10 space-y-4">
             <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto">Not sure which program is right for you?</h2>
             <p className="text-xl text-white/70 max-w-xl mx-auto">Schedule a free consultation with our academic counselors today.</p>
          </div>
          <a href="/contact" className="relative z-10 inline-block bg-accent text-white px-12 py-5 rounded-lg text-lg font-bold hover:shadow-xl hover:shadow-accent/20 transition-all transform hover:scale-105 active:scale-95">
            Book a Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
