# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build → .next/  (or out/ for static export)
npm run start    # Serve production build locally
```

No linter or test suite is configured.

## Architecture

### Next.js App Router structure

```
app/
  layout.jsx      # Root layout — html/body, global CSS import, metadata
  page.jsx        # Server Component — thin shell that renders <TodoApp />
  globals.css     # All styles (reset + every component class, CSS custom properties)
components/
  TodoApp.jsx     # 'use client' boundary — calls useTodos, wires props to children
  TodoInput.jsx   # Controlled form input
  TodoItem.jsx    # Single todo row with inline-edit (double-click) local state
  TodoList.jsx    # Renders TodoItem list or per-filter empty states
  FilterBar.jsx   # All / 진행 중 / 완료 tab switcher
  TodoFooter.jsx  # Progress bar + item count + clear-completed
hooks/
  useTodos.js     # All todo state — loaded lazily from localStorage after mount
```

### Key architectural decisions

**Client boundary**: Only `TodoApp.jsx` carries `'use client'`. `app/page.jsx` is a Server Component; child components inherit the client context without needing their own directive.

**SSR-safe localStorage**: `useTodos` initialises state as `[]` and loads from `localStorage` inside a `useEffect`. A second `loaded` flag prevents the save effect from overwriting storage with `[]` before the load completes.

**Todo shape**: `{ id: number (Date.now()), text: string, completed: boolean }`

**Styling**: Single flat CSS file (`app/globals.css`) with CSS custom properties. No CSS Modules or CSS-in-JS.

### Dual deployment

| Platform | Config | Trigger |
|----------|--------|---------|
| Vercel | Default (no env var) | `vercel --prod` |
| GitHub Pages | `GITHUB_PAGES=true` → `output: 'export'`, `basePath: '/todo-app'` | push to `master` |

`next.config.js` switches between normal Next.js mode (Vercel) and static export mode (GitHub Pages) via the `GITHUB_PAGES` environment variable. GitHub Actions sets this variable and uploads the `out/` directory.
