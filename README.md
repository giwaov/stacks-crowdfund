# 💰 Stacks Crowdfunding

Decentralized fundraising platform built on Stacks blockchain.

## Features

- **Create Campaigns**: Launch funding campaigns with STX goals
- **Contribute**: Fund campaigns directly with STX
- **On-chain Tracking**: All contributions recorded on-chain
- **Wallet Integration**: @stacks/connect for seamless wallet connection

## Tech Stack

- **Smart Contract**: Clarity on Stacks
- **Frontend**: Next.js 14 + TypeScript
- **Wallet**: @stacks/connect
- **Transactions**: @stacks/transactions

## Deployed Contract

**Mainnet**: `SP3E0DQAHTXJHH5YT9TZCSBW013YXZB25QFDVXXWY.crowdfund`

## Contract Functions

```clarity
(create-campaign (title (string-utf8 100)) (goal uint) (duration uint))
(contribute (campaign-id uint) (amount uint))
(get-campaign (id uint))
(get-contribution (campaign-id uint) (contributor principal))
```

## Quick Start

```bash
npm install
npm run dev
```

## License

MIT
