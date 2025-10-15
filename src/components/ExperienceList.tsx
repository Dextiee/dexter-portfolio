import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';
import ExperienceForm from './ExperienceForm';

const ExperienceList = () => {
  const { experiences, experiencesLoading: loading, experiencesError: error, deleteExperience } = useData();
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setDeletingId(id);
      try {
        await deleteExperience(id);
      } catch (error) {
        console.error('Error deleting experience:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
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

  if (experiences.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">💼</div>
        <h3 className="text-lg font-semibold text-white mb-2">No Experiences</h3>
        <p className="text-gray-400">Add your first experience to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate">
                  {experience.role}
                </h3>
                <p className="text-base sm:text-lg text-blue-400 font-medium mb-2 truncate">
                  {experience.company}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
                </p>
              </div>
              <div className="flex space-x-2 sm:ml-4">
                <button
                  onClick={() => setEditingExperience(experience)}
                  className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-lg text-xs sm:text-sm transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  disabled={deletingId === experience.id}
                  className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg text-xs sm:text-sm disabled:opacity-50 transition-colors duration-200"
                >
                  {deletingId === experience.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
            <div className="text-gray-300 whitespace-pre-line">{experience.description}</div>
          </motion.div>
        ))}
      </div>

      {editingExperience && (
        <ExperienceForm
          experience={editingExperience}
          onClose={() => setEditingExperience(null)}
        />
      )}
    </>
  );
};

export default ExperienceList;
