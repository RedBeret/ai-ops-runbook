import { useStore } from '@/state/store'
import { SeverityBadge } from '@/components/ui/badge'
import { exportMarkdown, copyMarkdown } from '@/lib/export'
import { Download, Copy, Trash2 } from 'lucide-react'
import { useState } from 'react'

function StepList({ items, numbered = false }: { items: string[]; numbered?: boolean }) {
  if (!items?.length) return <p className="text-zinc-600 text-sm italic">None</p>
  return (
    <ol className={`space-y-2 ${numbered ? 'list-decimal' : 'list-disc'} list-inside`}>
      {items.map((item, i) => (
        <li key={i} className="text-zinc-300 text-sm leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function RunbookView() {
  const { runbooks, activeRunbookId, removeRunbook } = useStore()
  const [copied, setCopied] = useState(false)

  const runbook = runbooks.find((r) => r.id === activeRunbookId)
  if (!runbook) return null

  const { content: r } = runbook

  async function handleCopy() {
    await copyMarkdown(runbook!)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <SeverityBadge severity={r.severity} />
            <span className="text-xs text-zinc-500 font-mono">{r.affectedSystem}</span>
          </div>
          <p className="text-zinc-100 text-sm font-medium leading-relaxed">{r.summary}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <Copy size={13} />
            {copied ? 'Copied' : 'Copy MD'}
          </button>
          <button
            onClick={() => exportMarkdown(runbook!)}
            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <Download size={13} />
            Export
          </button>
          <button
            onClick={() => removeRunbook(runbook!.id)}
            className="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs text-red-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Runbook sections */}
      <Section title="Prerequisites">
        <StepList items={r.prerequisites} />
      </Section>

      <Section title="Diagnosis">
        <StepList items={r.diagnosisSteps} numbered />
      </Section>

      <Section title="Resolution">
        <StepList items={r.resolutionSteps} numbered />
      </Section>

      <Section title="Verification">
        <StepList items={r.verificationSteps} numbered />
      </Section>

      <Section title="Rollback Plan">
        <StepList items={r.rollbackPlan} numbered />
      </Section>

      {r.notes && (
        <Section title="Notes">
          <p className="text-zinc-400 text-sm leading-relaxed">{r.notes}</p>
        </Section>
      )}
    </div>
  )
}
