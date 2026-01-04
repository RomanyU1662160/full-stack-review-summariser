# Server Package (@workspace/core)

Backend API server with AI-powered review summarization using OpenAI, HuggingFace, and Ollama agents.

## 🚀 Quick Start

### Prerequisites

- Bun v1.3.5+
- MySQL 8.0 or MariaDB running on localhost:3306

### 1. Install Dependencies

From the root directory:

```bash
bun install
```

### 2. Set Up Environment Variables

Create a `.env` file in this directory:

```env
PORT=3000
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

### 3. Start Database

```bash
./scripts/start-mysql.sh
```

### 4. Run Migrations

```bash
bun run migrate:dev
```

### 5. Seed Database (Optional)

```bash
bun run db:seed
```

### 6. Start Server

**Development mode (with hot reload):**

```bash
bun run dev
```

**Production mode:**

```bash
bun run start
```

Server will start on http://localhost:3000

## 📝 Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run start:mysql` - Start MySQL container
- `bun run stop:mysql` - Stop MySQL container
- `bun run migrate:dev` - Run Prisma migrations
- `bun run generate` - Generate Prisma client
- `bun run db:seed` - Seed database with sample data
- `bun run db:reset` - Reset database (⚠️ deletes all data)
- `bun run view:data` - Open Prisma Studio

## 🏗️ Architecture

### Directory Structure

```
src/
├── agents/          # AI agent implementations
│   ├── openai/     # OpenAI Agents SDK
│   ├── HG/         # HuggingFace integration
│   └── ollama/     # Ollama integration
├── controllers/     # Route controllers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Express middleware
└── utils/          # Utility functions

prisma/
├── schema.prisma   # Database schema
├── migrations/     # Database migrations
└── seed.ts         # Seed data
```

### API Endpoints

**Products:**

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:id/reviews` - Get reviews for a product

**Reviews:**

- `GET /api/reviews/:productId` - Get reviews by product ID
- `POST /api/reviews/:productId` - Add review to product

**Summaries:**

- `GET /api/summaries/:id` - Get AI summary for product reviews

**Chat:**

- `POST /api/chat` - Generate AI summary (OpenAI/HF/Ollama)

## 🤖 AI Providers

### OpenAI (Recommended)

Uses OpenAI Agents SDK with multi-agent workflow:

- **Classifier Agent**: Categorizes reviews by sentiment
- **Summarizer Agent**: Generates comprehensive summary

**Setup:**

1. Get API key from https://platform.openai.com/api-keys
2. Set `OPENAI_API_KEY` in `.env`
3. Uncomment `AI_MODE=OPENAI` in `.env`

### HuggingFace

Uses Llama model via HuggingFace Inference API.

**Setup:**

1. Get token from https://huggingface.co/settings/tokens
2. Set `HF_TOKEN` in `.env`
3. Set `AI_MODE=HF` in `.env`

### Ollama

Uses local Ollama installation.

**Setup:**

1. Install Ollama from https://ollama.ai
2. Pull a model: `ollama pull llama2`
3. Set `AI_MODE=ollama` in `.env`

## 🗄️ Database

**View data:**

```bash
bun run view:data
```

**Reset database:**

```bash
bun run db:reset
```

**Create new migration:**

```bash
bunx prisma migrate dev --name your_migration_name
```
