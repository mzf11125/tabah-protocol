# Tabah Protocol

AI-powered emergency response module for [ziswaf.tawf.foundation](https://ziswaf.tawf.foundation).

Tabah detects climate disasters in real time via AI (news/BMKG/BNPB) and IoT (weather station network), then automatically creates verified emergency campaigns with three-tier aid distribution.

## Architecture

```
tabah-protocol/
├── packages/
│   ├── web/            # React + Vite dashboard
│   ├── ai-oracle/      # LLM-based disaster detection pipeline
│   ├── api/            # Hono backend API
│   └── whatsapp/       # WhatsApp claim bot
├── contracts/          # Solana Anchor programs
└── docs/               # Architecture and contribution guides
```

## Quick Start

```bash
pnpm install
pnpm dev
```

## UNICEF Venture Fund

Tabah is the target project for the UNICEF Venture Fund Climate Ventures call:
- $100K equity-free
- Deadline: May 17, 2026
- Focus: Climate tech for children's health
- Alignment: Area 2 (early warning/action) + Area 4 (decentralized data control)

## License

MIT — Tawf Labs
