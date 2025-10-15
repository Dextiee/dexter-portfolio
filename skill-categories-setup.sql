-- Skill Categories Table Setup
-- Run this in your Supabase SQL Editor

-- Create skill_categories table
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_skill_categories_name ON skill_categories(name);

-- Insert default categories (optional - you can also add these through the admin interface)
INSERT INTO skill_categories (name, description) VALUES
  ('Frontend', 'Client-side technologies and frameworks'),
  ('Backend', 'Server-side technologies and frameworks'),
  ('Database', 'Database technologies and query languages'),
  ('DevOps', 'Development operations and deployment tools'),
  ('Languages', 'Programming languages'),
  ('Mobile', 'Mobile development technologies'),
  ('Design', 'UI/UX design and graphic design tools'),
  ('IoT', 'Internet of Things and embedded systems')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public read access for skill categories" ON skill_categories
FOR SELECT USING (true);

-- Create policy to allow authenticated users to manage categories
CREATE POLICY "Authenticated users can manage skill categories" ON skill_categories
FOR ALL USING (auth.role() = 'authenticated');

-- Optional: Update existing skills table to reference categories
-- This assumes your skills table already has a 'category' column
-- You might want to run this after creating the categories above
-- UPDATE skills SET category = 'Frontend' WHERE category = 'Frontend';
-- UPDATE skills SET category = 'Backend' WHERE category = 'Backend';
-- etc.
