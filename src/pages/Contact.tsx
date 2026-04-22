import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, Phone, Mail, Send } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([{ name, email, subject, message }]);

      if (error) throw error;
      
      setStatus({ submitting: false, success: true, error: '' });
      e.currentTarget.reset();
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setStatus({ submitting: false, success: false, error: err.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="bg-primary py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">Contact Us</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Have questions? We are here to help you navigate your academic journey.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Get in Touch</h2>
              <p className="text-slate-600">Reach out to us via any of our administrative offices or send us a message directly from the form.</p>
            </div>

            <div className="space-y-8">
              {/* Nigeria */}
              <div className="flex gap-6 p-6 rounded-3xl bg-white shadow-sm border border-slate-50">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <MapPin />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-primary text-xl">Nigeria Campus</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {CONTACT_INFO.nigeria.address}
                  </p>
                  <p className="text-accent font-semibold text-sm">+234 805 806 1296</p>
                </div>
              </div>

              {/* Canada */}
              <div className="flex gap-6 p-6 rounded-3xl bg-white shadow-sm border border-slate-50">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                  <MapPin />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-primary text-xl">Canada Office</h4>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {CONTACT_INFO.canada.address}
                  </p>
                  <p className="text-accent font-semibold text-sm">Edmonton, Alberta</p>
                </div>
              </div>

              {/* WhatsApp Call to Action */}
              <div className="p-8 rounded-[40px] bg-accent text-white space-y-6 shadow-2xl shadow-accent/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>
                <h4 className="text-2xl font-bold relative z-10">Prefer Chatting?</h4>
                <p className="text-white/80 relative z-10">Our admissions team is active on WhatsApp for quick inquiries.</p>
                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-accent px-6 py-3 rounded-full font-bold hover:bg-slate-50 transition-colors relative z-10"
                >
                  Message now on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-slate-50">
            <h3 className="text-2xl font-bold text-primary mb-8">Send a Message</h3>
            {status.success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-2xl border border-green-200">
                Thank you for your message! We will get back to you shortly.
              </div>
            )}
            {status.error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200">
                {status.error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Your Name</label>
                  <input type="text" name="name" required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Subject</label>
                <select name="subject" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Admissions</option>
                  <option>Study in Canada</option>
                  <option>Partnerships</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                <textarea name="message" required rows={5} placeholder="How can we help you?" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-gold outline-none transition-all resize-none"></textarea>
              </div>
              <button disabled={status.submitting} type="submit" className="w-full bg-accent text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-accent/20 active:scale-95 transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                {status.submitting ? 'Sending...' : 'Send Inquiry'}
                {!status.submitting && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map/Campus Image */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="w-full h-[500px] bg-slate-100 rounded-[40px] flex items-center justify-center overflow-hidden border border-slate-200 relative group">
           <img 
            src="https://i.ibb.co/bMzx4VJ7/Screenshot-20260422-181318-Whats-App.jpg" 
            alt="Nigeria Campus" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
           <div className="absolute bottom-10 left-10 flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
             <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white">
               <MapPin size={24} />
             </div>
             <div className="text-white">
               <p className="text-sm font-bold uppercase tracking-widest opacity-70">Nigeria Campus Location</p>
               <h4 className="text-xl font-bold">Visit us today for academic excellence</h4>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
