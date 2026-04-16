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
