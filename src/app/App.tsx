import { Calculator, Table, FileText, Figma, FolderKanban } from 'lucide-react';
import { CategorySection } from './components/CategorySection';

export default function App() {
  const calculators = [
    {
      id: '1',
      title: 'Kalkulator Ofert Podstawowy',
      description: 'Prosty kalkulator do szybkiego wyliczania cen ofert z marżą i rabatem.',
      url: '#',
      tags: ['Excel', 'Wycena', 'Marża'],
    },
    {
      id: '2',
      title: 'Kalkulator ROI',
      description: 'Zaawansowany kalkulator zwrotu z inwestycji z analizą finansową.',
      url: '#',
      tags: ['ROI', 'Finanse', 'Analiza'],
    },
    {
      id: '3',
      title: 'Kalkulator Czasu Pracy',
      description: 'Narzędzie do szacowania czasu realizacji projektów i kosztów roboczogodzin.',
      url: '#',
      tags: ['Czas', 'Projekty', 'Budżet'],
    },
  ];

  const tables = [
    {
      id: '4',
      title: 'Proces Onboardingu Klienta',
      description: 'Interaktywna tabela z krokami wdrożenia nowego klienta.',
      url: '#',
      tags: ['Onboarding', 'Klient', 'Process'],
    },
    {
      id: '5',
      title: 'Workflow Sprzedażowy',
      description: 'Mapa procesu sprzedaży od leada do zamknięcia transakcji.',
      url: '#',
      tags: ['Sprzedaż', 'CRM', 'Workflow'],
    },
    {
      id: '6',
      title: 'Proces Reklamacji',
      description: 'Szczegółowy opis obsługi reklamacji i zwrotów.',
      url: '#',
      tags: ['Reklamacje', 'Support', 'Quality'],
    },
  ];

  const procedures = [
    {
      id: '7',
      title: 'Procedura Bezpieczeństwa Danych',
      description: 'Szczegółowa dokumentacja zasad ochrony danych osobowych i RODO.',
      url: '#',
      tags: ['RODO', 'Bezpieczeństwo', 'Dane'],
    },
    {
      id: '8',
      title: 'Procedura Urlopowa',
      description: 'Instrukcja składania wniosków urlopowych i procesu zatwierdzania.',
      url: '#',
      tags: ['HR', 'Urlopy', 'Proces'],
    },
    {
      id: '9',
      title: 'Procedura Eskalacji',
      description: 'Wytyczne dotyczące eskalacji problemów i kontaktów z kierownictwem.',
      url: '#',
      tags: ['Eskalacja', 'Management', 'Komunikacja'],
    },
  ];

  const figmaSchemas = [
    {
      id: '10',
      title: 'Architektura Systemu',
      description: 'Schemat architektury aplikacji z bazą danych i API.',
      url: '#',
      tags: ['Architektura', 'System', 'Backend'],
    },
    {
      id: '11',
      title: 'User Flow - Rejestracja',
      description: 'Schemat ścieżki użytkownika przez proces rejestracji.',
      url: '#',
      tags: ['UX', 'User Flow', 'Rejestracja'],
    },
    {
      id: '12',
      title: 'Schemat Bazy Danych',
      description: 'Diagram ERD z relacjami między tabelami.',
      url: '#',
      tags: ['Database', 'ERD', 'Schema'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Moje Projekty</h1>
              <p className="text-gray-600 mt-1">
                Centralne repozytorium narzędzi, kalkulatorów i dokumentacji
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calculators Section */}
        <CategorySection
          title="Kalkulatory Ofert"
          description="Narzędzia do wyceny, kalkulacji i analizy finansowej"
          icon={<Calculator className="w-6 h-6" />}
          categoryIcon={<Calculator className="w-6 h-6" />}
          projects={calculators}
        />

        {/* Interactive Tables Section */}
        <CategorySection
          title="Interaktywne Tabele"
          description="Procesy biznesowe i workflow przedstawione w formie tabel"
          icon={<Table className="w-6 h-6" />}
          categoryIcon={<Table className="w-6 h-6" />}
          projects={tables}
        />

        {/* Procedures Section */}
        <CategorySection
          title="Procedury i Instrukcje"
          description="Dokumentacja wewnętrznych procedur i wytycznych"
          icon={<FileText className="w-6 h-6" />}
          categoryIcon={<FileText className="w-6 h-6" />}
          projects={procedures}
        />

        {/* Figma Schemas Section */}
        <CategorySection
          title="Schematy Figma"
          description="Diagramy, schematy architektoniczne i user flows"
          icon={<Figma className="w-6 h-6" />}
          categoryIcon={<Figma className="w-6 h-6" />}
          projects={figmaSchemas}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2026 Moje Projekty. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
}