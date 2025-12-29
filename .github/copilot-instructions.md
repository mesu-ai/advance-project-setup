# SaRa Admin Panel - AI Agent Instructions

## Project Overview

Modern e-commerce admin dashboard built with **React 19** + **TypeScript** + **Vite 7** + **Tailwind CSS 4** + **Redux Toolkit 2.9** + **React Router v7**.

## Architecture Patterns

### State Management & API Communication

- **RTK Query Pattern**: All API endpoints use `baseApi.injectEndpoints()` (see [baseApi.ts](../src/store/api/baseApi.ts))
  - Example: [productEndpoints.ts](../src/store/api/endpoints/productEndpoints.ts), [authEndpoints.ts](../src/store/api/endpoints/authEndpoints.ts)
  - Always use `providesTags` for cache invalidation
  - Base URL: `http://localhost:4000/api/v1`
- **Redux Slices**: Use `createSlice()` with typed actions (see [authSlice.ts](../src/store/slices/auth/authSlice.ts))
- **Custom Hooks**: Use `useAppDispatch`, `useAppSelector`, `useAuth` from [hooks/useAuth.tsx](../src/hooks/useAuth.tsx) - never import directly from react-redux

### Authentication Architecture

**Dual-token system** with sophisticated refresh logic:

- **Access Token**: 15-min, memory-only (Redux state), auto-refreshed when expiring <5 mins
- **Refresh Token**: 7-day, HTTP-only cookie
- **Session Persistence**: User info in `localStorage`, tokens never in localStorage
- **Auto-refresh flows**:
  1. Page reload → `auth.middleware.ts` calls refresh if user exists but no accessToken
  2. API call → `baseQuery` proactively refreshes if token expires <5 mins
  3. 401 error → `baseQuery` fallback refresh
- **Single-flight refresh**: `ensureRefreshed()` prevents concurrent refresh requests
- **Auth Middleware**: [auth.middleware.ts](../src/middleware/auth.middleware.ts) handles route protection, permission checks, redirects with `callbackUrl`

### Routing

- **Lazy-loaded routes**: All pages use `lazy()` (see [routes.ts](../src/routes/routes.ts))
- **Route middleware**: Add custom middleware via route config (e.g., `authMiddleware`)
- **Permission-based access**: Routes check `user.permissions` against `routePermission()` ([utils/permission.ts](../src/utils/permission.ts))
- **Public routes**: Defined in `publicRoutes` array - auth middleware skips these

### Component Structure

- **Atomic Design**: atoms → molecules → organisms → templates
  - atoms: [Button.tsx](../src/components/atoms/Button.tsx), Input.tsx, Select.tsx
  - molecules: forms, SearchBar.tsx, Pagination.tsx
  - organisms: DataTable.tsx, Modal/
  - templates: PageSection.tsx
- **Button variants**: Use predefined variants (`add`, `edit`, `delete`, `update`, `cancel`, `view`) with matching Tailwind classes
- **Layouts**: `RootLayout` (authenticated), `AuthLayout` (login/register), both use `ErrorBoundary`

### Feature Organization

- **Feature folders**: [features/](../src/features/) contains domain logic (products/, orders/, auth/)
  - Structure: `types.ts`, `components/`, `hooks/`
- **Pages**: [pages/](../src/pages/) contains route components, organized by domain
  - Example: `products/create/`, `products/pending/`, `access-control/employees/`

## Development Workflows

### Running the Project

```bash
npm run dev              # Start dev server (port 3010)
npm run build            # Type-check + build
npm run preview          # Preview production build
npm run test             # Run Vitest tests
npm run test:coverage    # Generate coverage report
npm run lint             # ESLint
npm run format           # Prettier
```

### Path Aliases

- **Always use `@/` imports**: `import { useAuth } from '@/hooks/useAuth'`
- Configured in [vite.config.ts](../vite.config.ts): `@` → `./src`

### Git Workflow

- **Conventional commits required**: Enforced via Husky + Commitlint
- **Pre-commit hooks**: Lint-staged runs Prettier + ESLint on staged files
- Commit format: `type(scope): message` (e.g., `feat(auth): add token refresh`)

## Critical Conventions

### TypeScript

- **Strict typing**: Use custom types from [types/](../src/types/) (auth.ts, employee.ts, role.ts, route.ts)
- **Type suffixes**: Use `T` suffix for types (e.g., `UserAuthSliceT`, `ButtonVariantT`)
- **No `any`**: Use proper types or `unknown`

### Styling

- **Tailwind utility classes**: Never write custom CSS unless absolutely necessary
- **Responsive-first**: Use mobile-first breakpoints (`sm:`, `md:`, `lg:`)
- **Theme colors**: Use semantic colors from theme (e.g., `bg-primary-500`, `text-danger-600`)

### Error Handling

- **Error Boundaries**: Wrap route trees with `ErrorBoundary` component
- **API errors**: Handle via RTK Query's `error` response, use [useApiError.tsx](../src/hooks/useApiError.tsx)
- **Toast notifications**: Use `react-hot-toast` for user feedback

### Testing

- **Vitest + React Testing Library**: Configured in [vite.config.ts](../vite.config.ts)
- **Setup file**: [setupTests.ts](../src/setupTests.ts)
- **Test files**: `**/*.{test,spec}.{ts,tsx}` in src/

## Common Patterns

### Adding a New API Endpoint

1. Create endpoint file in [store/api/endpoints/](../src/store/api/endpoints/)
2. Use `baseApi.injectEndpoints()` pattern
3. Add `providesTags` for cache management
4. Export generated hooks (e.g., `useGetProductsQuery`)

### Adding a Protected Route

1. Add lazy-loaded component to [routes.ts](../src/routes/routes.ts)
2. Add to `appRoutes` array with proper path
3. Define permission in [utils/permission.ts](../src/utils/permission.ts) if needed
4. Middleware automatically enforces auth + permissions

### Creating a New Component

1. Place in appropriate atomic layer ([components/](../src/components/))
2. Use TypeScript with proper prop interfaces
3. Follow existing naming: `ComponentName.tsx`, export as default
4. Use Tailwind for all styling

## Anti-Patterns to Avoid

- ❌ Never store tokens in `localStorage` - use Redux state + HTTP-only cookies
- ❌ Don't import `useDispatch`/`useSelector` from react-redux - use custom hooks
- ❌ Don't hardcode API URLs - use base URL from RTK Query config
- ❌ Don't bypass middleware for protected routes
- ❌ Don't create duplicate API slice files - inject into `baseApi`
- ❌ Don't use inline styles or CSS modules - use Tailwind
