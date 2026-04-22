import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Tag, ChevronRight, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function News() {
  const [posts, setPosts] = useState<any[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  // Static Newsletters (Front-end only)
  const newsletters = [
    {
      id: 'nl-1',
      title: 'First Term Newsletter 2024',
      file_url: '#',
      created_at: '2024-01-15T00:00:00Z'
    },
    {
      id: 'nl-2',
      title: 'Academic Calendar 2024/2025',
      file_url: '#',
      created_at: '2024-03-20T00:00:00Z'
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    async function fetchContent() {
      const { data: newsData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (newsData) {
        const newsItems = newsData.map((p: any) => ({
          id: p.id,
          category: p.category,
          title: p.title,
          excerpt: p.excerpt,
          date: new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          author: p.author || 'Admin',
          image: p.image_url || 'https://images.unsplash.com/photo-1544717297-fa95b3697628?q=80&w=2070&auto=format&fit=crop'
        }));
        setPosts(newsItems);
      }
    }
    fetchContent();
  }, []);

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="bg-primary py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">School News</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Stay connected with the latest updates, achievements, and upcoming activities at FIS.</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto space-y-12">
          {posts.length === 0 ? (
            <div className="bg-white p-20 rounded-[40px] shadow-sm border border-slate-50 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Calendar size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No news updates yet</h3>
              <p className="text-slate-500">Check back later for the latest announcements and event schedules.</p>
            </div>
          ) : (
            posts.map((post, i) => (
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
                  <p className={`text-slate-500 leading-relaxed whitespace-pre-wrap ${expandedPosts.has(post.id) ? '' : 'line-clamp-2 md:line-clamp-3'}`}>
                    {post.excerpt}
                  </p>
                  <button 
                    onClick={() => toggleExpand(post.id)}
                    className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors pt-2 group/btn"
                  >
                    {expandedPosts.has(post.id) ? 'Show Less' : 'Read Full Story'}
                    <ChevronRight size={18} className={`transform transition-transform ${expandedPosts.has(post.id) ? 'rotate-90' : 'group-hover/btn:translate-x-1'}`} />
                  </button>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
