import { useMemo, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const { projects, projectsLoading: loading, projectsError: error, deleteProject, updateProjectsOrder } = useData();
  const [editingProject, setEditingProject] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aOrder = a.display_order ?? 0;
      const bOrder = b.display_order ?? 0;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return (b.created_at || '').localeCompare(a.created_at || '');
    });
  }, [projects]);
  const move = async (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sortedProjects.length) return;
    const reordered = [...sortedProjects];
    const tmp = reordered[index];
    reordered[index] = reordered[newIndex];
    reordered[newIndex] = tmp;
    try {
      setSavingOrder(true);
      await updateProjectsOrder(reordered);
    } finally {
      setSavingOrder(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setDeletingId(id);
      try {
        await deleteProject(id);
      } catch (error) {
        console.error('Error deleting project:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📁</div>
        <h3 className="text-lg font-semibold text-white mb-2">No Projects</h3>
        <p className="text-gray-400">Add your first project to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6"
          >
            <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
              >
                View Project →
              </a>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0 || savingOrder}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg text-sm disabled:opacity-50 transition-colors duration-200"
                >
                  ↑ Move Up
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === sortedProjects.length - 1 || savingOrder}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg text-sm disabled:opacity-50 transition-colors duration-200"
                >
                  ↓ Move Down
                </button>
              </div>
              {savingOrder && (
                <span className="text-gray-400 text-sm">Saving order...</span>
              )}
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setEditingProject(project)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg text-sm transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                disabled={deletingId === project.id}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg text-sm disabled:opacity-50 transition-colors duration-200"
              >
                {deletingId === project.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}
    </>
  );
};

export default ProjectList;
