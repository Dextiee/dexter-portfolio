import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { Skill } from '../types';

const Skills = () => {
  const { skills, skillsLoading: loading, skillsError: error } = useData();

  const proficiencyColors = {
    beginner: 'bg-red-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-blue-500',
    expert: 'bg-green-500',
  };

  const proficiencyLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
  };

  const proficiencyDescriptions = {
    beginner: 'Learning the fundamentals',
    intermediate: 'Comfortable with most tasks',
    advanced: 'Can solve complex problems',
    expert: 'Can teach and mentor others',
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-300">Loading skills...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm flex items-center space-x-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Sort categories by name
  const sortedCategories = Object.keys(groupedSkills).sort();

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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different technologies and domains.
          </p>
        </motion.div>

        {/* Proficiency Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-12"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Proficiency Levels</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(proficiencyLabels).map(([level, label]) => (
              <div key={level} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${proficiencyColors[level as keyof typeof proficiencyColors]}`}></div>
                <div>
                  <div className="text-white font-medium">{label}</div>
                  <div className="text-gray-400 text-sm">
                    {proficiencyDescriptions[level as keyof typeof proficiencyDescriptions]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills by Category */}
        {skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Skills Coming Soon
            </h3>
            <p className="text-gray-400">
              Skills will be displayed here once they're added to the database.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {sortedCategories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
              >
                <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                  <p className="text-gray-400 text-sm">{groupedSkills[category].length} skill{groupedSkills[category].length !== 1 ? 's' : ''}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {groupedSkills[category].map((skill: Skill, skillIndex: number) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        className="bg-gray-750 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-white truncate">
                            {skill.name}
                          </h4>
                          <div className={`w-3 h-3 rounded-full ${proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]} flex-shrink-0`}></div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-300">
                            {proficiencyLabels[skill.proficiency as keyof typeof proficiencyLabels]}
                          </span>
                        </div>
                        
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Skills;
