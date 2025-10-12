# MangaDex App

Next.js 15 application for browsing manga via the MangaDex API with Supabase-backed authentication, personal libraries, and a responsive UI tailored for desktop and mobile.

## Features
- Browse curated collections: recent additions, popular titles, search with advanced filters.
- View detailed manga pages including metadata, chapter feeds, and cover art.
- Manage a personal library with custom reading statuses via Supabase.
- Auth flows for login, password recovery, and profile settings.
- Component library powered by Tailwind CSS, HeroUI, and Storybook for rapid UI iteration.

## Tech Stack
- Framework: Next.js 15 (App Router) with React 19 and TypeScript.
- Styling: Tailwind CSS, clsx, tailwind-merge.
- Data & State: TanStack Query, Zustand, React Hook Form, Zod.
- Backend integrations: Supabase auth/storage helpers, MangaDex REST API consumed through Next.js API proxy routes.
- Tooling: ESLint, Vitest, Playwright, Storybook.

## Getting Started

### Prerequisites
- Node.js 18.18+ (recommended 20+) and npm 9+.
- A Supabase project with email/password auth enabled.
- MangaDex account if you plan to exercise authenticated endpoints (optional, the public API suffices for browsing).

### Installation
```bash
git clone https://github.com/your-org/mangadex-app.git
cd mangadex-app
npm install
```

### Environment Variables
Create a `.env.local` based on `.env.example`:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (`https://...supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public API key. |
| `NEXT_PUBLIC_USE_IMAGE_PROXY` | `true` to proxy MangaDex images through the built-in API route (recommended for production on Vercel), `false` to load images directly in local development. |

> The proxies under `src/app/api/*` rely on these variables to forward secure requests to MangaDex and Supabase.

### Development
```bash
npm run dev
```
Visit `http://localhost:3000`. Hot module replacement is enabled by default via Turbopack.

### Linting & Testing
```bash
npm run lint          # ESLint (Next.js config)
npx vitest            # Unit tests (JSDOM by default)
npx vitest --coverage # Coverage report
npx playwright test   # E2E tests (configure browsers first with `npx playwright install`)
npm run storybook     # Component development sandbox on http://localhost:6006
```

### Production Build
```bash
npm run build
npm run start
```
When deploying to Vercel, the `vercel-build` script installs dependencies with legacy peer rules before building.

## Project Structure
```
src/
  app/                    # App Router pages, layouts, API routes
  components/             # Reusable UI components & layout blocks
  hooks/                  # Custom React hooks (data fetching, UI state)
  services/               # API client wrappers (e.g., MangaDex proxy)
  store/                  # Zustand stores
  types/                  # Shared TypeScript definitions
  utils/                  # Helpers (Supabase actions, formatting, etc.)
```

Supabase-related logic lives under `src/utils/supabase`, while UI primitives (buttons, tabs, cards) are organized in `src/components/ui`.

## Development Workflow
1. Create a feature branch from `main`.
2. Implement changes with accompanying tests or Storybook stories whenever relevant.
3. Run `npm run lint` and applicable test suites.
4. Commit with conventional messages (e.g., `feat(library): add reading progress indicator`).
5. Open a pull request; include screenshots or Storybook links for UI updates.

## Deployment Notes
- The image proxy API route (`/api/image-proxy`) avoids CORS issues and improves caching on Vercel.
- To use Supabase server-side helpers, ensure the project URL and service role key (if needed) are provided through Vercel environment variables.
- Configure `NEXT_PUBLIC_USE_IMAGE_PROXY=true` in production to route images through the proxy.

## Contributing
Issues and pull requests are welcome. Please describe any Supabase schema changes or new environment variables when contributing.

## License
This project is released under the MIT License. See `LICENSE` for details.
