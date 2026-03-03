# AI Ops Runbook Generator

Paste an alert or incident — get a structured operational runbook back in seconds.

Supports PagerDuty, Prometheus/Alertmanager, Kubernetes events, and plain-text descriptions. Runs entirely in the browser. Your API key stays local.

[![Deploy](https://github.com/redberet/ai-ops-runbook/actions/workflows/deploy.yml/badge.svg)](https://github.com/redberet/ai-ops-runbook/actions/workflows/deploy.yml)

## Quick start

```bash
bun install
bun dev
```

Open `http://localhost:5173`, go to Settings, add your [Anthropic API key](https://console.anthropic.com/), then paste an alert on the main screen.

## Architecture

```
src/
├── lib/
│   ├── detect-format.ts   # heuristic format detection
│   ├── prompts.ts         # system + user prompt builders
│   ├── generate.ts        # Anthropic SDK call + JSON parse
│   ├── storage.ts         # localStorage (runbooks + API key)
│   └── export.ts          # markdown export + clipboard
├── hooks/
│   └── useGenerate.ts     # orchestrates generation flow
├── components/
│   ├── InputPanel.tsx     # alert input + generate button
│   ├── RunbookView.tsx    # structured runbook display
│   ├── Sidebar.tsx        # runbook history list
│   └── SettingsPanel.tsx  # API key management
├── state/
│   └── store.ts           # Zustand store
└── types/
    └── index.ts           # shared types
```

## Key decisions

- **No backend** — avoids infra complexity for a demo tool. API key in localStorage, scoped to origin.
- **claude-sonnet-4-6** — right balance of cost and quality for structured JSON output.
- **JSON response contract** — prompt enforces a strict schema; parser strips markdown fences if present.
- **Format detection** — heuristics only; wrong detection degrades gracefully (falls back to plain text prompt).

## Rollback

Revert the commit and push to main — GitHub Actions redeploys automatically within ~60 seconds.

## Stack

TypeScript · React 19 · Vite · Tailwind CSS v4 · Zustand · Anthropic SDK · Vitest · Bun
