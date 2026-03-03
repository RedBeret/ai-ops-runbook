import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt, buildUserPrompt } from './prompts'
import { detectFormat } from './detect-format'
import type { AlertFormat, RunbookSection } from '@/types'

// claude-sonnet-4-6 — balanced cost/capability for operational runbooks
const MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 2048

export interface GenerateResult {
  content: RunbookSection
  detectedFormat: AlertFormat
}

export async function generateRunbook(
  input: string,
  apiKey: string,
): Promise<GenerateResult> {
  const detectedFormat = detectFormat(input)

  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true, // key never leaves the browser
  })

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content: buildUserPrompt(input, detectedFormat) }],
  })

  const raw = response.content[0]
  if (raw.type !== 'text') throw new Error('Unexpected response type from API')

  // Strip markdown code fences if present
  const json = raw.text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()

  let content: RunbookSection
  try {
    content = JSON.parse(json) as RunbookSection
  } catch {
    throw new Error('Failed to parse runbook JSON from response')
  }

  return { content, detectedFormat }
}
