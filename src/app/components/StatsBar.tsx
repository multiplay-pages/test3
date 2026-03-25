interface StatItem {
  label: string;
  value: number | string;
  color?: string;
}

interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex items-center gap-6 flex-wrap" style={{ fontFamily: 'Inter, sans-serif' }}>
      {stats.map((stat, i) => (
        <div key={i} className="flex items-baseline gap-1.5">
          <span
            className="tabular-nums"
            style={{
              fontWeight: 700,
              fontSize: '1.125rem',
              color: stat.color ?? '#1F2937',
              letterSpacing: '-0.02em',
            }}
          >
            {stat.value}
          </span>
          <span style={{ fontSize: '0.8125rem', color: '#6B7280', fontWeight: 400 }}>
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
