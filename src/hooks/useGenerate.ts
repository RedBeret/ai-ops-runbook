import { useStore } from '@/state/store'
import { generateRunbook } from '@/lib/generate'
import type { Runbook } from '@/types'

export function useGenerate() {
  const { apiKey, setGenerating, setError, addRunbook } = useStore()

  async function generate(input: string): Promise<void> {
    if (!apiKey) {
      setError('API key required — add it in Settings.')
      return
    }
    if (!input.trim()) {
      setError('Paste an alert or incident description first.')
      return
    }

    setGenerating(true)
    setError(null)

    try {
      const { content, detectedFormat } = await generateRunbook(input, apiKey)

      const runbook: Runbook = {
        id: crypto.randomUUID(),
        title: content.summary.slice(0, 72),
        createdAt: Date.now(),
        inputText: input,
        detectedFormat,
        content,
      }

      addRunbook(runbook)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Generation failed: ${msg}`)
    } finally {
      setGenerating(false)
    }
  }

  return { generate, generating: useStore((s) => s.generating) }
}
