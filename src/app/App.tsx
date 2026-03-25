import { useState, useMemo } from 'react';
import {
  Calculator,
  Table2,
  FileText,
  Figma,
  BookOpen,
  Search,
  Star,
  ExternalLink,
  Github,
  HardDrive,
  Link2,
  X,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronDown,
  ChevronUp,
  Zap,
} from 'lucide-react';
import { Sidebar, type SidebarSection } from './components/Sidebar';
import { ToolCard, type Tool, type ToolStatus } from './components/ToolCard';

// ─── Section metadata ──────────────────────────────────────────────────────

const SECTIONS = {
  calculators: {
    id: 'calculators',
    label: 'Kalkulatory ofert',
    shortLabel: 'Kalkulatory',
    icon: <Calculator className="w-4 h-4" />,
    description: 'Wycena, marże, ROI i kalkulacje czasu pracy',
    accentColor: '#2563EB',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
  },
  tables: {
    id: 'tables',
    label: 'Interaktywne tabele i procedury',
    shortLabel: 'Tabele i procedury',
    icon: <Table2 className="w-4 h-4" />,
    description: 'Procesy, onboarding, workflow i checklisty operacyjne',
    accentColor: '#7C3AED',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
  },
  figma: {
    id: 'figma',
    label: 'Schematy / Diagramy / Figma',
    shortLabel: 'Schematy Figma',
    icon: <Figma className="w-4 h-4" />,
    description: 'Architektury, user flows, design system i diagramy',
    accentColor: '#EA4335',
    iconBg: '#FEF2F2',
    iconColor: '#EA4335',
  },
  docs: {
    id: 'docs',
    label: 'Linki pomocnicze i dokumentacja',
    shortLabel: 'Dokumentacja',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Zasoby zewnętrzne, dokumenty i repozytoria projektu',
    accentColor: '#0891B2',
    iconBg: '#ECFEFF',
    iconColor: '#0891B2',
  },
} as const;

type SectionKey = keyof typeof SECTIONS;

// ─── Status ────────────────────────────────────────────────────────────────

const ALL_STATUSES: { id: ToolStatus | 'all'; label: string }[] = [
  { id: 'all',      label: 'Wszystkie' },
  { id: 'new',      label: 'Nowe' },
  { id: 'wip',      label: 'W trakcie' },
  { id: 'done',     label: 'Gotowe' },
  { id: 'test',     label: 'Test' },
  { id: 'archived', label: 'Archiwum' },
];

// ─── Tools data ────────────────────────────────────────────────────────────

function tool(
  id: string,
  section: SectionKey,
  title: string,
  description: string,
  status: ToolStatus,
  tags: string[],
  updatedAt: string,
  featured: boolean,
  links: Tool['links'],
): Tool {
  const sec = SECTIONS[section];
  return {
    id, title, description, section, sectionLabel: sec.label,
    featured, status, tags, updatedAt,
    accentColor: sec.accentColor,
    iconBg: sec.iconBg,
    iconColor: sec.iconColor,
    icon: sec.icon,
    links,
  };
}

const TOOLS: Tool[] = [
  // ── Kalkulatory ────────────────────────────────────────────────────────
  tool('c1', 'calculators',
    'Kalkulator Ofert Podstawowy',
    'Szybkie wyliczanie cen ofert z marżą, rabatem i podatkiem VAT. Obsługuje wiele pozycji i eksport do PDF.',
    'done', ['Wycena', 'Marża', 'VAT', 'PDF'], '20 mar 2026', true,
    { open: '#', docs: '#', github: '#' }),

  tool('c2', 'calculators',
    'Kalkulator ROI Kampanii',
    'Zaawansowana analiza zwrotu z inwestycji – scenariusze optymistyczne, pesymistyczne i bazowe.',
    'done', ['ROI', 'Finanse', 'Kampanie'], '12 mar 2026', false,
    { open: '#', docs: '#' }),

  tool('c3', 'calculators',
    'Kalkulator Czasu Pracy',
    'Estymacja czasu realizacji projektu na podstawie złożoności i dostępności zespołu.',
    'wip', ['Czas', 'Projekty', 'Estymacja'], '5 mar 2026', false,
    { open: '#', github: '#' }),

  tool('c4', 'calculators',
    'Kalkulator Marży Produktowej',
    'Analiza marż per produkt / SKU z porównaniem do progów rentowności i cen konkurencji.',
    'new', ['Marża', 'Produkty', 'Analiza'], '22 mar 2026', false,
    { open: '#' }),

  // ── Tabele i procedury ─────────────────────────────────────────────────
  tool('t1', 'tables',
    'Proces Onboardingu Klienta',
    'Kompletna interaktywna tabela wdrożenia nowego klienta z checklist, właścicielami etapów i statusami.',
    'done', ['Onboarding', 'Klient', 'Workflow'], '18 mar 2026', true,
    { open: '#', docs: '#', figma: '#' }),

  tool('t2', 'tables',
    'Workflow Sprzedażowy',
    'Mapa procesu sprzedaży od pierwszego kontaktu do zamknięcia z warunkami przejść między etapami.',
    'done', ['Sprzedaż', 'CRM', 'Pipeline'], '14 mar 2026', true,
    { open: '#', docs: '#', figma: '#', github: '#' }),

  tool('t3', 'tables',
    'Matryca Decyzyjna Produktów',
    'Narzędzie do porównywania i priorytetetyzacji produktów według kryteriów biznesowych i technicznych.',
    'test', ['Produkt', 'Decyzje', 'Priorytetetyzacja'], '10 mar 2026', false,
    { open: '#', docs: '#' }),

  tool('t4', 'tables',
    'Procedura Obsługi Reklamacji',
    'Opis pełnego procesu obsługi reklamacji z drzewem decyzyjnym, SLA i kontaktami eskalacji.',
    'done', ['Reklamacje', 'SLA', 'Support'], '2 mar 2026', false,
    { open: '#', docs: '#' }),

  tool('t5', 'tables',
    'Procedura Bezpieczeństwa Danych',
    'Dokumentacja zasad RODO, polityki IT, klasyfikacji danych i zasad dostępu do systemów.',
    'done', ['RODO', 'Bezpieczeństwo', 'Compliance'], '25 lut 2026', true,
    { open: '#', docs: '#', github: '#' }),

  tool('t6', 'tables',
    'Procedura Eskalacji Incydentów',
    'Ścieżki eskalacji krytycznych incydentów produkcyjnych z matrycą kontaktów i priorytetami.',
    'wip', ['Eskalacja', 'Incydenty', 'IT'], '8 mar 2026', false,
    { open: '#' }),

  tool('t7', 'tables',
    'Procedura Urlopowa',
    'Instrukcja składania i akceptacji wniosków urlopowych z limitami, wyjątkami i ewidencją.',
    'done', ['HR', 'Urlopy', 'Wnioski'], '15 lut 2026', false,
    { open: '#', docs: '#' }),

  // ── Figma / Schematy ───────────────────────────────────────────────────
  tool('f1', 'figma',
    'Architektura Systemu',
    'Schemat architektury aplikacji: baza danych, API, warstwy serwisów, zewnętrzne integracje i CDN.',
    'done', ['Architektura', 'System', 'Backend'], '24 mar 2026', true,
    { open: '#', figma: '#', github: '#' }),

  tool('f2', 'figma',
    'User Flow – Rejestracja i Logowanie',
    'Interaktywny schemat przepływu użytkownika przez rejestrację, weryfikację i pierwsze logowanie.',
    'done', ['UX', 'User Flow', 'Auth'], '19 mar 2026', false,
    { open: '#', figma: '#' }),

  tool('f3', 'figma',
    'Schemat Bazy Danych (ERD)',
    'Diagram encji i relacji z kluczami obcymi, ograniczeniami i opisami tabel.',
    'archived', ['Database', 'ERD', 'Schema'], '11 mar 2026', false,
    { open: '#', figma: '#', github: '#' }),

  tool('f4', 'figma',
    'Design System Multiplay',
    'Kompletny design system z tokenami kolorów, typografią, komponentami i zasadami brandingu.',
    'new', ['Design System', 'Branding', 'UI'], '23 mar 2026', false,
    { open: '#', figma: '#' }),

  tool('f5', 'figma',
    'Mapa Procesów Biznesowych',
    'Wizualizacja głównych procesów B2B: sprzedaż, obsługa, onboarding i eskalacja.',
    'wip', ['Procesy', 'B2B', 'Biznes'], '17 mar 2026', false,
    { open: '#', figma: '#', docs: '#' }),

  // ── Dokumentacja ───────────────────────────────────────────────────────
  tool('d1', 'docs',
    'GitHub – Repozytorium Projektów',
    'Główne repozytorium kodu źródłowego z dokumentacją techniczną, PR guidelines i historią.',
    'done', ['GitHub', 'Kod', 'Repozytoria'], '24 mar 2026', false,
    { open: '#', github: '#' }),

  tool('d2', 'docs',
    'Google Drive – Dokumenty Projektowe',
    'Centralne miejsce przechowywania ofert, umów, briefów i materiałów projektowych.',
    'done', ['Drive', 'Dokumenty', 'Oferty'], '22 mar 2026', false,
    { open: '#' }),

  tool('d3', 'docs',
    'Figma Workspace – Zasoby Wizualne',
    'Wszystkie projekty Figma: UI, procesy, prezentacje, schematy i komponenty.',
    'done', ['Figma', 'Design', 'UI'], '21 mar 2026', false,
    { open: '#', figma: '#' }),

  tool('d4', 'docs',
    'Notion – Wiki Wewnętrzne',
    'Baza wiedzy zespołu: procedury, onboarding, FAQ, decyzje architektoniczne i retrospektywy.',
    'done', ['Wiki', 'Wiedza', 'Notion'], '20 mar 2026', false,
    { open: '#', docs: '#' }),

  tool('d5', 'docs',
    'Jira – Tablica Zadań',
    'Backlog produktowy, sprint board i raportowanie postępów dla aktywnych projektów.',
    'done', ['Jira', 'Zadania', 'Scrum'], '24 mar 2026', false,
    { open: '#' }),

  tool('d6', 'docs',
    'Specyfikacja API (Swagger)',
    'Dokumentacja endpointów REST API z przykładami requestów, schematami i kodami błędów.',
    'wip', ['API', 'Swagger', 'REST'], '16 mar 2026', false,
    { open: '#', github: '#', docs: '#' }),
];

const FEATURED = TOOLS.filter((t) => t.featured);

// ─── Section header component ──────────────────────────────────────────────

function SectionHeader({
  sectionKey,
  count,
  collapsed,
  onToggle,
}: {
  sectionKey: SectionKey;
  count: number;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const sec = SECTIONS[sectionKey];
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 py-2 mb-4 group hover:opacity-80 transition-opacity text-left"
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: sec.iconBg }}
      >
        <span style={{ color: sec.iconColor }}>{sec.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-gray-900"
            style={{ fontWeight: 700, fontSize: '0.9375rem' }}
          >
            {sec.label}
          </span>
          <span
            className="px-1.5 py-0.5 rounded-full tabular-nums"
            style={{ background: '#F3F4F6', color: '#6B7280', fontSize: '0.68rem', fontWeight: 600 }}
          >
            {count}
          </span>
        </div>
        <p className="text-gray-400 truncate" style={{ fontSize: '0.78rem' }}>
          {sec.description}
        </p>
      </div>
      <div className="text-gray-400 group-hover:text-gray-600 shrink-0">
        {collapsed
          ? <ChevronDown className="w-4 h-4" />
          : <ChevronUp className="w-4 h-4" />
        }
      </div>
    </button>
  );
}

// ─── Quick links for docs section ─────────────────────────────────────────

function DocLinkCard({ tool }: { tool: Tool }) {
  const ICONS: Record<string, React.ReactNode> = {
    GitHub: <Github className="w-4 h-4" />,
    'Google Drive': <HardDrive className="w-4 h-4" />,
    'Figma Workspace': <Figma className="w-4 h-4" />,
    Notion: <BookOpen className="w-4 h-4" />,
    Jira: <Zap className="w-4 h-4" />,
    default: <Link2 className="w-4 h-4" />,
  };
  const iconKey = Object.keys(ICONS).find((k) => tool.title.includes(k)) ?? 'default';
  const icon = ICONS[iconKey];

  return (
    <a
      href={tool.links.open ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all group"
      style={{ fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textDecoration: 'none' }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: tool.iconBg }}
      >
        <span style={{ color: tool.iconColor }}>{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-gray-900 truncate" style={{ fontWeight: 600, fontSize: '0.8125rem' }}>
          {tool.title}
        </div>
        <div className="text-gray-400 truncate" style={{ fontSize: '0.75rem' }}>
          {tool.description.slice(0, 60)}…
        </div>
      </div>
      <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#34A853] shrink-0 transition-colors" />
    </a>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ToolStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const sidebarSections: SidebarSection[] = (Object.values(SECTIONS) as typeof SECTIONS[SectionKey][]).map((sec) => ({
    id: sec.id,
    label: sec.shortLabel,
    icon: sec.icon,
    accentColor: sec.accentColor,
    count: TOOLS.filter((t) => t.section === sec.id).length,
  }));

  const toggleCollapse = (id: string) =>
    setCollapsed((p) => ({ ...p, [id]: !p[id] }));

  // Filter logic
  const q = searchQuery.trim().toLowerCase();
  const isFiltering = !!q || statusFilter !== 'all';

  const filteredTools = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchesSection =
        activeSection === 'all' ? true :
        activeSection === 'featured' ? !!t.featured :
        t.section === activeSection;
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q));
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      return matchesSection && matchesSearch && matchesStatus;
    });
  }, [activeSection, q, statusFilter]);

  const toolsBySection = useMemo(() => {
    const groups: Record<string, Tool[]> = {};
    filteredTools.forEach((t) => {
      if (!groups[t.section]) groups[t.section] = [];
      groups[t.section].push(t);
    });
    return groups;
  }, [filteredTools]);

  const gridClass = viewMode === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'
    : 'flex flex-col gap-2';

  const showSections = activeSection === 'all' && !isFiltering;
  const showFeatured = activeSection === 'featured';
  const showSingleSection = !showSections && !showFeatured && activeSection !== 'all';

  const hasActiveFilters = searchQuery || statusFilter !== 'all';
  const clearFilters = () => { setSearchQuery(''); setStatusFilter('all'); };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: '#F7F9FA', fontFamily: 'Inter, sans-serif' }}
    >
      <Sidebar
        sections={sidebarSections}
        activeSection={activeSection}
        onSectionChange={(id) => { setActiveSection(id); clearFilters(); }}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-5 h-14 flex items-center gap-3 shrink-0">
          {/* Title */}
          <span className="text-gray-900 shrink-0" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
            {activeSection === 'all' ? 'Wszystkie narzędzia'
              : activeSection === 'featured' ? 'Najważniejsze narzędzia'
              : SECTIONS[activeSection as SectionKey]?.label ?? activeSection}
          </span>

          <div className="w-px h-4 bg-gray-200 shrink-0" />

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Szukaj narzędzi, tagów, opisów…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#34A853] focus:bg-white focus:ring-2 focus:ring-[#34A853]/10 transition-all text-gray-900 placeholder-gray-400"
              style={{ fontSize: '0.8125rem' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div
            className="flex items-center rounded-lg p-0.5 shrink-0"
            style={{ background: '#F3F4F6' }}
          >
            {ALL_STATUSES.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => setStatusFilter(s.id as ToolStatus | 'all')}
                className="px-2.5 py-1 rounded-md transition-all"
                style={{
                  fontSize: '0.72rem',
                  fontWeight: statusFilter === s.id ? 600 : 400,
                  background: statusFilter === s.id ? '#fff' : 'transparent',
                  color: statusFilter === s.id ? '#1F2937' : '#6B7280',
                  boxShadow: statusFilter === s.id ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center rounded-lg p-0.5 shrink-0" style={{ background: '#F3F4F6' }}>
            {(['grid', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="p-1.5 rounded-md transition-all"
                style={{
                  background: viewMode === mode ? '#fff' : 'transparent',
                  color: viewMode === mode ? '#1F2937' : '#9CA3AF',
                  boxShadow: viewMode === mode ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                }}
                title={mode === 'grid' ? 'Siatka' : 'Lista'}
              >
                {mode === 'grid'
                  ? <LayoutGrid className="w-3.5 h-3.5" />
                  : <List className="w-3.5 h-3.5" />
                }
              </button>
            ))}
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
              style={{ fontSize: '0.75rem' }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Wyczyść
            </button>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">

          {/* ── FEATURED STRIP ─────────────────────────────────────── */}
          {(activeSection === 'all' || showFeatured) && !isFiltering && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#FEF9C3' }}>
                  <Star className="w-3.5 h-3.5" style={{ color: '#D97706' }} />
                </div>
                <span className="text-gray-900" style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                  Najważniejsze narzędzia
                </span>
                <span className="text-gray-400" style={{ fontSize: '0.8125rem' }}>
                  — szybki dostęp w 1 kliknięciu
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {FEATURED.map((t) => (
                  <ToolCard key={t.id} tool={t} featured />
                ))}
              </div>
              <div className="mt-6 border-t border-gray-200" />
            </section>
          )}

          {/* ── SECTIONED VIEW (all, no filters) ──────────────────── */}
          {showSections && (
            <>
              {(Object.keys(SECTIONS) as SectionKey[]).map((key) => {
                const tools = toolsBySection[key] ?? [];
                if (tools.length === 0) return null;
                const isCollapsed = collapsed[key] ?? false;

                if (key === 'docs') {
                  return (
                    <section key={key} className="mb-8">
                      <SectionHeader
                        sectionKey={key}
                        count={tools.length}
                        collapsed={isCollapsed}
                        onToggle={() => toggleCollapse(key)}
                      />
                      {!isCollapsed && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                          {tools.map((t) => (
                            <DocLinkCard key={t.id} tool={t} />
                          ))}
                        </div>
                      )}
                      <div className="mt-6 border-t border-gray-200" />
                    </section>
                  );
                }

                return (
                  <section key={key} className="mb-8">
                    <SectionHeader
                      sectionKey={key}
                      count={tools.length}
                      collapsed={isCollapsed}
                      onToggle={() => toggleCollapse(key)}
                    />
                    {!isCollapsed && (
                      <div className={gridClass}>
                        {tools.map((t) => (
                          <ToolCard key={t.id} tool={t} />
                        ))}
                      </div>
                    )}
                    <div className="mt-6 border-t border-gray-200" />
                  </section>
                );
              })}
            </>
          )}

          {/* ── FEATURED ONLY VIEW ────────────────────────────────── */}
          {showFeatured && !isFiltering && (
            <div className={gridClass}>
              {FEATURED.map((t) => (
                <ToolCard key={t.id} tool={t} featured />
              ))}
            </div>
          )}

          {/* ── SINGLE SECTION VIEW ───────────────────────────────── */}
          {showSingleSection && !isFiltering && (
            <>
              {activeSection !== 'docs' && (
                <div className={gridClass}>
                  {(toolsBySection[activeSection] ?? []).map((t) => (
                    <ToolCard key={t.id} tool={t} />
                  ))}
                </div>
              )}
              {activeSection === 'docs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                  {(toolsBySection[activeSection] ?? []).map((t) => (
                    <DocLinkCard key={t.id} tool={t} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── SEARCH / FILTER RESULTS ───────────────────────────── */}
          {isFiltering && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500" style={{ fontSize: '0.8125rem' }}>
                  {filteredTools.length === 0
                    ? 'Brak wyników'
                    : `${filteredTools.length} ${filteredTools.length === 1 ? 'wynik' : 'wyników'}`}
                  {searchQuery && (
                    <> dla <strong className="text-gray-900">"{searchQuery}"</strong></>
                  )}
                </span>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: '0.75rem' }}
                >
                  <X className="w-3 h-3" />
                  Wyczyść
                </button>
              </div>

              {filteredTools.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-700" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                    Nic nie znaleziono
                  </p>
                  <p className="text-gray-400 mt-1" style={{ fontSize: '0.8125rem' }}>
                    Zmień zapytanie lub wyczyść filtry statusu.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 rounded-lg text-white transition-colors"
                    style={{ background: '#34A853', fontSize: '0.8125rem', fontWeight: 500 }}
                  >
                    Wyczyść filtry
                  </button>
                </div>
              ) : (
                <div className={gridClass}>
                  {filteredTools.map((t) => (
                    <ToolCard key={t.id} tool={t} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="shrink-0 bg-white border-t border-gray-200 px-5 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ background: '#34A853' }}
            >
              <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
                <path d="M2 11V3L7 8L12 3V11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-gray-400" style={{ fontSize: '0.72rem' }}>
              Multiplay · Project Hub · {TOOLS.length} narzędzi · Wewnętrzny portal narzędziowy
            </span>
          </div>
          <div className="flex items-center gap-3">
            {([
              { href: '#', icon: <Github className="w-3.5 h-3.5" />, label: 'GitHub' },
              { href: '#', icon: <HardDrive className="w-3.5 h-3.5" />, label: 'Drive' },
              { href: '#', icon: <Figma className="w-3.5 h-3.5" />, label: 'Figma' },
            ] as const).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-gray-700 transition-colors"
                style={{ fontSize: '0.72rem' }}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}