import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import ExperienceCard from '../components/ExperienceCard';

const Experience = () => {
  const { experiences, experiencesLoading: loading, experiencesError: error } = useData();

  // Entry animation variants for the list and items
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white-900 mb-6">
            My Experience
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My professional journey and the experiences that have shaped me as
            a developer.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        {experiences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Experience Yet
            </h3>
            <p className="text-gray-600">
              Experience entries will appear here once they're added to the database.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {experiences.map((experience) => (
              <motion.div key={experience.id} variants={itemVariants}>
                <ExperienceCard experience={experience} />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Experience;
