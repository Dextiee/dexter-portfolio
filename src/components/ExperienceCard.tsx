import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getDuration = () => {
    const startDate = new Date(experience.start_date);
    const endDate = experience.end_date ? new Date(experience.end_date) : new Date();
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}${months > 0 ? ` ${months} month${months > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-600 hover:border-blue-500 transition-colors duration-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate">
            {experience.role}
          </h3>
          <p className="text-base sm:text-lg text-blue-400 font-medium truncate">
            {experience.company}
          </p>
        </div>
        <div className="text-left sm:text-right text-xs sm:text-sm text-gray-400 flex-shrink-0">
          <p className="whitespace-nowrap">{formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}</p>
          <p className="text-xs">{getDuration()}</p>
        </div>
      </div>
      <div className="text-gray-300 whitespace-pre-line">{experience.description}</div>
    </div>
  );
};

export default ExperienceCard;
