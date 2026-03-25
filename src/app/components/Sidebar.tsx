import { useState } from 'react';
import {
  LayoutDashboard,
  Star,
  Calculator,
  Table2,
  Figma,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  HardDrive,
} from 'lucide-react';

export interface SidebarSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  accentColor: string;
  count: number;
}

interface SidebarProps {
  sections: SidebarSection[];
  activeSection: string;
  onSectionChange: (id: string) => void;
}

const EXTERNAL_LINKS = [
  { label: 'GitHub', icon: <Github className="w-3.5 h-3.5" />, url: '#' },
  { label: 'Google Drive', icon: <HardDrive className="w-3.5 h-3.5" />, url: '#' },
  { label: 'Figma Workspace', icon: <Figma className="w-3.5 h-3.5" />, url: '#' },
];

function SectionLabel({ text, hidden }: { text: string; hidden: boolean }) {
  if (hidden) return null;
  return (
    <div
      className="px-3 mb-1 mt-1 text-gray-400 uppercase tracking-wider select-none"
      style={{ fontSize: '0.62rem', fontWeight: 600 }}
    >
      {text}
    </div>
  );
}

export function Sidebar({ sections, activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const itemBase =
    'relative flex items-center gap-2.5 py-2 px-3 mx-2 rounded-lg text-sm cursor-pointer transition-all duration-150 border border-transparent';

  const activeStyle: React.CSSProperties = {
    background: '#E8F5EC',
    color: '#166534',
    borderColor: '#BBF7D0',
  };

  const inactiveStyle: React.CSSProperties = {
    background: 'transparent',
    color: '#4B5563',
  };

  return (
    <aside
      className="relative flex flex-col bg-white border-r border-gray-200 shrink-0 transition-all duration-300 select-none"
      style={{ width: collapsed ? 64 : 240, fontFamily: 'Inter, sans-serif' }}
    >
      {/* Brand */}
      <div className="flex items-center h-14 border-b border-gray-200 px-4 shrink-0 gap-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #34A853 0%, #2E9449 100%)' }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 11V3L7 8L12 3V11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827', lineHeight: 1.2 }}>
              Project Hub
            </div>
            <div style={{ fontSize: '0.6rem', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.07em' }}>
              MULTIPLAY
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        <SectionLabel text="Nawigacja" hidden={collapsed} />

        {/* All */}
        <button
          onClick={() => onSectionChange('all')}
          className={`${itemBase} w-[calc(100%-16px)] ${collapsed ? 'justify-center' : ''}`}
          style={activeSection === 'all' ? activeStyle : inactiveStyle}
          title={collapsed ? 'Wszystkie' : undefined}
          onMouseEnter={(e) => {
            if (activeSection !== 'all') {
              (e.currentTarget as HTMLElement).style.background = '#F9FAFB';
              (e.currentTarget as HTMLElement).style.color = '#111827';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'all') {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#4B5563';
            }
          }}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="flex-1 text-left">Wszystkie narzędzia</span>}
          {!collapsed && (
            <span
              className="px-1.5 py-0.5 rounded-full tabular-nums"
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                background: activeSection === 'all' ? '#BBF7D0' : '#F3F4F6',
                color: activeSection === 'all' ? '#166534' : '#9CA3AF',
              }}
            >
              {sections.reduce((s, c) => s + c.count, 0)}
            </span>
          )}
        </button>

        {/* Featured */}
        <button
          onClick={() => onSectionChange('featured')}
          className={`${itemBase} w-[calc(100%-16px)] mt-0.5 ${collapsed ? 'justify-center' : ''}`}
          style={activeSection === 'featured' ? activeStyle : inactiveStyle}
          title={collapsed ? 'Najważniejsze' : undefined}
          onMouseEnter={(e) => {
            if (activeSection !== 'featured') {
              (e.currentTarget as HTMLElement).style.background = '#F9FAFB';
              (e.currentTarget as HTMLElement).style.color = '#111827';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'featured') {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#4B5563';
            }
          }}
        >
          <Star className="w-4 h-4 shrink-0" style={{ color: activeSection === 'featured' ? '#166534' : '#F59E0B' }} />
          {!collapsed && <span className="flex-1 text-left">Najważniejsze</span>}
        </button>

        {/* Sections */}
        <div className="mt-3">
          <SectionLabel text="Sekcje" hidden={collapsed} />
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSectionChange(sec.id)}
                className={`${itemBase} w-[calc(100%-16px)] mt-0.5 ${collapsed ? 'justify-center' : ''}`}
                style={isActive ? activeStyle : inactiveStyle}
                title={collapsed ? sec.label : undefined}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = '#F9FAFB';
                    (e.currentTarget as HTMLElement).style.color = '#111827';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#4B5563';
                  }
                }}
              >
                <span className="shrink-0" style={{ color: isActive ? '#166534' : sec.accentColor }}>
                  {sec.icon}
                </span>
                {!collapsed && <span className="flex-1 text-left truncate">{sec.label}</span>}
                {!collapsed && (
                  <span
                    className="px-1.5 py-0.5 rounded-full tabular-nums"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      background: isActive ? '#BBF7D0' : '#F3F4F6',
                      color: isActive ? '#166534' : '#9CA3AF',
                    }}
                  >
                    {sec.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* External links */}
        <div className="mt-4">
          <SectionLabel text="Zasoby" hidden={collapsed} />
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              title={collapsed ? link.label : undefined}
              className={`${itemBase} w-[calc(100%-16px)] mt-0.5 group no-underline ${collapsed ? 'justify-center' : ''}`}
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#F9FAFB';
                (e.currentTarget as HTMLElement).style.color = '#111827';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = '#6B7280';
              }}
            >
              <span className="shrink-0 text-gray-400">{link.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-left truncate">{link.label}</span>
                  <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-400 shrink-0" />
                </>
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 py-3 border-t border-gray-200 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-1.5 px-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors gap-1.5"
          style={{ fontSize: '0.75rem' }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Zwiń</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
