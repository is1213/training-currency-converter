# Copilot Instructions

Guidance for AI coding agents working in this currency converter codebase.

## Architecture Overview

This is a **Next.js 14 App Router** currency converter with a client-server architecture:

- **Client Layer** (`app/page.tsx`, `components/`): React components handling UI state, form interactions, and history management
- **Server Layer** (`app/api/rates/route.ts`): Single API endpoint fetching and caching exchange rates from external sources
- **Hooks** (`hooks/`): Custom React hooks (`useConverter`, `useExchangeRates`) managing core business logic and API communication
- **Utils** (`utils/`): Pure functions for currency validation, conversion math, and localStorage persistence
- **Types** (`types/index.ts`): Centralized type definitions

**Key Design Pattern**: Unidirectional data flow—URL params initialize state → Exchange rates fetched → Conversion calculated automatically as user types.

## Core Workflows

### Development

```bash
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run test         # Run Jest once
npm run test:watch   # Run Jest in watch mode
npm run test:coverage # Generate coverage report
npm run build        # Next.js production build
```

### Testing

- **Test Files**: Colocate with source (e.g., `components/AmountInput.test.tsx`, `hooks/useConverter.test.ts`)
- **Mocking API**: Use MSW (Mock Service Worker) for API route testing—see `jest.setup.ts` configuration
- **Coverage**: Jest configured to exclude `app/layout.tsx`; coverage targets `components/`, `hooks/`, `utils/`, `app/` (excluding layouts)

## Critical Patterns & Conventions

### React Component Structure

- **Client Components**: Use `'use client'` directive at top of file (required for hooks, event handlers, state)
- **Naming**: Components in `PascalCase`, files match component name
- **Example**: [ConverterForm.tsx](../components/ConverterForm.tsx) handles form rendering; [AmountInput.tsx](../components/AmountInput.tsx) handles single input field

### Hook Patterns

- **useExchangeRates()**: Fetches `/api/rates`, manages loading/error states, runs once on mount
- **useConverter()**: Orchestrates conversion logic—reads URL params, performs validation, updates history, syncs URL state
- **Key Pattern**: URL is source of truth for converter state (`amount`, `from`, `to`)—enables shareable links

### Type Safety

- All types centralized in [types/index.ts](../types/index.ts): `ExchangeRates`, `ConversionResult`, `Currency`
- API responses follow `{ success: boolean; data?: ExchangeRates; error?: string }` contract
- Use types from utils directly when accessing currency lists: `CURRENCIES` from [utils/currency.ts](../utils/currency.ts)

### API Layer

- Single endpoint: `GET /api/rates` returns cached exchange rates
- **Fallback Strategy**: Primary API source (frankfurter.app) → Mock data if unavailable (see [route.ts](../app/api/rates/route.ts#L70-L90))
- **Caching**: Response cached server-side for 1 hour (Next.js ISR pattern)
- **Error Handling**: Network errors logged; mock rates returned with console warning

### Validation & Storage

- **Input Validation**: `validateAmount()` checks for empty/non-numeric/negative values, returns `{ isValid, error }`
- **History Persistence**: `saveConversion()` stores to localStorage; `getConversionHistory()` retrieves last 10 items; `clearConversionHistory()` clears all
- **See**: [utils/currency.ts](../utils/currency.ts) and [utils/storage.ts](../utils/storage.ts)

## Import Aliases

- `@/` maps to workspace root (configured in [tsconfig.json](../tsconfig.json) and Jest)
- Always use: `import X from '@/components/Y'`, `import { useConverter } from '@/hooks/useConverter'`

## Styling

- **Framework**: Tailwind CSS with `globals.css` for global styles
- **Config**: [tailwind.config.ts](../tailwind.config.ts) and [postcss.config.js](../postcss.config.js)
- **Pattern**: Utility-first; prefer Tailwind classes over custom CSS

## Common Tasks

**Adding a new component**: Create in `components/`, export from [components/index.ts](../components/index.ts), add tests alongside
**Adding validation logic**: Extend [utils/currency.ts](../utils/currency.ts) with pure function, test in `currency.test.ts`
**Modifying API response**: Update type in [types/index.ts](../types/index.ts), adjust transform in [route.ts](../app/api/rates/route.ts), update hook error handling
**Fixing localStorage issues**: Debug in [utils/storage.ts](../utils/storage.ts)—check key names and JSON serialization

## External Dependencies

- **Next.js 14**: App Router (not Pages Router); Server Components by default
- **React 18**: Hooks, Concurrent features available
- **TypeScript 5.3**: Strict mode enabled
- **Tailwind 3.4**: Just-in-time compilation
- **Testing**: Jest, React Testing Library, MSW for API mocking
