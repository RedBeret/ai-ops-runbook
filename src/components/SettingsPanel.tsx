import { useState } from 'react'
import { useStore } from '@/state/store'
import { Eye, EyeOff } from 'lucide-react'

export function SettingsPanel() {
  const { apiKey, setApiKey, clearApiKey } = useStore()
  const [draft, setDraft] = useState(apiKey)
  const [visible, setVisible] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setApiKey(draft.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-zinc-300">API Key</h2>
        <p className="text-xs text-zinc-500">
          Your Anthropic API key. Stored in localStorage only — never sent anywhere except the Anthropic API.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={visible ? 'text' : 'password'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 pr-10 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
          <button
            onClick={() => setVisible((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            {visible ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={!draft.trim()}
          className="rounded-lg px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white transition-colors"
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>

      {apiKey && (
        <button
          onClick={() => { clearApiKey(); setDraft('') }}
          className="text-xs text-red-500 hover:text-red-400 text-left w-fit"
        >
          Remove API key
        </button>
      )}
    </div>
  )
}
