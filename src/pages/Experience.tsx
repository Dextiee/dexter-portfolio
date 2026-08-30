import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import ExperienceCard from '../components/ExperienceCard';

const Experience = () => {
  const { experiences, experiencesLoading: loading, experiencesError: error } = useData();

  // Entry animation variants for the timeline and items
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="eyebrow mb-3">Career</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            My <span className="text-gradient">Experience</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
            My professional journey and the experiences that have shaped me as a developer.
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
            <h3 className="text-2xl font-bold text-white mb-4">
              No Experience Yet
            </h3>
            <p className="text-gray-400">
              Experience entries will appear here once they&apos;re added to the database.
            </p>
          </motion.div>
        ) : (
          <motion.ol
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="relative border-l border-gray-800 ml-3 space-y-10"
          >
            {experiences.map((experience, index) => (
              <motion.li key={experience.id} variants={itemVariants} className="relative pl-8 sm:pl-10">
                {/* Timeline node */}
                <span
                  className={`absolute -left-[7px] top-7 w-3.5 h-3.5 rounded-full border-2 border-gray-950 ${
                    index === 0 ? 'bg-accent-400 shadow-glow-accent-sm' : 'bg-gray-600'
                  }`}
                  aria-hidden="true"
                />
                <ExperienceCard experience={experience} isCurrent={index === 0 && !experience.end_date} />
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </div>
  );
};

export default Experience;
