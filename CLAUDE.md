# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playout is a Next.js application for organizing offline study meetups and events. It's a Japanese platform ("オフラインで集まる勉强会ぷらっとフォーム") that displays events on a map interface and allows GitHub OAuth authentication.

## Development Commands

- `pnpm dev` - Start the Next.js development server
- `next` - Run Next.js in development mode (aliased as `pnpm dev`)

## Architecture

### Core Technologies
- **Next.js 15** with App Router structure
- **React 19** with TypeScript
- **Supabase** for authentication and backend services
- **Jotai** for state management (user account state)
- **React-Leaflet** for interactive maps using Japanese GSI (国土地理院) tiles
- Static export configuration (`output: "export"`)

### Key Components
- **Authentication**: GitHub OAuth via Supabase (`components/auth.tsx`)
  - User menu with avatar and sign out functionality
  - Modal-based sign in dialog
- **Map Integration**: Interactive map showing event locations (`components/map.tsx`)
  - Uses Japanese national geographic survey tiles
  - Displays event markers with popups
- **State Management**: Single atom for user account state (`store/index.ts`)

### Project Structure
- `app/` - Next.js App Router pages
- `components/` - Reusable React components organized by category
- `store/` - Jotai atoms for global state
- `utils/` - Utility functions (Supabase client)
- `constants/` - Static data (event list)

### Environment Requirements
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Styling
- Uses inline styles throughout the codebase
- Japanese M_PLUS_1 Google Font
- Blue theme color: `#2792c3`