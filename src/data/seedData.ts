import { Project, Experience } from '../types';

export const sampleProjects: Omit<Project, 'id' | 'created_at'>[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration with Stripe.',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
    link: 'https://github.com/johndoe/ecommerce-platform',
    project_type: 'client',
    tools: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Express.js'],
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React, TypeScript, and Socket.io.',
    image_url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
    link: 'https://github.com/johndoe/task-manager',
    project_type: 'personal',
    tools: ['React', 'TypeScript', 'Socket.io', 'Tailwind CSS', 'MongoDB'],
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities. Features interactive maps and data visualization using Chart.js.',
    image_url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4?w=500&h=300&fit=crop',
    link: 'https://github.com/johndoe/weather-dashboard',
    project_type: 'personal',
    tools: ['JavaScript', 'Chart.js', 'OpenWeather API', 'CSS3', 'HTML5'],
  },
  {
    title: 'Blog CMS',
    description: 'A content management system for blogs with rich text editing, image uploads, and SEO optimization. Built with Next.js, Prisma, and deployed on Vercel.',
    image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop',
    link: 'https://github.com/johndoe/blog-cms',
    project_type: 'company',
    tools: ['Next.js', 'Prisma', 'Vercel', 'TypeScript', 'PostgreSQL'],
  },
];

export const sampleExperiences: Omit<Experience, 'id' | 'created_at'>[] = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'TechCorp Solutions',
    description: 'Led development of multiple web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented CI/CD pipelines.',
    start_date: '2022-01-01',
    end_date: null, // Current position
  },
  {
    role: 'Frontend Developer',
    company: 'Digital Agency Inc.',
    description: 'Developed responsive web applications and mobile-first designs. Collaborated with design teams to implement pixel-perfect UIs using React and TypeScript.',
    start_date: '2020-06-01',
    end_date: '2021-12-31',
  },
  {
    role: 'Junior Web Developer',
    company: 'StartupXYZ',
    description: 'Built and maintained company website and internal tools. Gained experience with modern JavaScript frameworks and version control systems.',
    start_date: '2019-03-01',
    end_date: '2020-05-31',
  },
  {
    role: 'Computer Science Intern',
    company: 'University Research Lab',
    description: 'Assisted in research projects involving machine learning and data analysis. Developed Python scripts for data processing and visualization.',
    start_date: '2018-06-01',
    end_date: '2018-08-31',
  },
];
