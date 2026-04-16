import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, LogOut, LayoutDashboard, 
  Image as ImageIcon, Newspaper, Calendar as CalendarIcon, 
  Lock, Settings, Eye, EyeOff, Save, CheckCircle, X
} from 'lucide-react';
import { cn } from '../lib/utils';

// Types
interface Post {
  id: string;
  title: string;
  description: string;
  category: 'gallery' | 'news' | 'event';
  imageUrl?: string;
  videoUrl?: string;
  createdAt: number;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Dashboard state
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');
  const [isAdding, setIsAdding] = useState(false);
  
  // New Post Form
  const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    category: 'gallery',
    imageUrl: '',
    videoUrl: ''
  });

  // Load state from localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('fis_admin_auth');
    if (savedAuth === 'true') setIsAuthenticated(true);

    const savedPosts = localStorage.getItem('fis_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Seed with some mock data if empty
      const initial = [
        { id: '1', title: 'Welcome to FIS', description: 'Sample news post', category: 'news', imageUrl: 'https://picsum.photos/seed/news/800/600', createdAt: Date.now() }
      ];
      setPosts(initial as any);
      localStorage.setItem('fis_posts', JSON.stringify(initial));
    }
  }, []);

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

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: Post = {
      ...newPost,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('fis_posts', JSON.stringify(updatedPosts));
    setIsAdding(false);
    setNewPost({ title: '', description: '', category: 'gallery', imageUrl: '', videoUrl: '' });
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(p => p.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('fis_posts', JSON.stringify(updatedPosts));
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
            {error && <p className="text-accent text-sm font-medium text-center">{error}</p>}
            <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg text-lg">
              Unlock Dashboard
            </button>
          </form>
          <p className="mt-8 text-center text-[10px] text-slate-300 uppercase tracking-widest font-bold">
            FENSTER INTERNATIONAL SCHOOL
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
               Manage Posts
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
                {activeTab === 'posts' ? (
                  <motion.div 
                    key="posts"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                       <h2 className="text-2xl font-bold text-primary">Content Repository</h2>
                       <button 
                        onClick={() => setIsAdding(true)}
                        className="bg-accent text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 shadow-lg shadow-accent/20 transition-all"
                       >
                         <Plus size={20} />
                         Add New
                       </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                       {posts.length === 0 ? (
                         <div className="bg-white p-20 rounded-[40px] text-center space-y-4 border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                               <Newspaper size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-400">No content found.</h3>
                            <p className="text-slate-300">Start by adding your first gallery item, news or event.</p>
                         </div>
                       ) : (
                         posts.map((post) => (
                           <div key={post.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition-all">
                              <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                                 {post.imageUrl ? (
                                   <img src={post.imageUrl} className="w-full h-full object-cover" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                                      {post.category === 'gallery' ? <ImageIcon /> : post.category === 'news' ? <Newspaper /> : <CalendarIcon />}
                                   </div>
                                 )}
                              </div>
                              <div className="flex-grow space-y-1">
                                 <div className="flex items-center gap-3">
                                   <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded-md">
                                     {post.category}
                                   </span>
                                   <span className="text-slate-300 text-[10px]">{new Date(post.createdAt).toLocaleDateString()}</span>
                                 </div>
                                 <h3 className="text-lg font-bold text-primary">{post.title}</h3>
                                 <p className="text-slate-500 text-sm line-clamp-1">{post.description}</p>
                              </div>
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="p-4 bg-slate-50 text-slate-400 hover:bg-accent/10 hover:text-accent rounded-2xl transition-all"
                              >
                                <Trash2 size={20} />
                              </button>
                           </div>
                         ))
                       )}
                    </div>
                  </motion.div>
                ) : (
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
                   <h2 className="text-2xl font-bold text-primary">New Content Post</h2>
                   <button onClick={() => setIsAdding(false)} className="text-slate-300 hover:text-slate-600">
                      <X size={32} />
                   </button>
                </div>

                <form onSubmit={handleAddPost} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Title</label>
                        <input 
                          required 
                          placeholder="Post Title" 
                          value={newPost.title}
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                        <select 
                          value={newPost.category}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value as any})}
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        >
                          <option value="gallery">Gallery</option>
                          <option value="news">News</option>
                          <option value="event">Event</option>
                        </select>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                      <textarea 
                        required 
                        rows={3} 
                        placeholder="What is this about?" 
                        value={newPost.description}
                        onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                      ></textarea>
                   </div>

                   <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Image URL (Optional)</label>
                        <input 
                          placeholder="https://images.unsplash.com/..." 
                          value={newPost.imageUrl}
                          onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                        />
                      </div>

                   <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Video Link (YouTube/Drive - Optional)</label>
                        <input 
                          placeholder="https://youtube.com/..." 
                          value={newPost.videoUrl}
                          onChange={(e) => setNewPost({...newPost, videoUrl: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent/20 outline-none transition-all" 
                        />
                      </div>

                   <button className="w-full bg-accent text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-xl shadow-accent/20">
                      <CheckCircle size={20} />
                      Publish Post
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
