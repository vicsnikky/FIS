import React from 'react';
import { motion } from 'motion/react';
import { Shield, Target, Eye, Award, MapPin } from 'lucide-react';

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
              src="https://i.ibb.co/bMzx4VJ7/Screenshot-20260422-181318-Whats-App.jpg" 
              alt="Fenster International School Nigeria Campus" 
              className="rounded-[40px] shadow-2xl object-cover w-full h-[550px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg text-white">
                <MapPin size={20} />
              </div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Nigeria Main Campus</p>
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold rounded-full -z-10 animate-pulse opacity-10"></div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Fenster International School</h2>
              <div className="w-20 h-1.5 bg-gold rounded-full"></div>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              Fenster International School was established in 2017 and received government approval on 9th January 2018 to commence full operations for Nursery and Primary education. In July of the same year, the school also obtained approval to run Senior Secondary School programmes.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              The school is located at 1 & 5, Kolade Adedeji Street, Jaffa Bus Stop, Ope-Ilu Road, Agbado Station, Ogun State. With over 270 pupils and students, the school provides a friendly, safe, and serene environment that supports effective learning and character development.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Fenster International School is committed to building a bridge between who a child is today and who they will become tomorrow. The school is overseen by a Board of Directors made up of experienced professionals who formulate policies, while the day-to-day administration is handled by the management team led by the Principal and Vice Principals.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Admission is open to students within the community, across Nigeria, and from overseas. The school is well equipped with qualified teachers and modern facilities including science laboratories, a well-stocked library, ICT facilities, STEM learning resources, separate hostels for boys and girls, and school buses, all designed to support academic excellence and the holistic development of every child.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Path */}
      <section className="bg-white py-24 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 space-y-6 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold text-primary">The Mission</h3>
            <p className="text-slate-600 leading-relaxed italic font-light">
              "To deliver world class education to children: inspire, challenge, and empower students and staff in a safe, supportive environment, inculcate high moral and ethical values in our students as we prepare them for a life of service and fulfillment, and graduate students who attain the high standards set forth for national and international opportunities."
            </p>
          </div>
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 space-y-6 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-bold text-primary">The Vision</h3>
            <p className="text-slate-600 leading-relaxed italic font-light">
              "To become a world class school with a serenely conducive environment and modern infrastructure driven by highly competent and qualified teaching and non-teaching staff with tenacious passion for child development."
            </p>
          </div>
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 space-y-6 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform">
              <Shield size={32} />
            </div>
            <h3 className="text-2xl font-bold text-primary">Our Path</h3>
            <p className="text-slate-600 leading-relaxed italic font-light">
              "We guide our students toward a successful future by connecting them with higher institutions both locally and internationally through the support of capable and well-informed Admission Officers. Through this process, we ease the burden on parents by handling the complexities of first-degree admission procedures within and outside the country."
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-slate-50">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">Our Core Values</h2>
          <p className="text-slate-500">The pillars that define the Fenster experience.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-white text-center space-y-6 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all border border-slate-50">
              <div className="w-16 h-16 mx-auto bg-gold/10 rounded-2xl flex items-center justify-center">
                {v.icon}
              </div>
              <h4 className="text-xl font-bold text-primary">{v.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-white border-t border-slate-100">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary tracking-tight">Meet Our Leaders</h2>
          <div className="w-20 h-1.5 bg-gold rounded-full mx-auto"></div>
          <p className="text-slate-500 max-w-2xl mx-auto pt-4">
            The visionary team of experienced professionals shaping the future of our students and institution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            {
              name: 'Mr. Kazeem Olabanji Salami',
              role: 'Chairman and Founder',
              image: 'https://i.ibb.co/1JnsZ4MD/Whats-App-Image-2026-04-22-at-2-56-25-PM.jpg'
            },
            {
              name: 'Miss Mojisola Racheal Salami',
              role: 'Executive Director',
              image: 'https://i.ibb.co/KxBb17gx/file-000000000dd071f48905bcbf9301b7be.png'
            },
            {
              name: 'Mrs. Ibiyemi Kehinde',
              role: 'Senior Principal / School Administrator',
              image: 'https://i.ibb.co/Q3Rk7nKM/ibiyemi.jpg'
            },
            {
              name: 'Mr. Odewale Daniel',
              role: 'Vice Principal / Academics',
              image: 'https://i.ibb.co/C56th6dH/IMG-20260422-WA0020.jpg'
            },
            {
              name: 'Mr. Peterson Samuel Kelvin',
              role: 'Vice Principal / Assistant School Administrator / Head of Staff',
              image: 'https://i.ibb.co/gF3qyV7v/file-00000000f61071f49f632eb77eaee58e.png'
            },
            {
              name: 'Mrs. Sanni Olaitan',
              role: 'Bursar / Resource Manager',
              image: 'https://i.ibb.co/39H7FpGZ/file-00000000cc3471fdbbe9feee2ccb239e.png'
            }
          ].map((leader, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              key={i} 
              className="group bg-slate-50 rounded-[40px] overflow-hidden hover:bg-primary transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20"
            >
              <div className="aspect-[4/5] overflow-hidden m-4 rounded-[32px] bg-slate-200">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 pt-4 text-center transform transition-transform duration-500 group-hover:-translate-y-1">
                <h3 className="font-bold text-xl text-primary group-hover:text-gold transition-colors duration-300">{leader.name}</h3>
                <p className="text-slate-500 text-sm mt-3 font-medium group-hover:text-white/80 transition-colors uppercase tracking-wider">{leader.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
