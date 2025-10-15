import React, { createContext, useContext, ReactNode } from 'react';
import { useProjects, useExperiences, useSkills, useSkillCategories } from '../hooks/useSupabase';

interface DataContextType {
  projects: any[];
  experiences: any[];
  skills: any[];
  skillCategories: any[];
  projectsLoading: boolean;
  experiencesLoading: boolean;
  skillsLoading: boolean;
  skillCategoriesLoading: boolean;
  projectsError: string | null;
  experiencesError: string | null;
  skillsError: string | null;
  skillCategoriesError: string | null;
  createProject: (project: any) => Promise<any>;
  updateProject: (id: string, project: any) => Promise<any>;
  deleteProject: (id: string) => Promise<void>;
  updateProjectsOrder: (orderedProjects: any[]) => Promise<void>;
  createExperience: (experience: any) => Promise<any>;
  updateExperience: (id: string, experience: any) => Promise<any>;
  deleteExperience: (id: string) => Promise<void>;
  createSkill: (skill: any) => Promise<any>;
  updateSkill: (id: string, skill: any) => Promise<any>;
  deleteSkill: (id: string) => Promise<void>;
  createSkillCategory: (category: any) => Promise<any>;
  updateSkillCategory: (id: string, category: any) => Promise<any>;
  deleteSkillCategory: (id: string) => Promise<void>;
  refetchProjects: () => Promise<void>;
  refetchExperiences: () => Promise<void>;
  refetchSkills: () => Promise<void>;
  refetchSkillCategories: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
    createProject,
    updateProject,
    deleteProject,
    updateProjectsOrder,
    refetch: refetchProjects,
  } = useProjects();

  const {
    experiences,
    loading: experiencesLoading,
    error: experiencesError,
    createExperience,
    updateExperience,
    deleteExperience,
    refetch: refetchExperiences,
  } = useExperiences();

  const {
    skills,
    loading: skillsLoading,
    error: skillsError,
    createSkill,
    updateSkill,
    deleteSkill,
    refetch: refetchSkills,
  } = useSkills();

  const {
    categories: skillCategories,
    loading: skillCategoriesLoading,
    error: skillCategoriesError,
    createCategory: createSkillCategory,
    updateCategory: updateSkillCategory,
    deleteCategory: deleteSkillCategory,
    refetch: refetchSkillCategories,
  } = useSkillCategories();

  const value: DataContextType = {
    projects,
    experiences,
    skills,
    skillCategories,
    projectsLoading,
    experiencesLoading,
    skillsLoading,
    skillCategoriesLoading,
    projectsError,
    experiencesError,
    skillsError,
    skillCategoriesError,
    createProject,
    updateProject,
    deleteProject,
     updateProjectsOrder,
    createExperience,
    updateExperience,
    deleteExperience,
    createSkill,
    updateSkill,
    deleteSkill,
    createSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    refetchProjects,
    refetchExperiences,
    refetchSkills,
    refetchSkillCategories,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
