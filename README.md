# Finance Frontend Monorepo

Monorepo with Turborepo, containing Next.js web app, Expo mobile app, and shared TypeScript types.

## Structure

- apps/web — Next.js 14, Tailwind, dark mode, TanStack Query
- apps/mobile — Expo (React Native), React Navigation, TanStack Query
- packages/shared — shared TypeScript types

## Getting started

1. Set environment variables:
- Web: `NEXT_PUBLIC_API_BASE=https://your-backend.example.com`
- Mobile: set `EXPO_PUBLIC_API_BASE` in your Expo env (e.g., `app.config`, shell, or `.env`)

2. Install deps:
```
npm install
```

3. Dev:
```
npm run dev
```

### Scripts
- `npm run dev` — runs dev pipelines
- `npm run build` — builds all
- `npm run lint` — lints
- `npm run clean` — cleans

