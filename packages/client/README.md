# Client Package (@workspace/client)

React frontend application for browsing products and viewing AI-powered review summaries.

## 🚀 Quick Start

### Prerequisites

- Bun v1.3.5+
- Backend server running on http://localhost:3000

### 1. Install Dependencies

From the root directory:

```bash
bun install
```

### 2. Start Development Server

```bash
bun run dev
```

The app will start on http://localhost:5173

## 📝 Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## 🏗️ Architecture

### Directory Structure

```
src/
├── components/          # React components
│   ├── products/       # Product listing components
│   ├── product-details/# Product detail page
│   ├── reviews/        # Review components
│   ├── skeleton/       # Loading skeletons
│   └── ui/            # shadcn/ui components
├── api-layers/         # API client functions
├── types/             # TypeScript type definitions
├── lib/               # Utility functions
└── assets/            # Static assets
```

## 🎨 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **TanStack Query** - Data fetching and caching

## 🔌 API Integration

The client communicates with the backend API at `http://localhost:3000`. API calls are organized in `src/api-layers/`:

- `products.api.ts` - Product endpoints
- `reviews.api.ts` - Review endpoints
- `ai-summary.api.ts` - AI summary endpoints

## 🎯 Features

- **Product Listing** - Browse all products
- **Product Details** - View detailed product information
- **Reviews Display** - Read customer reviews with ratings
- **AI Summaries** - View AI-generated review summaries
- **Responsive Design** - Mobile-first responsive layout
- **Loading States** - Skeleton loaders for better UX

## 🛠️ Development

### Adding New Components

Use shadcn/ui CLI to add components:

```bash
bunx shadcn@latest add [component-name]
```

### Code Style

The project uses ESLint and Prettier for code formatting. Run linting:

```bash
bun run lint
```

## React + TypeScript + Vite

This project is built with:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) - Uses SWC for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
