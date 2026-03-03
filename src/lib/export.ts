import type { Runbook } from '@/types'

const SEVERITY_LABEL: Record<string, string> = {
  critical: '🔴 CRITICAL',
  high: '🟠 HIGH',
  medium: '🟡 MEDIUM',
  low: '🟢 LOW',
  unknown: '⚪ UNKNOWN',
}

function toMarkdown(runbook: Runbook): string {
  const { content: r } = runbook
  const date = new Date(runbook.createdAt).toISOString()

  const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n')
  const numbered = (items: string[]) => items.map((i, n) => `${n + 1}. ${i}`).join('\n')

  return `# ${runbook.title}

**Generated:** ${date}
**Severity:** ${SEVERITY_LABEL[r.severity] ?? r.severity}
**Affected System:** ${r.affectedSystem}

## Summary
${r.summary}

## Prerequisites
${list(r.prerequisites)}

## Diagnosis Steps
${numbered(r.diagnosisSteps)}

## Resolution Steps
${numbered(r.resolutionSteps)}

## Verification
${numbered(r.verificationSteps)}

## Rollback Plan
${numbered(r.rollbackPlan)}

## Notes
${r.notes}
`
}

export function exportMarkdown(runbook: Runbook): void {
  const md = toMarkdown(runbook)
  const blob = new Blob([md], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `runbook-${runbook.id}.md`
  a.click()
  URL.revokeObjectURL(url)
}

export function copyMarkdown(runbook: Runbook): Promise<void> {
  return navigator.clipboard.writeText(toMarkdown(runbook))
}
