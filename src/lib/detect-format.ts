import type { AlertFormat } from '@/types'

// Heuristics for common alert payload formats.
// Order matters — more specific patterns first.
const PATTERNS: Array<{ format: AlertFormat; test: (s: string) => boolean }> = [
  {
    format: 'pagerduty',
    test: (s) => s.includes('"incident"') || s.includes('"service"') && s.includes('"urgency"'),
  },
  {
    format: 'prometheus',
    test: (s) =>
      s.includes('alertname') || s.includes('FIRING') || s.includes('Alertmanager'),
  },
  {
    format: 'kubernetes',
    test: (s) =>
      s.includes('kubectl') ||
      s.includes('kind:') ||
      s.includes('apiVersion:') ||
      s.includes('CrashLoopBackOff') ||
      s.includes('OOMKilled'),
  },
]

export function detectFormat(input: string): AlertFormat {
  for (const { format, test } of PATTERNS) {
    if (test(input)) return format
  }
  return 'plain'
}
