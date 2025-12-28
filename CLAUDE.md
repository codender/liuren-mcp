# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a JavaScript/TypeScript project that contains:
- MCP (Model Context Protocol) server implementation in `functions/mcp-server/`
- Key-Value storage API endpoints in `functions/kv/`
- A frontend client in `index.html`
- Shared utility functions in `functions/shared/`

The project appears to be deployed using Cloudflare Pages with Functions, based on the directory structure.

## Commands

**Package Management:**
- `npm install` - Install dependencies

**TypeScript Compilation:**
- `npx tsc` - Compile TypeScript with tsconfig.json settings
- `npx tsc --watch` - Watch mode for continuous compilation
- `npx tsc --noEmit` - Type check without emitting files (useful for linting)

## Architecture

### Function-based Cloudflare Pages Structure
The project uses Cloudflare Pages Functions with the following endpoints:

1. **MCP Server** (`/mcp-server`): Acts as a Model Context Protocol server that provides LLM capabilities and tools. This is the main API endpoint for model interactions.

2. **KV Storage API** (`/kv/*`): Provides simple key-value storage with:
   - `PUT /kv/*` - Store key-value pairs (functions/kv/put.js:21)
   - `GET /kv/*` - Retrieve values by key (functions/kv/get.js:34)

### Shared Code
- `functions/shared/`: Contains shared utilities that can be used across multiple functions
- `functions/share/`: Seems to contain additional shared resources

### Frontend
- `index.html`: Single-page application client interface that consumes the MCP server APIs

## TypeScript Configuration

The project uses TypeScript for type checking but compiles to JavaScript for deployment. Key settings:
- Target: ES2021
- Module: ESNext
- Module Resolution: Bundler
- Strict mode enabled
- SkipLibCheck enabled

## Development Notes

- The project uses native ES modules (type: "module" in package.json)
- No explicit build step is defined besides TypeScript compilation
- The project appears designed to be deployed directly to Cloudflare Pages
- Functions follow the Cloudflare Pages Functions API format