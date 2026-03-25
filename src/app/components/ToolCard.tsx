import { ExternalLink, FileText, Figma, Github, Star } from 'lucide-react';

export type ToolStatus = 'new' | 'wip' | 'done' | 'test' | 'archived';

export interface ToolLinks {
  open?: string;
  docs?: string;
  figma?: string;
  github?: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  section: string;
  sectionLabel: string;
  featured?: boolean;
  status: ToolStatus;
  tags?: string[];
  updatedAt?: string;
  iconBg: string;
  iconColor: string;
  accentColor: string;
  icon: React.ReactNode;
  links: ToolLinks;
}

const STATUS_MAP: Record<ToolStatus, { label: string; bg: string; text: string }> = {
  new:      { label: 'Nowe',      bg: '#EFF6FF', text: '#1D4ED8' },
  wip:      { label: 'W trakcie', bg: '#FEF9C3', text: '#92400E' },
  done:     { label: 'Gotowe',    bg: '#DCFCE7', text: '#166534' },
  test:     { label: 'Test',      bg: '#F5F3FF', text: '#6D28D9' },
  archived: { label: 'Archiwum',  bg: '#F3F4F6', text: '#6B7280' },
};

interface ActionBtnProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}

function ActionBtn({ href, icon, label, primary }: ActionBtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all"
      style={
        primary
          ? {
              background: '#34A853',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
            }
          : {
              background: '#F3F4F6',
              color: '#374151',
              fontSize: '0.75rem',
              fontWeight: 500,
            }
      }
      onMouseEnter={(e) => {
        if (!primary) {
          (e.currentTarget as HTMLElement).style.background = '#E5E7EB';
        } else {
          (e.currentTarget as HTMLElement).style.background = '#2E9449';
        }
      }}
      onMouseLeave={(e) => {
        if (!primary) {
          (e.currentTarget as HTMLElement).style.background = '#F3F4F6';
        } else {
          (e.currentTarget as HTMLElement).style.background = '#34A853';
        }
      }}
    >
      {icon}
      {label}
    </a>
  );
}

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  const sc = STATUS_MAP[tool.status];

  return (
    <div
      className="relative bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-200 hover:border-gray-300 hover:shadow-lg group"
      style={{
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[3px]"
        style={{ background: tool.accentColor }}
      />

      <div className={`pl-5 pr-4 ${featured ? 'pt-4 pb-4' : 'pt-3.5 pb-3'} flex flex-col flex-1 gap-2.5`}>

        {/* Header */}
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: tool.iconBg }}
          >
            <span style={{ color: tool.iconColor }}>{tool.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="text-gray-900 leading-snug"
                style={{ fontWeight: 600, fontSize: featured ? '0.9375rem' : '0.875rem' }}
              >
                {tool.title}
              </h3>
              {tool.featured && (
                <span
                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full"
                  style={{ background: '#FEF9C3', color: '#92400E', fontSize: '0.65rem', fontWeight: 600 }}
                >
                  <Star className="w-2.5 h-2.5" />
                  Wyróżnione
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="px-1.5 py-0.5 rounded-full"
                style={{ background: sc.bg, color: sc.text, fontSize: '0.68rem', fontWeight: 600 }}
              >
                {sc.label}
              </span>
              {tool.updatedAt && (
                <span className="text-gray-400" style={{ fontSize: '0.7rem' }}>
                  {tool.updatedAt}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-gray-500 leading-relaxed"
          style={{ fontSize: '0.8125rem', lineHeight: 1.55 }}
        >
          {tool.description}
        </p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                style={{ fontSize: '0.68rem', fontWeight: 500 }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-gray-100">
          {tool.links.open && (
            <ActionBtn
              href={tool.links.open}
              icon={<ExternalLink className="w-3 h-3" />}
              label="Otwórz"
              primary
            />
          )}
          {tool.links.docs && (
            <ActionBtn
              href={tool.links.docs}
              icon={<FileText className="w-3 h-3" />}
              label="Dokumentacja"
            />
          )}
          {tool.links.figma && (
            <ActionBtn
              href={tool.links.figma}
              icon={<Figma className="w-3 h-3" />}
              label="Figma"
            />
          )}
          {tool.links.github && (
            <ActionBtn
              href={tool.links.github}
              icon={<Github className="w-3 h-3" />}
              label="GitHub"
            />
          )}
        </div>
      </div>
    </div>
  );
}
