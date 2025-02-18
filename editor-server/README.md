# Yjs WebSocket Collaboration Server in Bun for ASICDE

## Overview

A Bun-based WebSocket server for real-time collaborative editing using Yjs.
Designed to integrate with a ASICDE NextJS application.

### Why Bun?

-   **Performance**: Bun's fast startup and execution speed enhance real-time capabilities,
-   **WebSocket Support**: Native WebSocket API simplifies server implementation,
-   **Built-in Tools**: Bundler, test runner, and package manager reduce toolchain complexity.

**[Download Bun](https://bun.sh)**

## Quick dev start

1. `bun install`,
2. Make sure you have `.env` in the parent NextJS ASICDE application,
3. `bun dev`.

## Inspiration

Adapted from the official [y-websocket](https://github.com/yjs/y-websocket/tree/master) reference implementation.

## Structure

### [server.ts](./server.ts)

-   Main file for creating the Bun WebSocket server,
-   Handles webSocket upgrade requests,
-   Validates AuthJS session JWT.

### [handlers.ts](./handlers.ts)

-   A `WSSSharedFile` class which extends Yjs `Doc`,
    -   Groups together WebSockets and clients per file,
    -   Propagates changes.
-   WebSocket handlers for `open`, `message`, `close`
-   Persisting of editted files to a filesystem
