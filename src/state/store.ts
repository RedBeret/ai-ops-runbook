import { create } from 'zustand'
import { loadRunbooks, saveRunbook, deleteRunbook, loadApiKey, saveApiKey, clearApiKey } from '@/lib/storage'
import type { Runbook } from '@/types'

interface AppState {
  runbooks: Runbook[]
  activeRunbookId: string | null
  generating: boolean
  error: string | null
  apiKey: string

  setApiKey: (key: string) => void
  clearApiKey: () => void
  setGenerating: (v: boolean) => void
  setError: (msg: string | null) => void
  addRunbook: (runbook: Runbook) => void
  removeRunbook: (id: string) => void
  setActiveRunbook: (id: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  runbooks: loadRunbooks(),
  activeRunbookId: null,
  generating: false,
  error: null,
  apiKey: loadApiKey(),

  setApiKey: (key) => {
    saveApiKey(key)
    set({ apiKey: key })
  },

  clearApiKey: () => {
    clearApiKey()
    set({ apiKey: '' })
  },

  setGenerating: (v) => set({ generating: v }),
  setError: (msg) => set({ error: msg }),

  addRunbook: (runbook) => {
    saveRunbook(runbook)
    set((s) => ({ runbooks: [runbook, ...s.runbooks], activeRunbookId: runbook.id }))
  },

  removeRunbook: (id) => {
    deleteRunbook(id)
    set((s) => ({
      runbooks: s.runbooks.filter((r) => r.id !== id),
      activeRunbookId: s.activeRunbookId === id ? null : s.activeRunbookId,
    }))
  },

  setActiveRunbook: (id) => set({ activeRunbookId: id }),
}))
