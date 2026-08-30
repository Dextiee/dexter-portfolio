import { motion } from 'framer-motion';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { Project } from '../types';

const Projects = () => {
  const { projects, projectsLoading: loading, projectsError: error } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Entry animation variants for the grid and items
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const handleViewMore = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-700 border-t-accent-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center py-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow mb-3">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            My <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
            A collection of projects I&apos;ve worked on, showcasing my skills in
            full-stack development, UI/UX design, and problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No Projects Yet
            </h3>
            <p className="text-gray-400">
              Projects will appear here once they&apos;re added to the database.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="h-full">
                <ProjectCard project={project} onViewMore={handleViewMore} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Projects;
