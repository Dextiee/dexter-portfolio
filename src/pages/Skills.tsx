import { motion } from 'framer-motion';
import { useData } from '../contexts/DataContext';
import { Skill } from '../types';

const proficiencyRank = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
} as const;

const proficiencyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
} as const;

const proficiencyDescriptions = {
  beginner: 'Learning the fundamentals',
  intermediate: 'Comfortable with most tasks',
  advanced: 'Can solve complex problems',
  expert: 'Can teach and mentor others',
} as const;

type Proficiency = keyof typeof proficiencyRank;

const SegmentBar = ({ level }: { level: Proficiency }) => {
  const filled = proficiencyRank[level];
  return (
    <div className="flex gap-1" aria-label={`Proficiency: ${proficiencyLabels[level]}`}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full ${
            i <= filled ? 'bg-accent-400' : 'bg-gray-700'
          }`}
        />
      ))}
    </div>
  );
};

const Skills = () => {
  const { skills, skillsLoading: loading, skillsError: error } = useData();

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-700 border-t-accent-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full py-16">
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

  const sortedCategories = Object.keys(groupedSkills).sort();

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
          <span className="eyebrow mb-3">Toolbox</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Skills &amp; <span className="text-gradient">Expertise</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl">
            A comprehensive overview of my technical skills and proficiency levels across different technologies and domains.
          </p>
        </motion.div>

        {/* Proficiency Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-gray-900/70 rounded-xl border border-gray-800 p-6 mb-12"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Proficiency Levels</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(Object.keys(proficiencyLabels) as Proficiency[]).map((level) => (
              <div key={level}>
                <div className="mb-2 max-w-[72px]">
                  <SegmentBar level={level} />
                </div>
                <div className="text-white font-medium">{proficiencyLabels[level]}</div>
                <div className="text-gray-400 text-sm">{proficiencyDescriptions[level]}</div>
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
              Skills will be displayed here once they&apos;re added to the database.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {sortedCategories.map((category, categoryIndex) => (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-gray-900/70 rounded-xl border border-gray-800 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-800 border-l-4 border-l-accent-400 flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                  <p className="text-gray-500 text-sm">{groupedSkills[category].length} skill{groupedSkills[category].length !== 1 ? 's' : ''}</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {groupedSkills[category].map((skill: Skill, skillIndex: number) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.04 }}
                        className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/60 hover:border-accent-400/40 transition-colors duration-200"
                      >
                        <h4 className="text-base font-medium text-white truncate mb-1.5">
                          {skill.name}
                        </h4>
                        <SegmentBar level={skill.proficiency as Proficiency} />
                        <span className="block mt-1.5 text-xs text-gray-400">
                          {proficiencyLabels[skill.proficiency as Proficiency]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
