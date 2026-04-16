import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Tag, ChevronRight, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

const newsPosts = [
  {
    id: '1',
    category: 'News',
    title: 'FIS Enrollment Now Open for 2024 Academic Session',
    excerpt: 'Join the Fenster community as we open our doors for the upcoming year with new programs and expanded facilities in Nigeria.',
    date: 'April 12, 2026',
    author: 'Admin',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b3697628?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    category: 'Events',
    title: 'Study in Canada Information Session: Virtual Event',
    excerpt: 'Learn about the visa application process and university scholarship opportunities in Alberta, Canada.',
    date: 'May 5, 2026',
    author: 'Counseling Dept',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    category: 'News',
    title: 'New Vocational Training Lab Commissioned',
    excerpt: 'FIS Nigeria expands its technical education footprint with the launch of a state-of-the-art vocational training center.',
    date: 'March 20, 2026',
    author: 'Principal',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function News() {
  const [posts, setPosts] = useState<any[]>(newsPosts);
  const [newsletterStatus, setNewsletterStatus] = useState({ submitting: false, success: false, error: '' });

  useEffect(() => {
    async function fetchNews() {
      if (import.meta.env.VITE_SUPABASE_URL === undefined || import.meta.env.VITE_SUPABASE_URL === '') return;
      
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        const newsItems = data.map((p: any) => ({
          id: p.id,
          category: p.category,
          title: p.title,
          excerpt: p.excerpt,
          date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          author: p.author || 'Admin',
          image: p.image_url || 'https://images.unsplash.com/photo-1544717297-fa95b3697628?q=80&w=2070&auto=format&fit=crop'
        }));
        setPosts((current) => [...newsItems, ...newsPosts]);
      }
    }
    fetchNews();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus({ submitting: true, success: false, error: '' });
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') throw new Error('You are already subscribed!');
        throw error;
      }
      
      setNewsletterStatus({ submitting: false, success: true, error: '' });
      e.currentTarget.reset();
    } catch (err: any) {
      console.error('Error subscribing:', err);
      setNewsletterStatus({ submitting: false, success: false, error: err.message || 'Subscription failed.' });
    }
  };

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="bg-primary py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">News & Events</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Stay connected with the latest updates, achievements, and upcoming activities at FIS.</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-12">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 rounded-[40px] shadow-sm border border-slate-50 hover:shadow-2xl transition-all"
              >
                <div className="md:col-span-5 relative overflow-hidden rounded-3xl aspect-[4/3] md:aspect-square">
                   <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <Tag size={12} className="text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{post.category}</span>
                  </div>
                </div>
                
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-6 text-slate-400 text-xs font-medium">
                    <div className="flex items-center gap-2">
                       <Calendar size={14} />
                       {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                       <User size={14} />
                       {post.author}
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors pt-2 group/btn">
                    Read Full Story
                    <ChevronRight size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            {/* Newsletter */}
            <div className="bg-primary p-10 rounded-[40px] text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold rounded-full translate-x-16 -translate-y-16 opacity-10"></div>
              <h3 className="text-2xl font-bold relative z-10">FIS Newsletter</h3>
              <p className="text-white/80 relative z-10">Subscribe to get school updates and Canada study tips delivered to your inbox.</p>
              
              {newsletterStatus.success && (
                <div className="p-3 bg-green-500/20 text-green-100 rounded-xl border border-green-500/30 text-sm relative z-10">
                  Subscribed successfully!
                </div>
              )}
              {newsletterStatus.error && (
                <div className="p-3 bg-red-500/20 text-red-100 rounded-xl border border-red-500/30 text-sm relative z-10">
                  {newsletterStatus.error}
                </div>
              )}

              <form onSubmit={handleNewsletterSubmit} className="space-y-3 relative z-10">
                 <input type="email" name="email" required placeholder="Your Email" className="w-full bg-white border border-white rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-gold text-slate-800 placeholder:text-slate-400" />
                 <button disabled={newsletterStatus.submitting} type="submit" className="w-full bg-accent text-white py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-accent/20 active:scale-95 transition-all disabled:opacity-75 disabled:cursor-not-allowed">
                   {newsletterStatus.submitting ? 'Subscribing...' : 'Subscribe Now'}
                 </button>
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-primary">Categories</h3>
              <ul className="space-y-4">
                 {[
                   { name: 'All News', count: 12 },
                   { name: 'Academics', count: 5 },
                   { name: 'Events', count: 8 },
                   { name: 'Admissions', count: 3 }
                 ].map((cat) => (
                   <li key={cat.name} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-slate-600 group-hover:text-primary font-medium transition-colors">{cat.name}</span>
                      <span className="bg-slate-50 text-slate-400 px-3 py-1 rounded-lg text-xs font-bold group-hover:bg-gold group-hover:text-primary transition-all">{cat.count}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
