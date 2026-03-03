import { clsx } from 'clsx'
import type { Severity } from '@/types'

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
  unknown: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
}

interface Props {
  severity: Severity
}

export function SeverityBadge({ severity }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded border px-2 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider',
        SEVERITY_STYLES[severity],
      )}
    >
      {severity}
    </span>
  )
}
