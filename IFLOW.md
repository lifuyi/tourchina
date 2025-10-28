# Project Overview

This project is a Next.js-based AI SaaS boilerplate called "ShipAny Template One". It's designed to help developers quickly launch AI-powered SaaS applications by providing a comprehensive set of pre-built templates, components, and infrastructure.

## Key Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Authentication**: NextAuth.js with support for Google, GitHub, and Google One Tap
- **Database**: Drizzle ORM with PostgreSQL
- **Internationalization**: next-intl
- **Documentation**: Fumadocs
- **Deployment**: Vercel (primary), Cloudflare (alternative)

## Architecture

The project follows a standard Next.js application structure with the following key directories:

- `src/app`: Contains the main application pages, layout, and global styles.
- `src/components`: Reusable UI components.
- `src/i18n`: Internationalization configuration and content.
- `src/auth`: Authentication logic and configuration.
- `src/db`: Database schema and configuration using Drizzle ORM.
- `src/services`: Business logic and service layer.
- `src/lib`: Utility functions and helper modules.
- `content/docs`: Documentation content in MDX format.

# Customization

The project is highly customizable:

- **Theme**: Customize the theme in `src/app/theme.css`.
- **Landing Page Content**: Modify content in `src/i18n/pages/landing`.
- **Internationalization**: Update messages in `src/i18n/messages`.

# Building and Running

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

## Production

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## Database Management

- Generate migrations:
  ```bash
  pnpm db:generate
  ```

- Apply migrations:
  ```bash
  pnpm db:migrate
  ```

- Open database studio:
  ```bash
  pnpm db:studio
  ```

## Deployment

### Vercel
Deploy directly to Vercel using the provided button in the README.

### Cloudflare
1. Switch to the `cloudflare` branch:
   ```bash
   git checkout cloudflare
   ```
2. Customize environment variables in `.env.production` and `wrangler.toml`.
3. Deploy:
   ```bash
   pnpm run cf:deploy
   ```

# Development Conventions

- **Code Style**: The project uses ESLint for code linting and formatting.
- **Component Structure**: Components are organized in `src/components` with a focus on reusability.
- **Internationalization**: Content is managed through JSON files in `src/i18n` to support multiple languages.
- **Database Schema**: Defined in `src/db/schema.ts` using Drizzle ORM.
- **Environment Variables**: Managed through `.env` files, with examples in `.env.example`.

# Key Features

- Ready-to-use AI SaaS templates
- Authentication with Google, GitHub, and Google One Tap
- Payment integration with Stripe
- SEO-friendly structure with i18n support
- One-click deployment to Vercel or Cloudflare
- Integrated analytics (Google Analytics, Search Console)
- Pre-configured AI infrastructure with credits system