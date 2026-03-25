import { ProjectCard } from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

interface CategorySectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  projects: Project[];
  categoryIcon: React.ReactNode;
}

export function CategorySection({ title, description, icon, projects, categoryIcon }: CategorySectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-blue-600">{icon}</div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            url={project.url}
            icon={categoryIcon}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}
