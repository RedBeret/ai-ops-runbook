import type { Runbook } from '@/types'

const RUNBOOKS_KEY = 'rb_runbooks'
const API_KEY_KEY = 'rb_api_key'

export function saveRunbook(runbook: Runbook): void {
  const existing = loadRunbooks()
  existing.unshift(runbook) // newest first
  localStorage.setItem(RUNBOOKS_KEY, JSON.stringify(existing))
}

export function loadRunbooks(): Runbook[] {
  try {
    return JSON.parse(localStorage.getItem(RUNBOOKS_KEY) ?? '[]') as Runbook[]
  } catch {
    return []
  }
}

export function deleteRunbook(id: string): void {
  const updated = loadRunbooks().filter((r) => r.id !== id)
  localStorage.setItem(RUNBOOKS_KEY, JSON.stringify(updated))
}

export function saveApiKey(key: string): void {
  localStorage.setItem(API_KEY_KEY, key)
}

export function loadApiKey(): string {
  return localStorage.getItem(API_KEY_KEY) ?? ''
}

export function clearApiKey(): void {
  localStorage.removeItem(API_KEY_KEY)
}
