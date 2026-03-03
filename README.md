# seda-moon

Real-time composite rate feed from [SEDA Fast](https://docs.seda.xyz/home/for-developers/define-your-delivery-method/seda-fast/getting-started/websocket-api) using the WebSocket API.

Connects to the SEDA Fast WebSocket service, starts a feed that executes a session-aware oracle program at a configurable interval, and logs the composite rate as results arrive.

## Prerequisites

- Node.js >= 18
- A SEDA Fast API key with WebSocket access

## Setup

```bash
npm install
```

Create a `.env` file in the project root:

```
SEDA_FAST_API_KEY=your_api_key_here
```

## Usage

```bash
npm start
```

The client will connect, authenticate, start the feed, and log each new price as it arrives. Press `Ctrl+C` to gracefully stop the feed and disconnect.

## Configuration

Edit `src/config.ts` to change:

| Constant | Description | Default |
|---|---|---|
| `WS_URL` | SEDA Fast WebSocket endpoint | `wss://fast-ws.mainnet.seda.xyz/ws/v1` |
| `PERIODICITY_MS` | Feed polling interval in milliseconds | `250` |

The oracle program ID, session IDs, and weights are also configured in `src/config.ts`.

## Project Structure

```
src/
├── index.ts    Entry point — loads env and starts the client
├── client.ts   WebSocket connection, message handling, graceful shutdown
├── config.ts   Constants, request payload, and feed parameters
└── types.ts    TypeScript interfaces for SEDA WebSocket messages
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Run the client with tsx (no build step) |
| `npm run build` | Compile TypeScript to `dist/` |
