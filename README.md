# Kanban Project Manager

<img width="2493" height="1308" alt="Kanban" src="https://github.com/user-attachments/assets/5d8d49bd-583c-4164-866f-d5568960416c" />

A single-board Kanban app for tracking work across five columns. Client-rendered
Next.js MVP with drag-and-drop, no backend and no persistence: the board loads
with dummy data and resets on refresh.

## Features

- One board with five columns, each renamable by clicking its title
- Cards with a title and details; click a card to open its detail modal
- Drag and drop to reorder within a column or move between columns
- Add a card to any column; delete a card with the trash button on the card
- Live card count per column

Deliberately out of scope: multiple boards, archive, search, filtering,
user accounts.

## Stack

- Next.js 16 (App Router, client-rendered board) and React 19
- TypeScript
- Tailwind CSS v4
- dnd-kit for drag and drop
- Heroicons
- Vitest and Testing Library for unit tests, Playwright for end-to-end tests

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

Run from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Unit tests (Vitest) |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run e2e` | End-to-end tests (Playwright, starts the dev server itself) |

## Structure

```
frontend/
  app/          Layout, page shell and global styles
  components/   Board, Column, Card, SortableCard, AddCardForm, CardModal
  hooks/        useBoard - reducer holding all board state
  lib/          Dummy data for the initial board
  types/        Card, Column and BoardState types
  __tests__/    Unit tests
  e2e/          Playwright specs
```

Board state lives in a single `useReducer` inside `hooks/useBoard.ts`, which
owns renaming columns and adding, deleting and moving cards. Components stay
presentational.

## Colours

Defined as Tailwind theme tokens in `app/globals.css`.

| Token | Hex | Use |
| --- | --- | --- |
| Accent Yellow | `#ecad0a` | Accent lines, highlights |
| Blue Primary | `#209dd7` | Links, focus states, drop targets |
| Purple Secondary | `#753991` | Submit buttons, important actions |
| Dark Navy | `#032147` | Background, headers |
| Gray Text | `#888888` | Supporting text, labels |
