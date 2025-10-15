# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites
- Node.js (v16+)
- A Supabase account

## Step 1: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (2-3 minutes)
3. Go to **Settings > API** in your Supabase dashboard
4. Copy your **Project URL** and **anon/public key**

## Step 2: Configure Environment

The `.env` file has been created for you. Update it with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 3: Set Up Database

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste this SQL code:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT,
  project_type TEXT DEFAULT 'personal' CHECK (project_type IN ('personal', 'company', 'client')),
  tools JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency TEXT NOT NULL CHECK (proficiency IN ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access for experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access for skills" ON skills FOR SELECT USING (true);

-- Create policies for authenticated users (admin access)
CREATE POLICY "Allow authenticated users to manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to manage skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
```

3. Click **Run** to execute the SQL

## Step 4: Set Up Authentication

1. Go to **Authentication > Settings** in Supabase
2. Make sure **Email** is enabled under **Auth Providers**
3. Go to **Authentication > Users** and create a new user (this will be your admin account)

## Step 5: Start Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## Step 6: Add Content

1. Go to `http://localhost:3000/admin/login`
2. Sign in with your admin account
3. Add your projects and experiences
4. Your content will appear on the public pages immediately!

## 🎉 You're Done!

Your portfolio is now live and ready to customize. Check out the full README.md for more details on customization and deployment.

## Need Help?

- Check the main README.md for detailed instructions
- Review the Supabase documentation
- Open an issue if you encounter problems
