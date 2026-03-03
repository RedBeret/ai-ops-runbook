import { useStore } from '@/state/store'
import { SeverityBadge } from '@/components/ui/badge'
import { clsx } from 'clsx'

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function Sidebar() {
  const { runbooks, activeRunbookId, setActiveRunbook } = useStore()

  if (!runbooks.length) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <p className="text-xs text-zinc-600 italic">No runbooks yet.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-auto">
      {runbooks.map((r) => (
        <button
          key={r.id}
          onClick={() => setActiveRunbook(r.id)}
          className={clsx(
            'flex flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors',
            activeRunbookId === r.id
              ? 'bg-zinc-800 text-zinc-100'
              : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200',
          )}
        >
          <span className="text-xs font-medium leading-snug line-clamp-2">{r.title}</span>
          <div className="flex items-center gap-2">
            <SeverityBadge severity={r.content.severity} />
            <span className="text-xs text-zinc-600">{formatDate(r.createdAt)}</span>
          </div>
        </button>
      ))}
    </div>
  )
}
