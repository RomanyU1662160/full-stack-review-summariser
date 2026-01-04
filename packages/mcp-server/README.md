# MCP Server Package (@workspace/mcp-server)

Model Context Protocol (MCP) server providing tools for accessing product reviews and summaries.

## 🚀 Quick Start

### Prerequisites

- Bun v1.3.5+
- Backend server running on http://localhost:3000

### 1. Install Dependencies

From the root directory:

```bash
bun install
```

### 2. Set Up Environment Variables

Create a `.env` file in this directory:

```env
API_BASE_URL=http://localhost:3000
```

### 3. Start MCP Server

**Development mode:**

```bash
bun run dev
```

**With MCP Inspector (for testing):**

```bash
bun run inspector
```

The inspector provides a web UI for testing MCP tools.

## 📝 Available Scripts

- `bun run dev` - Start MCP server
- `bun run inspector` - Start MCP inspector for testing tools

## 🏗️ Architecture

### Directory Structure

```
src/
├── mcp/
│   ├── server.ts       # MCP server setup
│   ├── types.ts        # Custom tool type definitions
│   ├── tools/          # MCP tool implementations
│   │   └── fetch-reviews.ts
│   └── utils/          # Utility functions
│       └── register-tool.ts
└── index.ts            # Entry point
```

## 🛠️ Available Tools

### fetch_reviews

Fetches reviews for a specific product from the backend API.

**Input Schema:**

```typescript
{
  product_id: number
}
```

**Output Schema:**

```typescript
{
  reviews: Array<{
    id: number
    title?: string
    content?: string
    rating?: number
    author?: {
      name: string
      email: string
    }
    createdAt?: string
    updatedAt?: string
  }>
}
```

## 🔌 Integration

The MCP server communicates with the backend API via HTTP requests. It does not directly access the database - all data flows through the REST API endpoints.

**Architecture:**

```
MCP Client → MCP Server → HTTP API → Backend Server → Database
```

This keeps database logic isolated in the backend server.

## 🧪 Testing Tools

Use the MCP Inspector to test tools:

```bash
bun run inspector
```

This will:

1. Start the MCP server
2. Open a web interface
3. Allow you to test tools with different inputs
4. Show structured and unstructured output

## 🎯 Adding New Tools

1. Create a new tool file in `src/mcp/tools/`
2. Define input/output schemas using Zod
3. Implement the tool using the `CustomTool` type
4. Register the tool in `src/mcp/server.ts`

**Example:**

```typescript
import { z } from 'zod'
import type { CustomTool } from '../types'

const inputSchema = z.object({
  param: z.string(),
})

const outputSchema = {
  result: z.string(),
}

export const myTool: CustomTool<typeof inputSchema, typeof outputSchema> = {
  name: 'my_tool',
  title: 'My Tool',
  description: 'Does something useful',
  inputSchema,
  outputSchema,
  execute: async ({ param }) => {
    // Call API or perform logic
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ result: 'value' }),
        },
      ],
      structuredContent: { result: 'value' },
    }
  },
}
```

## 📚 Learn More

- [Model Context Protocol Docs](https://modelcontextprotocol.io)
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
