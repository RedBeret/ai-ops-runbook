# ai-ops-runbook

## What this repo does
Browser-based tool that takes a raw alert, log, or incident description and generates a structured operational runbook using the Anthropic API. No backend — API key lives in localStorage.

## Key directories
- `src/lib/` — pure utilities: format detection, prompt building, API call, storage, export
- `src/hooks/` — useGenerate (orchestrates generation + state)
- `src/components/` — UI: InputPanel, RunbookView, Sidebar, SettingsPanel
- `src/state/` — Zustand store (runbooks, apiKey, generating, error)
- `src/types/` — shared TypeScript types

## Key entrypoints
- `src/App.tsx` — root layout, tab routing (home / settings)
- `src/lib/generate.ts` — Anthropic SDK call, JSON parse
- `src/lib/prompts.ts` — system prompt + user prompt builders

## How to run
- Build: `bun run build`
- Test: `bun test`
- Lint: `bun run lint`
- Local dev: `bun dev`
- Deploy: push to main → GitHub Actions deploys to GitHub Pages

## Constraints
- Environments: dev (local) / prod (GitHub Pages)
- No backend — all state in localStorage, API key never leaves browser
- Target: claude-sonnet-4-6, max_tokens 2048
- Supports alert formats: PagerDuty, Prometheus/Alertmanager, Kubernetes events, plain text

## Definition of done
- Tests pass (`bun test`)
- Lint passes (`bun run lint`)
- Rollback plan: revert commit + redeploy (GH Pages auto-deploys on push to main)
- Build succeeds (`bun run build`)
