# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitTracker is a React + TypeScript + Vite fitness tracking application. The project uses:
- React 19 with TypeScript 5.9
- Vite 7 for fast development and optimized builds
- MobX for state management
- SCSS for styling
- Prettier for code formatting
- ESLint with Prettier integration

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts Vite dev server with Hot Module Replacement (HMR). Changes to `.tsx` and `.scss` files will hot-reload automatically.

### Build for Production
```bash
npm run build
```
Runs TypeScript type-checking (`tsc -b`) followed by Vite build. Both must succeed for a valid build.

### Lint Code
```bash
npm run lint
```
Runs ESLint on all TypeScript/TSX files. The configuration enforces React Hooks rules, React Refresh best practices, and Prettier formatting.

### Format Code
```bash
npm run format
```
Formats all TypeScript, TSX, and SCSS files using Prettier.

```bash
npm run format:check
```
Checks if all files are formatted correctly without making changes.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing before deployment.

## Architecture

### State Management with MobX
The project uses MobX for reactive state management:
- Stores are located in `src/stores/`
- Components use the `observer` HOC from `mobx-react-lite` to react to state changes
- Example: `ThemeStore` manages light/dark theme switching with localStorage persistence

When creating new stores:
1. Use `makeAutoObservable()` for simple stores
2. Export a singleton instance for global stores
3. Wrap components with `observer()` to make them reactive

### Styling with SCSS
- Global styles: `src/index.scss` (theme variables, CSS custom properties)
- Component styles: `src/App.scss` (layout, sidebar, pages)
- Theme colors use CSS custom properties that switch between light/dark modes
- Purple-to-green gradient theme: use `--gradient-start` and `--gradient-end` CSS variables

### TypeScript Configuration
The project uses TypeScript project references with two separate configs:
- `tsconfig.app.json` - Application source code configuration (uses `verbatimModuleSyntax`)
- `tsconfig.node.json` - Node/build tooling configuration
- `tsconfig.json` - Root config that references both

**Important**: Use type-only imports for types when needed: `import type { TypeName } from 'module'`

### Project Structure
```
src/
├── main.tsx           # Application entry point
├── App.tsx            # Main app component with routing logic
├── App.scss           # Main styles (layout, sidebar, pages)
├── index.scss         # Global styles and theme variables
├── components/        # Reusable components
│   ├── Layout.tsx     # Main layout with sidebar
│   └── Sidebar.tsx    # Navigation sidebar with theme toggle
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── Workouts.tsx
│   ├── Analytics.tsx
│   ├── Calories.tsx
│   └── Settings.tsx
├── stores/            # MobX stores
│   └── ThemeStore.ts  # Theme management store
└── assets/            # Static assets
```

### ESLint and Prettier Configuration
ESLint is configured in `eslint.config.js` using the new flat config format with:
- TypeScript ESLint recommended rules
- React Hooks plugin (enforces hooks rules)
- React Refresh plugin (ensures HMR compatibility)
- Prettier integration (eslint-plugin-prettier)

Prettier configuration in `.prettierrc`:
- Single quotes, no semicolons
- 2 space indentation, 100 char line width
- Trailing commas in ES5 style

## Vite Configuration

Uses `@vitejs/plugin-react` for Fast Refresh. The React Compiler is not enabled for better dev performance.
