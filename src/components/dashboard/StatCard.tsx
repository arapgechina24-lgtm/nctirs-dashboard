import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  colorClass = 'bg-cyan-500',
}: StatCardProps) {
  return (
    <div className="rounded-none border border-[#1a1a1a] bg-[#0d0d0d] p-6 hover:border-[#00ff41]/50 transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#00ff41]/70 uppercase tracking-wider font-mono">{title}</p>
          <p className="mt-2 text-3xl font-bold text-[#00ff41] font-mono">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-[#4d4d4d] font-mono group-hover:text-[#00ff41]/50 transition-colors">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                'mt-2 text-sm font-medium font-mono',
                trend.isPositive ? 'text-[#00ff41]' : 'text-[#cc0000]'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className={cn('rounded-none p-3 border border-transparent group-hover:border-[#00ff41]/30 transition-colors', colorClass.replace('bg-', 'text-').replace('500', ''))}>
            {/* Note: In the new system we might pass bg colors, so let's just make the text inherit color or force it */}
            <div className="text-inherit opacity-80 group-hover:opacity-100 transition-opacity">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}
