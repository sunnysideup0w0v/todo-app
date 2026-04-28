# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Serve the production build locally
```

No linter or test suite is configured.

## Architecture

All state lives in `src/hooks/useTodos.js`. The hook manages a `todos` array and a `filter` string, syncs to `localStorage` under the key `vibe-todos`, and exposes action functions (`addTodo`, `toggleTodo`, `deleteTodo`, `editTodo`, `clearCompleted`). It derives `filteredTodos`, `activeCount`, and `completedCount` and returns everything to `App.jsx`.

`App.jsx` is a thin shell: it calls `useTodos` and passes props down to four presentational components in `src/components/`. No component manages its own todo state — only `TodoItem` holds ephemeral local state for the inline-edit field.

**Data flow:**
```
useTodos (state + localStorage)
  └── App.jsx (wires props)
        ├── TodoInput   → onAdd
        ├── FilterBar   → filter, onFilterChange, counts
        ├── TodoList    → todos[], filter (for empty-state messaging), onToggle/Delete/Edit
        │     └── TodoItem  → onToggle, onDelete, onEdit; local editing state
        └── TodoFooter  → counts, progress bar (%), onClearCompleted
```

**Todo shape:** `{ id: number (Date.now()), text: string, completed: boolean }`

All styles are plain CSS in `src/App.css` using CSS custom properties (`--primary`, `--success`, etc.). No CSS framework or CSS Modules — class names are flat and scoped by convention.
