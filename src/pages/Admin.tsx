import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, LogOut, LayoutDashboard, 
  Image as ImageIcon, Newspaper, Calendar as CalendarIcon, 
  Lock, Settings, Eye, EyeOff, Save, CheckCircle, X, ImagePlus, Upload
} from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Dashboard state
  const [posts, setPosts] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'gallery' | 'settings'>('posts');
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New Item Form
  type ContentType = 'news' | 'event' | 'gallery';
  const [formType, setFormType] = useState<ContentType>('news');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    mediaType: 'image', // for gallery: 'image' or 'video'
    mediaUrl: '', // for video link
  });
  const [fileBase64, setFileBase64] = useState<string>('');

  // Load state
  useEffect(() => {
    const savedAuth = localStorage.getItem('fis_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const { data: postsData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (postsData) setPosts(postsData);

      const { data: galleryData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (galleryData) setGallery(galleryData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('fis_admin_password') || 'FIS123';
    
    if (password === storedPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('fis_admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fis_admin_auth');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formType === 'gallery') {
        const payload = {
          title: formData.title,
          media_type: formData.mediaType,
          media_url: formData.mediaType === 'image' ? fileBase64 : formData.mediaUrl
        };
        await supabase.from('gallery').insert([payload]);
      } else {
        const payload = {
          category: 'News',
          title: formData.title,
          excerpt: formData.excerpt,
          image_url: fileBase64
        };
        await supabase.from('posts').insert([payload]);
      }
      
      await fetchData();
      setIsAdding(false);
      setFormData({ title: '', excerpt: '', mediaType: 'image', mediaUrl: '' });
      setFileBase64('');
    } catch (error) {
      console.error('Error adding content:', error);
      alert('Failed to add content. Make sure Supabase is connected.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string, type: 'post' | 'gallery') => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      if (type === 'post') {
        await supabase.from('posts').delete().eq('id', id);
      } else {
        await supabase.from('gallery').delete().eq('id', id);
      }
      fetchData();
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = (e.target as any).newPassword.value;
    if (newPass) {
      localStorage.setItem('fis_admin_password', newPass);
      alert('Password updated successfully!');
      (e.target as any).reset();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-slate-100"
        >
          <div className="text-center space-y-4 mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-bold text-primary">Admin Portal</h1>
            <p className="text-slate-500">Please enter the administrator password.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-accent/20 outline-none transition-all pr-14"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }} 
                  className="text-red-500 text-sm font-semibold text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" className="w-full bg-accent text-white py-5 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-accent/20 active:scale-95">
              Access Dashboard
            </button>
          </form>
          
          <p className="text-center text-slate-400 text-sm mt-8">
            Default password on first run: <strong className="text-slate-600">FIS123</strong>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 bg-primary p-8 rounded-[40px] text-white shadow-2xl">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <LayoutDashboard size={32} />
             </div>
             <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-white/60">Manage your school's content across all platforms.</p>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-bold transition-all self-start md:self-center"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
             <button 
               onClick={() => setActiveTab('posts')}
               className={cn(
                 "w-full flex items-center gap-4 px-8 py-5 rounded-3xl font-bold transition-all",
                 activeTab === 'posts' ? "bg-white text-primary shadow-xl" : "text-slate-500 hover:bg-white/50"
               )}
             >
               <Newspaper size={20} />
               News
             </button>
             <button 
               onClick={() => setActiveTab('gallery')}
               className={cn(
                 "w-full flex items-center gap-4 px-8 py-5 rounded-3xl font-bold transition-all",
                 activeTab === 'gallery' ? "bg-white text-primary shadow-xl" : "text-slate-500 hover:bg-white/50"
               )}
             >
               <ImagePlus size={20} />
               Gallery
             </button>
             <button 
               onClick={() => setActiveTab('settings')}
               className={cn(
                 "w-full flex items-center gap-4 px-8 py-5 rounded-3xl font-bold transition-all",
                 activeTab === 'settings' ? "bg-white text-primary shadow-xl" : "text-slate-500 hover:bg-white/50"
               )}
             >
               <Settings size={20} />
               Settings
             </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
             <AnimatePresence mode="wait">
                {activeTab === 'posts' && (
                  <motion.div 
                    key="posts"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-bold text-primary">School News</h2>
                       <button 
                        onClick={() => { setFormType('news'); setIsAdding(true); }}
                        className="bg-accent text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 shadow-lg shadow-accent/20 transition-all"
                       >
                         <Plus size={20} />
                         Add News
                       </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       {posts.length === 0 ? (
                         <div className="bg-white p-20 rounded-[40px] text-center space-y-4 border border-dashed border-slate-200">
                            <h3 className="text-xl font-bold text-slate-400">No content found.</h3>
                         </div>
                       ) : (
                         posts.map((post) => (
                           <div key={post.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition-all">
                              <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                                 {post.image_url ? (
                                   <img src={post.image_url} className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                                      <Newspaper />
                                   </div>
                                 )}
                              </div>
                              <div className="flex-grow space-y-1">
                                 <div className="flex items-center gap-3">
                                   <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded-md">
                                     {post.category}
                                   </span>
                                   <span className="text-slate-300 text-[10px]">{new Date(post.created_at).toLocaleDateString()}</span>
                                 </div>
                                 <h3 className="text-lg font-bold text-primary">{post.title}</h3>
                                 <p className="text-slate-500 text-sm line-clamp-1">{post.excerpt}</p>
                              </div>
                              <button 
                                onClick={() => handleDeletePost(post.id, 'post')}
                                className="p-4 bg-slate-50 text-slate-400 hover:bg-accent/10 hover:text-accent rounded-2xl transition-all"
                              >
                                <Trash2 size={20} />
                              </button>
                           </div>
                         ))
                       )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'gallery' && (
                  <motion.div 
                    key="gallery"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-bold text-primary">Gallery Content</h2>
                       <button 
                        onClick={() => { setFormType('gallery'); setIsAdding(true); }}
                        className="bg-accent text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 shadow-lg shadow-accent/20 transition-all"
                       >
                         <Plus size={20} />
                         Add Media
                       </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {gallery.length === 0 ? (
                         <div className="bg-white p-20 rounded-[40px] text-center space-y-4 border border-dashed border-slate-200 col-span-2">
                            <h3 className="text-xl font-bold text-slate-400">No gallery items found.</h3>
                         </div>
                       ) : (
                         gallery.map((gItem) => (
                           <div key={gItem.id} className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-xl transition-all">
                              <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                                 {gItem.media_type === 'image' ? (
                                   <img src={gItem.media_url} className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                                      <ImageIcon />
                                   </div>
                                 )}
                              </div>
                              <div className="flex-grow space-y-1">
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded-md">
                                   {gItem.media_type}
                                 </span>
                                 <h3 className="text-sm font-bold text-primary line-clamp-1">{gItem.title}</h3>
                              </div>
                              <button 
                                onClick={() => handleDeletePost(gItem.id, 'gallery')}
                                className="p-3 bg-slate-50 text-slate-400 hover:bg-accent/10 hover:text-accent rounded-xl transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                           </div>
                         ))
                       )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div 
                    key="settings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-10"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-primary">Security Settings</h2>
                      <p className="text-slate-500">Update your administrative credentials here.</p>
                    </div>

                    <form onSubmit={handleChangePassword} className="max-w-md space-y-6">
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 ml-1">New Administrator Password</label>
                          <input 
                            name="newPassword"
                            type="password" 
                            required 
                            placeholder="Enter new password" 
                            className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                          />
                       </div>
                       <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-lg">
                          <Save size={20} />
                          Update Password
                       </button>
                    </form>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/20 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]"
            >
              <div className="p-10 space-y-8">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-bold text-primary">
                     {formType === 'gallery' ? 'Add to Gallery' : 'Add News'}
                   </h2>
                   <button onClick={() => setIsAdding(false)} className="text-slate-300 hover:text-slate-600">
                      <X size={32} />
                   </button>
                </div>

                <form onSubmit={handleAddPost} className="space-y-6">
                   <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Title</label>
                        <input 
                          required 
                          placeholder="Title" 
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                        />
                      </div>

                      {formType === 'gallery' ? (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Media Type</label>
                            <select 
                              value={formData.mediaType}
                              onChange={(e) => setFormData({...formData, mediaType: e.target.value})}
                              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                            >
                              <option value="image">Image Upload</option>
                              <option value="video">Video Link</option>
                            </select>
                          </div>

                          {formData.mediaType === 'image' ? (
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-700 ml-1">Upload Image</label>
                              <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl px-6 py-6 text-center hover:bg-slate-100 transition-colors relative cursor-pointer">
                                 <input type="file" accept="image/*" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                 <div className="flex flex-col items-center gap-2 text-slate-500">
                                   <Upload size={24} />
                                   <span className="font-medium text-sm">Click to Browse or Drag Image Here</span>
                                   {fileBase64 && <span className="text-green-600 text-xs mt-2">Image Selected Successfully!</span>}
                                 </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Video Link (YouTube/Drive url)</label>
                                <input 
                                  required
                                  placeholder="https://youtube.com/..." 
                                  value={formData.mediaUrl}
                                  onChange={(e) => setFormData({...formData, mediaUrl: e.target.value})}
                                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                                />
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Description / Excerpt</label>
                            <textarea 
                              required 
                              rows={3} 
                              placeholder="Brief description..." 
                              value={formData.excerpt}
                              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                            ></textarea>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Cover Image (Optional)</label>
                            <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl px-6 py-6 text-center hover:bg-slate-100 transition-colors relative cursor-pointer">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="flex flex-col items-center gap-2 text-slate-500">
                                  <Upload size={24} />
                                  <span className="font-medium text-sm">Click to Upload Cover Image</span>
                                  {fileBase64 && <span className="text-green-600 text-xs mt-2">Image Selected Successfully!</span>}
                                </div>
                            </div>
                          </div>
                        </>
                      )}
                   </div>

                   <button disabled={isSubmitting} className="w-full bg-accent text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-xl shadow-accent/20 disabled:opacity-70 disabled:cursor-not-allowed">
                      <CheckCircle size={20} />
                      {isSubmitting ? 'Uploading...' : 'Publish Content'}
                   </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
