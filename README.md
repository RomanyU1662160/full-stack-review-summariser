# Reviews Summaries - Full Stack Application

A full-stack e-commerce review summarization application with AI-powered summaries using OpenAI, HuggingFace, and Ollama. Built with Bun, TypeScript, React, Express, Prisma, and Model Context Protocol (MCP).

## 🏗️ Project Structure

This is a monorepo with three packages:

- **`packages/server`** - Backend API server with AI agents
- **`packages/client`** - React frontend with Vite
- **`packages/mcp-server`** - Model Context Protocol server for tool integration

## 📋 Prerequisites

- [Bun](https://bun.sh) v1.3.5 or higher
- MySQL 8.0 or MariaDB (running locally or via Docker)
- Node.js 18+ (for some dependencies)

## 🚀 Getting Started

### 1. Install Dependencies

From the root directory:

```bash
bun install
```

This will install dependencies for all packages in the monorepo.

### 2. Set Up the Database

**Start MySQL/MariaDB using the provided script:**

```bash
cd packages/server
./scripts/start-mysql.sh
```

This will start a MariaDB container with the correct configuration.

### 3. Configure Environment Variables

**Server Package (`packages/server/.env`):**

```env
PORT=3000
VITE_API_URL=http://localhost:3000
DATABASE_URL=mysql://user:password@localhost:3306/reviews_db
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=reviews_db
DATABASE_HOST=localhost
DATABASE_PORT=3306

# AI Provider Credentials
OPENAI_API_KEY=sk-your-openai-api-key
HF_TOKEN=hf_your-huggingface-token

# AI Mode: OPENAI, HF, or ollama
# AI_MODE=OPENAI
```

**MCP Server Package (`packages/mcp-server/.env`):**

```env
API_BASE_URL=http://localhost:3000
```

### 4. Run Database Migrations

```bash
cd packages/server
bun run migrate:dev
```

### 5. Seed the Database (Optional)

```bash
cd packages/server
bun run db:seed
```

### 4. Run Database Migrations

```bash
cd packages/server
bun run migrate:dev
```

### 5. Seed the Database (Optional)

```bash
cd packages/server
bun run db:seed
```

## 🎯 Running the Application

### Run Everything (Recommended)

Open 2 terminal windows:

**Terminal 1 - Backend Server:**

```bash
cd packages/server
bun run dev
```

The server will start on http://localhost:3000

**Terminal 2 - Frontend Client:**

```bash
cd packages/client
bun run dev
```

The client will start on http://localhost:5173

### Optional: Run MCP Server

If you want to use the Model Context Protocol server:

```bash
cd packages/mcp-server
bun run inspector
```

## 📦 Package Details

### Server Package (`@workspace/core`)

**Location:** `packages/server`

**Available Scripts:**

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run migrate:dev` - Run Prisma migrations
- `bun run db:seed` - Seed database with sample data
- `bun run db:reset` - Reset database (warning: deletes all data)
- `bun run view:data` - Open Prisma Studio to view data

**Environment Variables Required:**

- `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`
- `OPENAI_API_KEY` (for OpenAI agent)
- `HF_TOKEN` (for HuggingFace agent)
- `AI_MODE` (optional: OPENAI, HF, or ollama)

### Client Package (`@workspace/client`)

**Location:** `packages/client`

**Available Scripts:**

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run preview` - Preview production build

**Environment Variables:**

- Uses `VITE_API_URL` from server package automatically

### MCP Server Package (`@workspace/mcp-server`)

**Location:** `packages/mcp-server`

**Available Scripts:**

- `bun run dev` - Start MCP server
- `bun run inspector` - Start MCP inspector for testing tools

**Environment Variables Required:**

- `API_BASE_URL` - URL of the backend server (default: http://localhost:3000)

## 🤖 AI Agents

The application supports three AI providers:

1. **OpenAI** - Using OpenAI Agents SDK with classifier and summarizer agents
2. **HuggingFace** - Using Llama model for review summarization
3. **Ollama** - Using local Ollama installation

Configure the provider by uncommenting the `AI_MODE` line in `.env`.

## 🛠️ Development

### Database Management

**View data in Prisma Studio:**

````bash
cd packages/server
bun run view:data
Server will run on `http://localhost:3000`

**Terminal 2 - Frontend Client:**
```bash
cd packages/client
bun run dev
````

Client will run on `http://localhost:5173`

**Terminal 3 - MCP Server (Optional):**

```bash
cd packages/mcp-server
bun run dev
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Prisma Studio:** Run `cd packages/server && bun run view:data`

## 📦 Package Details

See individual package READMEs for more details:

- [Server Package](./packages/server/README.md)
- [Client Package](./packages/client/README.md)
- [MCP Server Package](./packages/mcp-server/README.md)

## 🛠️ Common Commands

```bash
# Install dependencies for all packages
bun install

# Reset database (WARNING: Deletes all data)
cd packages/server && bun run db:reset

# View database in Prisma Studio
cd packages/server && bun run view:data

# Stop MySQL container
cd packages/server && bun run stop:mysql
```

## 🤖 AI Providers

This app supports three AI providers for generating review summaries:

1. **OpenAI** - Requires `OPENAI_API_KEY`
2. **HuggingFace** - Requires `HF_TOKEN`
3. **Ollama** - Requires local Ollama installation

Set the `AI_MODE` in `packages/server/.env` to choose the provider.

## 📝 Tech Stack

- **Runtime:** Bun
- **Backend:** Express, Prisma, TypeScript
- **Frontend:** React, Vite, TailwindCSS, TanStack Query
- **Database:** MySQL/MariaDB
- **AI:** OpenAI Agents SDK, HuggingFace Inference, Ollama
- **MCP:** Model Context Protocol SDK

---

Built with ❤️ using Bun
