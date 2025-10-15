# Dynamic Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Supabase. Features a clean design, smooth animations, and a complete admin dashboard for content management.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, minimal design with smooth animations using Framer Motion
- **Dynamic Content**: Projects and experiences managed through Supabase database
- **Admin Dashboard**: Complete CRUD operations for content management
- **Authentication**: Secure admin login using Supabase Auth
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Backend**: Supabase (Database, Auth, Storage)
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account and project

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to Settings > API
4. Copy your Project URL and anon/public key

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Set Up Database Tables

Run these SQL commands in your Supabase SQL editor:

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

-- Enable Row Level Security (RLS)
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

### 6. Set Up Authentication

1. Go to Authentication > Settings in your Supabase dashboard
2. Enable Email authentication
3. Create an admin user account or use the signup functionality

### 7. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── ExperienceCard.tsx
│   ├── ProjectForm.tsx
│   ├── ExperienceForm.tsx
│   ├── ProjectList.tsx
│   ├── ExperienceList.tsx
│   └── ProtectedRoute.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── hooks/               # Custom hooks
│   └── useSupabase.ts
├── lib/                  # External library configurations
│   └── supabase.ts
├── pages/                # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── AdminLogin.tsx
│   └── AdminDashboard.tsx
├── types/                # TypeScript type definitions
│   └── index.ts
├── data/                 # Sample data
│   └── seedData.ts
└── App.tsx               # Main app component
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` to customize colors, fonts, and other design tokens
- Update `src/index.css` for global styles and custom utility classes

### Content
- Update personal information in the Home and About pages
- Add your own projects and experiences through the admin dashboard
- Customize the navigation menu in `src/components/Header.tsx`

### Branding
- Replace the logo/avatar in the Home page
- Update the site title and meta information in `index.html`
- Modify the footer content in `src/components/Footer.tsx`

## 🔐 Admin Features

The admin dashboard provides:

- **Project Management**: Add, edit, and delete projects
- **Experience Management**: Manage work and academic experiences
- **Skills Management**: Add, edit, and delete skills with proficiency levels (Beginner, Intermediate, Advanced, Expert)
- **Image Uploads**: Support for project images via URL
- **Real-time Updates**: Changes reflect immediately on the public site
- **Secure Access**: Protected routes requiring authentication

### Accessing Admin Dashboard

1. Navigate to `/admin/login`
2. Sign in with your Supabase account
3. Manage your portfolio content

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This app can be deployed to any platform that supports React:
- Netlify
- AWS Amplify
- Railway
- Render

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Features Overview

### Public Pages
- **Home**: Hero section with introduction and quick stats
- **About**: Personal bio, skills, and contact information
- **Projects**: Dynamic grid of project cards with images and links
- **Experience**: Timeline of work and academic experiences

### Admin Dashboard
- **Authentication**: Secure login with Supabase Auth
- **Project CRUD**: Create, read, update, delete projects
- **Experience CRUD**: Manage work experiences
- **Real-time Updates**: Changes appear immediately

## 🔧 Troubleshooting

### Common Issues

1. **Environment Variables**: Ensure your `.env` file is properly configured
2. **Database Connection**: Verify your Supabase URL and keys are correct
3. **Authentication**: Check that RLS policies are set up correctly
4. **Build Errors**: Run `npm run lint` to check for TypeScript errors

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the [React Documentation](https://react.dev)
- Consult the [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help setting up the project, please open an issue or contact the maintainer.

---

Built with ❤️ using React, TypeScript, and Supabase.
