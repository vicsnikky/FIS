import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gsqodfwzfxiearchdyug.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcW9kZnd6ZnhpZWFyY2hkeXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTc4OTUsImV4cCI6MjA5MTkzMzg5NX0.Wgb6POz8H0GVyREvRDIKjNDjU7-9z2E8dO4s9pWC748';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Missing Supabase URL or Anon Key. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
