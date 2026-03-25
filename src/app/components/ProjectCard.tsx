import { ExternalLink } from 'lucide-react';
import { Card } from './ui/card';

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  tags?: string[];
}

export function ProjectCard({ title, description, url, icon, tags }: ProjectCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </a>
    </Card>
  );
}
