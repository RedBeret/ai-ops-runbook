import { InputPanel } from '@/components/InputPanel'
import { RunbookView } from '@/components/RunbookView'
import { Sidebar } from '@/components/Sidebar'
import { useStore } from '@/state/store'

export function Home() {
  const { activeRunbookId, runbooks } = useStore()
  const hasRunbooks = runbooks.length > 0

  return (
    <div className="flex h-full gap-6">
      {/* Left: input + sidebar */}
      <div className="flex flex-col gap-6 w-[400px] shrink-0">
        <InputPanel />
        {hasRunbooks && (
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-1">
              History
            </h2>
            <Sidebar />
          </div>
        )}
      </div>

      {/* Right: runbook output */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {activeRunbookId ? (
          <RunbookView />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-zinc-600 text-sm italic">
              {hasRunbooks ? 'Select a runbook from history.' : 'Paste an alert and generate a runbook.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
