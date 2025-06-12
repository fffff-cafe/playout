# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playout is a Next.js application for organizing offline study meetups and events. It's a Japanese platform ("オフラインで集まる勉强会ぷらっとフォーム") that displays events on a map interface and allows GitHub OAuth authentication.

## Development Commands

- `pnpm dev` - Start the Next.js development server
- `pnpm run build` - Build the application for production
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx tsx prisma/seed.ts` - Seed database with initial event data

## Architecture

### Core Technologies
- **Next.js 15** with App Router structure
- **React 19** with TypeScript
- **Prisma** with SQLite database for event storage
- **Supabase** for GitHub OAuth authentication
- **Jotai** for state management (user account state)
- **React-Leaflet** for interactive maps using Japanese GSI (国土地理院) tiles
- Static export configuration (`output: "export"`)

### Key Components
- **Database**: SQLite with Prisma ORM (`utils/database.ts`, `prisma/schema.prisma`)
  - Event model with location data, ratings, and metadata
  - Seed script for initial data migration
- **Authentication**: GitHub OAuth via Supabase (`components/auth.tsx`)
  - User menu with avatar and sign out functionality
  - Modal-based sign in dialog
- **Map Integration**: Interactive map showing event locations (`components/map.tsx`)
  - Uses Japanese national geographic survey tiles
  - Displays event markers with popups
- **State Management**: Single atom for user account state (`store/index.ts`)

### Project Structure
- `app/` - Next.js App Router pages (server components for data fetching)
- `components/` - Reusable React components (client components for interactivity)
- `prisma/` - Database schema and seed scripts
- `store/` - Jotai atoms for global state
- `utils/` - Utility functions (database client, Supabase client)
- `constants/` - Legacy static data (used for seeding)

### Environment Requirements
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Styling
- Uses inline styles throughout the codebase
- Japanese M_PLUS_1 Google Font
- Blue theme color: `#2792c3`