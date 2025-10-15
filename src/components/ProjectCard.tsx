import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isFeatured?: boolean;
  onViewMore?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isFeatured = false, onViewMore }) => {
  const typeStyle =
    project.project_type === 'company'
      ? "border-0 text-[rgb(0_212_160/var(--tw-text-opacity,1))] bg-[rgb(0_212_160_/_0.1)]"
      : project.project_type === 'client'
      ? 'border-amber-500 text-amber-400 bg-amber-500/10'
      : 'border-purple-500 text-purple-400 bg-purple-500/10';

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-600 hover:border-blue-500 transition-colors duration-200 p-6 group cursor-pointer relative h-full flex flex-col hover:scale-[1.02] transition-transform duration-200">
      {/* Featured Label */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </span>
        </div>
      )}
      
      {/* Project Screenshot */}
      <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden relative">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Title and Company Tag */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-white flex-1 mr-3">
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
                className="px-3 py-1 text-xs rounded-sm font-medium border-0 bg-[rgb(0_212_160_/_0.1)] text-[rgb(0_212_160/var(--tw-text-opacity,1))] transition-colors"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="px-3 py-1 text-xs rounded-full font-medium border border-gray-700 bg-gray-800 text-gray-300">
                +{project.tools.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* View More Button */}
      <div className="mt-auto">
        <button 
          onClick={() => onViewMore?.(project)}
          className="w-full bg-transparent border border-blue-500 text-blue-400 font-medium py-3 px-4 rounded-lg text-sm hover:bg-blue-500/10 hover:text-blue-300 transition-all duration-200"
        >
          View more
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
