import { useState } from 'react'
import { useGenerate } from '@/hooks/useGenerate'
import { useStore } from '@/state/store'
import { detectFormat } from '@/lib/detect-format'
import { clsx } from 'clsx'

const FORMAT_LABEL = {
  pagerduty: 'PagerDuty',
  prometheus: 'Prometheus',
  kubernetes: 'Kubernetes',
  plain: 'Plain text',
}

export function InputPanel() {
  const [input, setInput] = useState('')
  const { generate, generating } = useGenerate()
  const error = useStore((s) => s.error)

  const detectedFormat = input.trim() ? detectFormat(input) : null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
          Alert Input
        </h2>
        {detectedFormat && (
          <span className="text-xs text-zinc-500 font-mono">
            detected: {FORMAT_LABEL[detectedFormat]}
          </span>
        )}
      </div>

      <textarea
        className={clsx(
          'w-full h-64 resize-y rounded-lg border bg-zinc-900 p-4 font-mono text-sm text-zinc-100 placeholder:text-zinc-600',
          'focus:outline-none focus:ring-1',
          error ? 'border-red-500/50 focus:ring-red-500/50' : 'border-zinc-700 focus:ring-zinc-500',
        )}
        placeholder={`Paste an alert, log, or incident here...\n\nSupports: PagerDuty, Prometheus, Kubernetes events, plain text`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={generating}
        spellCheck={false}
      />

      {error && (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      )}

      <button
        onClick={() => generate(input)}
        disabled={generating || !input.trim()}
        className={clsx(
          'rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors',
          generating || !input.trim()
            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 text-white',
        )}
      >
        {generating ? 'Generating runbook…' : 'Generate Runbook'}
      </button>
    </div>
  )
}
