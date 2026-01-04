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

# MCP Server for Reviews System

This package provides a Model Context Protocol (MCP) server that exposes review system functionality to AI assistants like Claude Desktop, Cline, and other MCP-compatible clients.

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that standardizes how AI assistants connect to external data sources and tools. It allows AI assistants to:

- Access your application's data securely
- Execute tools and retrieve information
- Provide context-aware responses

## Quick Start

### Prerequisites

1. **Backend server must be running** on `http://localhost:3000`
2. Bun runtime installed (`curl -fsSL https://bun.sh/install | bash`)

### Setup

1. Install dependencies:

```bash
cd packages/mcp-server
bun install
```

2. Create `.env` file:

```bash
API_BASE_URL=http://localhost:3000
```

3. Test the server:

```bash
# Using MCP Inspector
bunx @modelcontextprotocol/inspector bun run src/index.ts

# Or run directly
bun run src/index.ts
```

## Using with Claude Desktop

### Step 1: Find Your Bun Path

```bash
which bun
# Output example: /Users/yourusername/.bun/bin/bun
```

### Step 2: Configure Claude Desktop

1. Open Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. Add the reviews-system MCP server:

```json
{
  "mcpServers": {
    "reviews-system": {
      "command": "/Users/yourusername/.bun/bin/bun",
      "args": [
        "run",
        "/full/path/to/reviews-summaries/packages/mcp-server/src/index.ts"
      ],
      "env": {
        "API_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

**Important**:

- Replace `/Users/yourusername/.bun/bin/bun` with your actual bun path
- Replace `/full/path/to/reviews-summaries` with your project's absolute path
- Use absolute paths (no `~` or relative paths)

### Step 3: Restart Claude Desktop

1. Quit Claude Desktop completely (Cmd+Q on Mac)
2. Restart Claude Desktop
3. Check connection in Claude Desktop's MCP settings

### Step 4: Verify Connection

Check the logs to confirm successful connection:

- **macOS**: `~/Library/Logs/Claude/mcp-server-reviews-system.log`

You should see:

```
Server started and connected successfully
```

### Step 5: Use in Claude

Now you can ask Claude questions like:

- "What are the reviews for product 1?"
- "Show me reviews for product ID 2"
- "Can you summarize the feedback for product 1?"

Claude will automatically:

1. Recognize it has access to the `fetch_reviews` tool
2. Call your MCP server
3. Retrieve reviews from your API
4. Analyze and present the information

## Using with Other MCP Clients

### Cline (VS Code Extension)

1. Install Cline extension in VS Code
2. Open Cline settings
3. Add MCP server configuration:

```json
{
  "mcpServers": {
    "reviews-system": {
      "command": "bun",
      "args": ["run", "/path/to/mcp-server/src/index.ts"],
      "env": {
        "API_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

### Zed Editor

1. Open Zed settings (`~/.config/zed/settings.json`)
2. Add MCP configuration in the `assistant` section

## Available Tools

### fetch_reviews

Fetches reviews for a specific product.

**Input:**

```json
{
  "product_id": 1
}
```

**Output:**

```json
{
  "reviews": [
    {
      "id": 1,
      "title": "Great product",
      "content": "Works perfectly!",
      "rating": 5,
      "author": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

## Architecture

```
┌─────────────────────────────────────┐
│   AI Client (Claude Desktop)        │
│   User asks: "Show reviews for      │
│   product 1"                        │
└──────────────┬──────────────────────┘
               │
               │ MCP Protocol (stdio)
               │
┌──────────────▼──────────────────────┐
│   MCP Server                        │
│   - Receives tool call              │
│   - Validates input                 │
└──────────────┬──────────────────────┘
               │
               │ HTTP Request
               │ GET /api/products/1/reviews
               │
┌──────────────▼──────────────────────┐
│   Backend API Server                │
│   - Handles request                 │
│   - Queries database                │
│   - Returns reviews                 │
└─────────────────────────────────────┘
```

**Key Points:**

- MCP server doesn't access database directly
- All data access goes through your HTTP API
- Backend API handles authentication/authorization
- MCP server is stateless

## Troubleshooting

### "Failed to spawn process: No such file or directory"

**Problem**: Wrong bun path or path with spaces not properly handled

**Solution**:

1. Find correct bun path: `which bun`
2. Use absolute path in config
3. Ensure no typos in the path

### "Connection refused" or "ECONNREFUSED"

**Problem**: Backend server not running

**Solution**:

1. Start backend server: `bun run app` from project root
2. Verify server is running: `curl http://localhost:3000/api/health`

### "Server transport closed unexpectedly"

**Problem**: MCP server crashed on startup

**Solution**:

1. Check logs: `~/Library/Logs/Claude/mcp-server-reviews-system.log`
2. Test manually: `bun run src/index.ts`
3. Check `.env` file exists with `API_BASE_URL`

### Logs Show Success But Claude Can't Use Tool

**Problem**: Configuration mismatch

**Solution**:

1. Restart Claude Desktop completely (Cmd+Q)
2. Clear Claude cache if needed
3. Verify tool appears in Claude's available tools

## Security Considerations for Production

### 1. Authentication

Add API authentication in `.env`:

```bash
API_BASE_URL=http://localhost:3000
API_KEY=your-secret-key
```

Update fetch calls in tools:

```typescript
const response = await fetch(
  `${API_BASE_URL}/api/products/${product_id}/reviews`,
  {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  }
)
```

### 2. Rate Limiting

Implement rate limiting in your backend API to prevent abuse.

### 3. Data Filtering

Ensure your API only returns data the user should access:

- User-specific reviews
- Public reviews only
- Appropriate permission checks

### 4. HTTPS

Use HTTPS in production:

```bash
API_BASE_URL=https://api.yourdomain.com
```

## Adding New Tools

1. Create a new tool file in `src/mcp/tools/`:

```typescript
// src/mcp/tools/list-products.ts
import { z } from 'zod'
import { CustomTool } from '../types'

const listProductsInputSchema = z.object({
  limit: z.number().optional().default(10),
})

const listProductsOutputSchema = {
  products: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
    })
  ),
}

export const listProductsTool: CustomTool<
  typeof listProductsInputSchema,
  typeof listProductsOutputSchema
> = {
  name: 'list_products',
  title: 'List Products',
  description: 'List all available products',
  inputSchema: listProductsInputSchema,
  outputSchema: listProductsOutputSchema,
  execute: async ({ limit }) => {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/products?limit=${limit}`
    )
    const products = await response.json()

    return {
      content: [{ type: 'text', text: JSON.stringify({ products }, null, 2) }],
      structuredContent: { products },
    }
  },
}
```

2. Register the tool in `src/mcp/server.ts`:

```typescript
import { listProductsTool } from './tools/list-products'

export async function startMcpServer(port = 4000) {
  // ...existing code...

  registerMcpTool(mcpServer, fetchReviewsTool)
  registerMcpTool(mcpServer, listProductsTool) // Add new tool

  // ...existing code...
}
```

3. Restart the MCP server and Claude Desktop

## Understanding Data Access

### What AI Clients Know

- **Tool descriptions**: What tools are available and what they do
- **Schemas**: Input/output structure for each tool
- **Nothing else**: No access to your database or data until tools are called

### What AI Clients DON'T Know

- Product IDs, names, or any product data
- Existing reviews or user data
- Database schema or structure
- Any data that isn't explicitly returned by tool calls

### Example Flow

**User**: "What are the reviews for product 1?"

**Claude's Process**:

1.  Knows: Tool `fetch_reviews` exists
2.  Knows: It needs a `product_id` parameter
3.  Doesn't know: What products exist or their IDs
4.  Extracts: `product_id: 1` from user's question
5.  Calls: `fetch_reviews(product_id: 1)`
6.  Receives: Review data ONLY NOW
7.  Responds: Analyzes and presents the reviews

## Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [Claude Desktop MCP Guide](https://docs.anthropic.com/claude/docs/mcp)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Support

For issues or questions:

1. Check logs: `~/Library/Logs/Claude/mcp-server-reviews-system.log`
2. Test manually with MCP Inspector
3. Verify backend server is running
4. Check this README's troubleshooting section

## 📚 Learn More

- [Model Context Protocol Docs](https://modelcontextprotocol.io)
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
