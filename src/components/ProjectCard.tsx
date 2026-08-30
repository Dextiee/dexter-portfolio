import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
  onViewMore?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isFeatured = false, onViewMore }) => {
  const typeStyle =
    project.project_type === 'company'
      ? 'border-accent-400/30 text-accent-400 bg-accent-400/10'
      : project.project_type === 'client'
      ? 'border-amber-500/40 text-amber-400 bg-amber-500/10'
      : 'border-purple-500/40 text-purple-400 bg-purple-500/10';

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 hover:border-accent-400/50 hover:shadow-glow-accent-sm hover:-translate-y-1 transition-all duration-300 p-6 group cursor-pointer relative h-full flex flex-col">
      {/* Featured Label */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-accent-500 text-gray-950 px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        </div>
      )}

      {/* Project Screenshot */}
      <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
        <img
          src={project.image_url}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>

      {/* Title and Type Tag */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-white flex-1 mr-3 group-hover:text-accent-400 transition-colors duration-200">
          {project.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 border ${typeStyle}`}>
          {project.project_type === 'company' ? 'Company' : project.project_type === 'client' ? 'Client' : 'Personal'}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

      {/* Technology Tags */}
      {project.tools && project.tools.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tools.slice(0, 4).map((tool, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-md font-medium bg-accent-400/10 text-accent-400 border border-accent-400/20"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="px-3 py-1 text-xs rounded-md font-medium border border-gray-700 bg-gray-800 text-gray-300">
                +{project.tools.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto">
        {project.link ? (
          <div className="flex gap-2">
            <button
              onClick={() => onViewMore?.(project)}
              className="flex-1 bg-transparent border border-gray-700 text-gray-200 font-medium py-3 px-4 rounded-lg text-sm hover:border-accent-400 hover:text-accent-400 transition-colors duration-200"
            >
              View more
            </button>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-accent-500 hover:bg-accent-400 text-gray-950 font-semibold py-3 px-4 rounded-lg text-sm transition-colors duration-200 text-center"
            >
              View Project
            </a>
          </div>
        ) : (
          <button
            onClick={() => onViewMore?.(project)}
            className="w-full bg-transparent border border-gray-700 text-gray-200 font-medium py-3 px-4 rounded-lg text-sm hover:border-accent-400 hover:text-accent-400 transition-colors duration-200"
          >
            View more
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
