# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
@AGENTS.md

## Project Overview

DevMGMT.msc is a device lending management system built with Next.js 16.1.6, TypeScript, PostgreSQL, Prisma ORM, and Better Auth for authentication. The application allows tracking of equipment lent to borrowers with role-based access control (admin vs regular users).

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (runs on port 3000)
pnpm run dev

# Build for production
pnpm run build

# Start production server (runs on port 3004)
pnpm start

# Run linter
pnpm run lint

# Database operations
pnpm run db-fix         # Generate Prisma client and push schema changes
pnpm run db-seed        # Seed database
pnpm run db-see         # Open Prisma Studio
pnpm run db-reset       # Reset database (force reset)
```

## Architecture

### Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Better Auth with Google OAuth and email/password
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui components
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Toast Notifications**: Sonner

### Directory Structure

```
app/
├── (auth)/              # Authentication pages (sign-in, sign-up)
├── (back-end)/          # Protected routes requiring authentication
│   ├── admin/           # Admin-only routes
│   │   ├── users/       # User management
│   │   └── page.tsx     # Admin dashboard
│   └── dashboard/       # User dashboard
│       ├── borrowers/   # Borrower management
│       ├── account/     # User account settings
│       └── item/[id]/   # Individual equipment details
├── api/                 # API routes
│   └── auth/[...all]/   # Better Auth API handler
└── actions/            # Server actions for data mutations

components/
├── admin/              # Admin-specific components
├── dashboard/          # Dashboard components
├── landing/            # Landing page components
└── ui/                 # Reusable UI components (shadcn/ui)

lib/
├── auth.ts            # Better Auth configuration
├── auth-client.ts     # Auth client utilities
├── prisma.ts          # Prisma client instance
└── utils.ts           # Utility functions

prisma/
└── schema.prisma       # Database schema
```

### Database Schema

Key entities:

- **User**: Application users with roles (user/admin), ban system
- **Equipment**: Devices available for lending
- **Borrower**: People/entities borrowing equipment
- **LendingHistory**: Tracks borrowing/returning of equipment
- **Session/Account**: Authentication data for Better Auth

### Authentication Flow

Better Auth handles authentication with:

- Email/password login
- Google OAuth
- Session management
- Admin plugin for user management features

Auth configuration in `lib/auth.ts` with Prisma adapter.

### Component Patterns

- Server components for data fetching (dashboard pages)
- Client components for interactivity (forms, modals)
- Actions in `app/actions/` for data mutations
- Reusable UI components from shadcn/ui in `components/ui/`
- Theme support with next-themes

### Key Features

1. **Equipment Management**: Register, edit, track lent equipment
2. **Borrower Management**: Manage borrower information
3. **Lending Workflow**: Check out/in equipment with history tracking
4. **Admin Features**: User management (ban/unban, role changes), system stats
5. **Location Tracking**: Basic location reporting via API

### Environment Variables

Required environment variables (see `.env`):

- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET` & `BETTER_AUTH_URL`: Auth configuration
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth
- `APP_NAME`: Application name (defaults to DevMGMT.msc)

All API keys and secrets should use Prisma's secure connection string format.
