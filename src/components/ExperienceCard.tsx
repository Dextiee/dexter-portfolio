import { Experience } from '../types';

interface ExperienceCardProps {
  experience: Experience;
  isCurrent?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, isCurrent = false }) => {
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
    <div className="bg-gray-900 rounded-xl border border-gray-800 hover:border-accent-400/50 transition-colors duration-300 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              {experience.role}
            </h3>
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-400/10 text-accent-400 border border-accent-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                Current
              </span>
            )}
          </div>
          <p className="text-base sm:text-lg text-accent-400 font-medium">
            {experience.company}
          </p>
        </div>
        <div className="text-left sm:text-right text-xs sm:text-sm text-gray-400 flex-shrink-0">
          <p className="whitespace-nowrap">{formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}</p>
          <p className="text-xs">{getDuration()}</p>
        </div>
      </div>
      <div className="text-gray-300 whitespace-pre-line leading-relaxed">{experience.description}</div>
    </div>
  );
};

export default ExperienceCard;
