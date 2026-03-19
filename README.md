# aiva-frontend

> React 19 PWA dashboard, UI components, and hooks for the AIVA platform.

**Organization:** [github.com/aiva-labs](https://github.com/aiva-labs)
**Status:** Active

---

## Overview

This repo contains the full PWA dashboard experience for AIVA: the mobile-first AI agent interface. Users manage their agent, tasks, reminders, memories, chat, and crypto wallet from here.

---

## Features

- Mobile-first PWA with home screen install support
- Bottom navigation: Home, Tasks, Chat, Wallet, Settings
- Multi-chain wallet display (EVM, Solana, Bitcoin)
- Smart install prompt with device detection (Android, iOS, Desktop)
- Push notification subscription UI
- TanStack Query for server state management
- Zustand for local state
- Full Radix UI + Tailwind CSS v4 design system

---

## Project Structure

```
aiva-frontend/
├── public/
│   ├── manifest.json          # PWA manifest (start_url: /pwa, display: standalone)
│   ├── sw.js                  # Service worker (fetch fallback, push handler)
│   └── icons/                 # PWA icons (192x192, 512x512, maskable)
├── src/
│   ├── components/
│   │   ├── ui/                # Radix UI primitives (button, dialog, tabs, etc.)
│   │   ├── Navbar.tsx         # Top navigation bar
│   │   ├── PageLayout.tsx     # Shared page wrapper
│   │   ├── SmartInstallPrompt.tsx  # PWA install modal
│   │   └── ChainLogos.tsx     # Crypto chain logos
│   ├── hooks/
│   │   ├── useSmartInstallPrompt.ts  # PWA install prompt logic
│   │   ├── use-mobile.tsx     # Mobile detection hook
│   │   └── use-toast.ts       # Toast notification hook
│   ├── pages/
│   │   ├── app.tsx            # Auth + agent creation wizard (register/login + 3-step wizard)
│   │   ├── pwa.tsx            # Main PWA dashboard (Home/Tasks/Chat/Wallet/Settings tabs)
│   │   ├── not-found.tsx      # 404 page
│   │   ├── capabilities/      # Feature detail pages
│   │   │   ├── chat.tsx
│   │   │   ├── memory.tsx
│   │   │   ├── notif.tsx
│   │   │   ├── personality.tsx
│   │   │   └── sync.tsx
│   │   └── platform/          # Platform info pages
│   │       ├── agent-builder.tsx
│   │       ├── memory.tsx
│   │       ├── pwa.tsx
│   │       ├── reminders.tsx
│   │       ├── tasks.tsx
│   │       └── wallet.tsx
│   ├── lib/
│   │   └── utils.ts           # cn() utility for class merging
│   ├── App.tsx                # Router setup (wouter)
│   ├── main.tsx               # App entry point
│   └── index.css              # Tailwind CSS v4 base styles
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#0a0a14` / `#0a0a1a` |
| Accent Indigo | `#6366f1` |
| Accent Cyan | `#06b6d4` |
| Card style | `bg-white/5 border border-white/10` glass-morphism |
| Font body | Inter |
| Font mono | JetBrains Mono |

---

## Related Repos

| Repo | Role |
|---|---|
| [aiva-backend](https://github.com/aiva-labs/aiva-backend) | API server, wallet gen, auth |
| [aiva-landing](https://github.com/aiva-labs/aiva-landing) | Marketing landing page |
| [aiva-docs](https://github.com/aiva-labs/aiva-docs) | Documentation site |

---

## Quick Start

```bash
git clone https://github.com/aiva-labs/aiva-frontend.git
cd aiva-frontend
npm install

cp .env.example .env
# Set VITE_API_URL to your aiva-backend URL

npm run dev
```

---

## PWA Notes

- `beforeinstallprompt` is captured early in `index.html` at `window.__deferredInstallPrompt`
- Agent ID stored in `localStorage` as `aiva_agent_id`
- Service worker handles push events and notification clicks
- iOS detection shows "Open in Safari" for non-Safari browsers

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | TypeScript type check |
