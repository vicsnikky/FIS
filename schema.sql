-- Schema for Fenster International School Supabase Database

-- 1. Contact Inquiries Table
-- Stores messages sent via the Contact Us form
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Newsletter Subscribers Table
-- Stores emails of users who subscribed via the News page newsletter form
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- Row Level Security (RLS) Settings
-- These settings protect your database from unauthorized access
-- ==============================================================================

-- Enable RLS for both tables
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (public/anonymous users) to submit a contact form
CREATE POLICY "Allow public inserts for inquiries" ON inquiries
  FOR INSERT TO public WITH CHECK (true);

-- Policy: Allow anyone (public/anonymous users) to subscribe to the newsletter
CREATE POLICY "Allow public inserts for newsletter" ON newsletter_subscribers
  FOR INSERT TO public WITH CHECK (true);
  
-- Policy: Only authenticated users (like an Admin panel) can read inquiries
CREATE POLICY "Allow authenticated reads for inquiries" ON inquiries
  FOR SELECT TO authenticated USING (true);
  
-- Policy: Only authenticated users (like an Admin panel) can read subscribers
CREATE POLICY "Allow authenticated reads for newsletter" ON newsletter_subscribers
  FOR SELECT TO authenticated USING (true);


-- ==============================================================================
-- NEW TABLES for Admin Panel
-- ==============================================================================

-- 3. News & Events Table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('News', 'Events')),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT DEFAULT 'Admin',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Gallery Table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: Because we are building a quick Admin Dashboard, we are adding completely public policies 
-- just to make the preview app function right away. For a real production app, wrap these
-- FOR INSERT/UPDATE/DELETE to authenticated only.

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public full access for posts" ON posts FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public full access for gallery" ON gallery FOR ALL TO public USING (true) WITH CHECK (true);
