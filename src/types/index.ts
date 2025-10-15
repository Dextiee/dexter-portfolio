export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link?: string;
  project_type: 'personal' | 'company' | 'client';
  tools: string[];
  display_order?: number;
  created_at: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  description: string;
  start_date: string;
  end_date?: string;
  created_at: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  image_url: string;
  link?: string;
  project_type: 'personal' | 'company' | 'client';
  tools: string[];
}

export interface ExperienceFormData {
  role: string;
  company: string;
  description: string;
  start_date: string;
  end_date?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  created_at: string;
}

export interface SkillFormData {
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SkillCategory {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface SkillCategoryFormData {
  name: string;
  description?: string;
}