export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'unknown'

export type AlertFormat = 'pagerduty' | 'prometheus' | 'kubernetes' | 'plain'

export interface RunbookSection {
  summary: string
  severity: Severity
  affectedSystem: string
  prerequisites: string[]
  diagnosisSteps: string[]
  resolutionSteps: string[]
  verificationSteps: string[]
  rollbackPlan: string[]
  notes: string
}

export interface Runbook {
  id: string
  title: string
  createdAt: number
  inputText: string
  detectedFormat: AlertFormat
  content: RunbookSection
}
