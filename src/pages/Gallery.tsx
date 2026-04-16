import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Play, X, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Mock data for initial UI
const initialMedia = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop', title: 'Graduation Ceremony 2023' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop', title: 'Science Lab Session' },
  { id: '3', type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', title: 'Life at FIS Canada' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1524178232457-3aa24d9d30ca?q=80&w=2070&auto=format&fit=crop', title: 'Inter-house Sports' },
  { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop', title: 'School Building Nigeria' },
  { id: '6', type: 'video', url: 'https://www.youtube.com/watch?v=uD4izufHSZI', thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop', title: 'FIS Information Session' },
];

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [media, setMedia] = useState<any[]>(initialMedia);

  useEffect(() => {
    async function fetchGallery() {
      if (import.meta.env.VITE_SUPABASE_URL === undefined || import.meta.env.VITE_SUPABASE_URL === '') return;
      
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        const galleryItems = data.map((p: any) => ({
          id: p.id,
          type: p.media_type,
          url: p.media_url,
          thumbnail: p.media_type === 'image' ? p.media_url : 'https://picsum.photos/seed/video/800/600',
          title: p.title
        }));
        setMedia(galleryItems);
      }
    }
    fetchGallery();
  }, []);

  const filteredMedia = filter === 'all' ? media : media.filter(m => m.type === filter);

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="bg-primary py-24 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">School Gallery</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">A visual journey through school life, events, and academic milestones.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 py-12 px-6">
        {['all', 'image', 'video'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-8 py-3 rounded-full text-sm font-bold capitalize transition-all ${
              filter === f ? 'bg-primary text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            {f}s
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredMedia.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="group relative cursor-pointer overflow-hidden rounded-[32px] bg-slate-100 aspect-[4/3] shadow-sm hover:shadow-2xl transition-all"
              onClick={() => setSelectedMedia(item)}
            >
              <img
                src={item.type === 'video' ? item.thumbnail : item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <div className="text-white space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2">
                    {item.type === 'video' ? <Play size={16} fill="white" /> : <Image size={16} />}
                    <span className="text-xs font-bold uppercase tracking-widest">{item.type}</span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-1">{item.title}</h3>
                </div>
              </div>
              {item.type === 'video' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                  <Play size={28} fill="white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6 sm:p-12"
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-6xl w-full flex flex-col items-center gap-8"
            >
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="max-h-[70vh] w-auto h-auto rounded-3xl object-contain shadow-2xl shadow-white/5"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full flex flex-col items-center">
                   <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src={selectedMedia.url.replace('watch?v=', 'embed/')} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <a 
                    href={selectedMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
                  >
                    Watch on YouTube <ExternalLink size={14} />
                  </a>
                </div>
              )}
              <h2 className="text-white text-2xl md:text-3xl font-bold text-center">{selectedMedia.title}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
