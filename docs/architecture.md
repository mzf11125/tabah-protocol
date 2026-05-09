# Tabah Protocol Architecture

## Layers

### Layer 1: AI Oracle (Software)
Monitors BMKG, BNPB, news RSS, and Twitter for disaster signals.
Pipeline: Detection → Cross-Reference → Impact Estimation → Campaign Creation.

### Layer 2: Tabah Network (Hardware)
IoT weather stations at schools via NGO partnerships.
Flow: Sensor → ATECC608A signature → LoRaWAN → On-chain oracle → Parametric trigger.

## Distribution Tiers

| Tier | Window | Verification | DID Required |
|------|--------|-------------|-------------|
| 1: Emergency | 0-24h | Location-based | No |
| 2: Priority | 24-72h | DID | Yes |
| 3: Recovery | 7d+ | Full DID + ZK | Yes |

## Stack

- Blockchain: Solana (Anchor)
- AI: LangGraph, TypeScript
- Frontend: React + Vite + TailwindCSS
- API: Hono (TypeScript)
- WhatsApp: WhatsApp Business API
