# 🌐 SaRa Admin Panel

**SaRa Admin Panel** is a modern, production-grade administrative dashboard built for e-commerce operations.  
It provides powerful management capabilities for products, orders, users, authentication, and analytics — optimized for performance, scalability, and developer experience.

---

## 🚀 Tech Stack

| Layer                  | Technology                                                                     | Purpose                                                    |
| ---------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Latest React with strongly typed UI components             |
| **Build Tool**         | [Vite 7](https://vitejs.dev/)                                                  | Lightning-fast HMR & optimized production builds           |
| **Styling**            | [Tailwind CSS 4](https://tailwindcss.com/)                                     | Utility-first responsive design with Vite plugin           |
| **State Management**   | [Redux Toolkit 2.9](https://redux-toolkit.js.org/)                             | Centralized store with RTK Query for API caching           |
| **Data Fetching**      | [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)                   | Powerful data fetching with automatic cache invalidation   |
| **Routing**            | [React Router v7](https://reactrouter.com/)                                    | File-based routing with loaders, actions & middleware      |
| **Authentication**     | JWT + localStorage                                                             | Secure token-based auth with automatic session persistence |
| **Code Quality**       | ESLint + Prettier + Husky + Commitlint                                         | Automated code formatting & conventional commits           |
| **TypeScript**         | TypeScript 5.9                                                                 | Full type safety across the application                    |

---

## 🧩 Features

### 🔐 Authentication & Authorization

- **JWT-based Authentication:** Dual-token system (access + refresh tokens)
- **Access Token:** Short-lived (15 min), stored in Redux memory only
- **Refresh Token:** Long-lived (7 days), stored in HTTP-only cookie
- **Auto Token Refresh:** Automatic revalidation on 401 errors
- **Page Reload Persistence:** Seamless token refresh on page reload
- **Session Persistence:** User info in localStorage, tokens in memory/cookies
- **Protected Routes:** Custom middleware for route-level access control
- **Auth State Management:** Redux Toolkit slice with typed hooks
- **Automatic Redirects:** Callback URL support for seamless navigation
- **Security-First:** XSS protection, CSRF protection, minimal attack surface

### 📦 Product Management

- **Product Listing:** View all products with filtering and pagination
- **Product Creation:** Add new products with detailed information
- **Status Management:** Separate views for pending, approved, and rejected products
- **Low Stock Alerts:** Monitor inventory levels with dedicated low-stock page
- **Product Actions:** Edit, delete, approve/reject products

### 📋 Order Management

- **Order Tracking:** View and manage customer orders
- **Status Updates:** Change order statuses and track fulfillment
- **Order Details:** Comprehensive order information display

### 🎨 UI & Experience

- **Atomic Design Pattern:** Components organized as atoms, molecules, organisms, templates
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Lazy Loading:** Code-splitting for optimal performance
- **Error Boundaries:** Graceful error handling with fallback UI
- **Consistent Layouts:** RootLayout and AuthLayout for different page types

### ⚙️ Developer Experience

- **Strict TypeScript:** Full type safety with custom types and interfaces
- **RTK Query Architecture:** Single base API with injected endpoints for scalability
- **Tag-Based Cache Invalidation:** Automatic refetching on mutations
- **Custom Hooks:** Reusable `useAuth`, `useAppDispatch`, `useAppSelector`
- **Path Aliases:** Clean imports with `@/` alias
- **Git Hooks:** Pre-commit linting and commit message validation
- **Hot Module Replacement:** Instant feedback during development

---

## 🏗️ Project Structure

```
sara-admin-panel/
├── src/
│   ├── actions/                    # Server actions (if using React Router actions)
│   ├── apis/
│   │   ├── config/
│   │   │   └── baseURL.ts         # API base URL configuration
│   │   └── services/              # Legacy API services
│   │       ├── account/
│   │       └── auth/
│   │
│   ├── assets/                    # Static assets
│   │   ├── data/                  # JSON data, mock data
│   │   ├── fonts/                 # Custom fonts
│   │   ├── images/                # Images
│   │   └── svg/                   # SVG icons
│   │
│   ├── components/                # Atomic Design Pattern
│   │   ├── atoms/                 # Basic building blocks
│   │   ├── molecules/             # Simple component groups
│   │   │   └── LogoutButton.tsx
│   │   ├── organisms/             # Complex components
│   │   ├── templates/             # Page templates
│   │   ├── ui/                    # Shared UI components
│   │   └── feedback/              # Error handling components
│   │       ├── ErrorBoundary.tsx
│   │       └── FallbackError.tsx
│   │
│   ├── context/                   # React Context (legacy, migrating to Redux)
│   │   └── AuthContext.tsx
│   │
│   ├── features/                  # Feature-based modules
│   │   ├── auth/                  # Auth feature logic
│   │   ├── orders/                # Order management
│   │   ├── products/              # Product management
│   │   │   ├── types.ts
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── store/
│   │   └── reports/               # Reporting features
│   │
│   ├── hooks/                     # Custom React hooks
│   │   └── useAuth.tsx            # Authentication hooks
│   │
│   ├── layout/                    # Layout components
│   │   ├── AuthLayout.tsx         # Layout for auth pages
│   │   └── RootLayout.tsx         # Main app layout
│   │
│   ├── middleware/                # Route middleware
│   │   └── auth.middleware.ts     # Authentication middleware
│   │
│   ├── pages/                     # Page components (lazy-loaded)
│   │   ├── home/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot/
│   │   ├── orders/
│   │   └── products/
│   │       ├── index.tsx          # Products list
│   │       ├── create/            # Create product
│   │       ├── pending/           # Pending products
│   │       ├── approved/          # Approved products
│   │       ├── rejected/          # Rejected products
│   │       └── low-stock/         # Low stock products
│   │
│   ├── providers/                 # React providers
│   │   ├── AuthProvider.tsx
│   │   └── ThemeProvider.tsx
│   │
│   ├── routes/                    # Route configuration
│   │   ├── index.ts               # Main router setup
│   │   ├── app.routes.ts          # App routes definition
│   │   ├── sidebar.routes.ts      # Sidebar navigation config
│   │   └── types.ts               # Route types
│   │
│   ├── store/                     # Redux store
│   │   ├── store.ts               # Store configuration
│   │   ├── api/
│   │   │   ├── baseApi.ts         # Base RTK Query API
│   │   │   └── endpoints/
│   │   │       └── authEndpoints.ts # Auth API endpoints
│   │   └── slices/
│   │       ├── auth/
│   │       │   └── authSlice.ts   # Auth state slice
│   │       └── product/
│   │           └── prouctSlice.ts # Product state slice
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── index.ts
│   │   └── auth.ts                # Auth types
│   │
│   ├── utils/                     # Utility functions
│   │   └── isEmpty.ts
│   │
│   ├── App.tsx                    # Root App component
│   ├── main.tsx                   # App entry point
│   ├── index.css                  # Global styles
│   └── sessions.server.ts         # Server session handling
│
├── public/                        # Public static files
├── .husky/                        # Git hooks
├── commitlint.config.ts           # Commit message linting
├── eslint.config.js               # ESLint configuration
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite configuration
└── package.json                   # Dependencies & scripts
```

---

## 🔧 Getting Started

### Prerequisites

- **Node.js:** v18+ (recommended v20+)
- **npm:** v9+ or **pnpm**/**yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd sara-admin-panel

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
MODE="development"
VITE_API_BASE_URL="http://localhost:4000/api/v1"
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Build
npm run build            # TypeScript check + production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript compiler check

# Git Hooks
npm run prepare          # Install Husky hooks
npm run commitlint       # Validate commit message
```

---

## 🔑 Key Architecture Decisions

### RTK Query Single API Pattern

Instead of creating separate APIs for each feature, we use **one base API with injected endpoints**:

```typescript
// ✅ Single base API
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1' }),
  tagTypes: ['Auth', 'Product', 'Order'], // For cache invalidation
  endpoints: () => ({}),
});

// ✅ Inject endpoints from separate files
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      /* ... */
    }),
  }),
});
```

**Benefits:**

- Shared cache across all features
- Cross-feature cache invalidation (e.g., creating an order invalidates product stock)
- Single middleware setup
- Scales to 100+ endpoints

### Tag-Based Cache Invalidation

Automatic refetching without manual `refetch()` calls:

```typescript
// Query provides tags
getProducts: build.query({
  providesTags: [{ type: 'Product', id: 'LIST' }],
}),

// Mutation invalidates tags → automatic refetch!
createProduct: build.mutation({
  invalidatesTags: [{ type: 'Product', id: 'LIST' }],
}),
```

### Authentication Flow

1. **Login:** User submits credentials → API returns user + tokens
2. **Storage:** Save to localStorage (user, accessToken, refreshToken)
3. **Redux:** Update auth slice with user data
4. **Persistence:** Store preloads auth state from localStorage on app init
5. **Middleware:** `authMiddleware` checks auth status and redirects if needed
6. **Logout:** Clear Redux state + localStorage + redirect to login

### Route Protection

```typescript
// middleware/auth.middleware.ts
export async function authMiddleware({ request }: { request: Request }) {
  const isAuthenticated = store.getState().auth.isAuthenticated;

  if (!isPublic && !isAuthenticated) {
    throw redirect('/auth/login?callbackUrl=' + encodeURIComponent(pathname));
  }
}
```

### Typed Redux Hooks

```typescript
// Instead of plain useDispatch/useSelector
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Usage - full TypeScript autocomplete!
const { user, isAuthenticated } = useAppSelector((state) => state.auth);
```

---

## 📦 State Management

### Redux Store Structure

```typescript
store/
├── store.ts                    # Store configuration with preloaded state
├── api/
│   ├── baseApi.ts             # Single RTK Query API
│   └── endpoints/
│       ├── authEndpoints.ts   # Auth API (login, register, logout)
│       ├── productEndpoints.ts # Product CRUD operations
│       └── orderEndpoints.ts   # Order management
└── slices/
    └── auth/
        └── authSlice.ts       # Auth state (user, isAuthenticated)
```

### Local Storage Persistence

- **On Login:** Save user + tokens to localStorage
- **On App Load:** Restore auth state from localStorage
- **On Logout:** Clear all localStorage items
- **Security:** Never store sensitive data in Redux state

---

## 🎨 Component Architecture

### Atomic Design Pattern

| Level         | Purpose               | Examples                           |
| ------------- | --------------------- | ---------------------------------- |
| **Atoms**     | Basic building blocks | Button, Input, Label, Icon         |
| **Molecules** | Simple combinations   | FormField, SearchBar, LogoutButton |
| **Organisms** | Complex components    | DataTable, ProductCard, OrderList  |
| **Templates** | Page layouts          | DashboardTemplate, AuthTemplate    |
| **Pages**     | Actual pages          | HomePage, LoginPage, ProductsPage  |

### Code Splitting

All pages are lazy-loaded for optimal performance:

```typescript
const Home = lazy(() => import('../pages/home/index'));
const Products = lazy(() => import('../pages/products/index'));
```

---

## 🚦 Routing

### Route Structure

```
/                           → Home (protected)
/auth/login                 → Login page
/auth/register              → Register page
/auth/forgot                → Forgot password
/products                   → Products list (protected)
/products/create            → Create product (protected)
/products/pending           → Pending products (protected)
/products/approved          → Approved products (protected)
/products/rejected          → Rejected products (protected)
/products/low-stock         → Low stock alerts (protected)
/orders                     → Orders list (protected)
/contact                    → Contact page (protected)
```

### Middleware System

Custom middleware runs before route components:

```typescript
{
  path: '/',
  Component: RootLayout,
  middleware: [authMiddleware], // ✅ Checks auth before rendering
  children: appRoutes,
}
```

---

## 🔐 Authentication & Authorization System

### 🎯 Token Strategy: Dual-Token Architecture

We implement a **production-grade, security-first** authentication system using JWT tokens with automatic refresh capabilities.

#### Token Types

| Token Type        | Storage Location | Lifetime | Purpose                          | Security Level |
| ----------------- | ---------------- | -------- | -------------------------------- | -------------- |
| **Access Token**  | Redux (Memory)   | 15 min   | API authentication               | ⭐⭐⭐⭐⭐     |
| **Refresh Token** | HTTP-only Cookie | 7 days   | Obtain new access tokens         | ⭐⭐⭐⭐⭐     |
| **User Info**     | localStorage     | 7 days   | UI display, fast app rehydration | ⭐⭐⭐         |

---

### 🔄 Authentication Flows

#### 1️⃣ **Login Flow**

```typescript
// pages/login/index.tsx
const handleLogin = async (username, password) => {
  // 1. Call login endpoint with credentials
  const response = await login({
    username,
    password,
  }).unwrap();

  // 2. Backend sets refresh token in HTTP-only cookie (automatic)
  // Set-Cookie: refreshToken=xxx; HttpOnly; Secure; SameSite=Strict

  // 3. Dispatch Redux action with user + accessToken
  dispatch(
    loginSucceeded({
      user: response.data.userInfo,
      accessToken: response.data.accessToken,
    })
  );

  // 4. User saved to localStorage (for page reload)
  // AccessToken saved to Redux only (memory)

  // 5. Navigate to protected route
  navigate(callbackUrl || '/');
};
```

**What happens:**

- ✅ Backend returns: `{ success: true, data: { userInfo: {...}, accessToken: "..." } }`
- ✅ Backend sets HTTP-only cookie: `refreshToken=xxx`
- ✅ Redux stores: `{ user, accessToken, isAuthenticated: true }`
- ✅ localStorage stores: `{ user }` (for UI/reload)
- ✅ User redirected to protected route

---

#### 2️⃣ **API Request Flow with Auto-Refresh**

```typescript
// store/api/baseApi.ts
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // 1. Try original request with access token
  let result = await baseQuery(args, api, extraOptions);

  // 2. If 401 (token expired), refresh automatically
  if (result.error?.status === 401) {
    console.log('🔄 Access token expired, refreshing...');

    // 3. Call refresh endpoint (sends HTTP-only cookie automatically)
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        credentials: 'include', // ✅ Sends refresh token cookie
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // 4. Extract new access token
      const newAccessToken = refreshResult.data.data.accessToken;

      // 5. Update Redux with new token
      api.dispatch(
        tokenRefreshed({
          accessToken: newAccessToken,
        })
      );

      // 6. Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // 7. Refresh failed → logout user
      api.dispatch(loggedOut());
    }
  }

  return result;
};
```

**What happens:**

- ✅ User makes API call → 401 error
- ✅ System automatically calls `/auth/refresh`
- ✅ Refresh token sent via HTTP-only cookie
- ✅ New access token received and stored in Redux
- ✅ Original request retried with new token
- ✅ User doesn't notice anything! 🎉

---

#### 3️⃣ **Page Reload Flow**

```typescript
// hooks/useAuthInit.tsx
export function useAuthInit() {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    // Only refresh if user exists but no access token
    if (user && !accessToken) {
      console.log('🔄 Page reloaded, refreshing token...');

      refreshToken()
        .unwrap()
        .then((response) => {
          // Success: update access token
          dispatch(tokenRefreshed({
            accessToken: response.data.accessToken
          }));
        })
        .catch(() => {
          // Failed: logout user
          dispatch(loggedOut());
        });
    }
  }, [user, accessToken]);
}

// App.tsx
function AppContent() {
  useAuthInit(); // ✅ Calls refresh on page reload
  return <RouterProvider router={router} />;
}
```

**What happens on page reload (F5):**

1. ⚡ Redux state cleared (memory lost)
2. 📦 Store reads user from localStorage → `user !== null`
3. ✅ Middleware sees user exists → allows access (no redirect!)
4. 🔄 `useAuthInit` detects: `user exists but no accessToken`
5. 🌐 Calls `/auth/refresh` (HTTP-only cookie sent automatically)
6. 🎯 New access token received → stored in Redux
7. ✅ App fully authenticated without user noticing

---

#### 4️⃣ **Route Protection Flow**

```typescript
// middleware/auth.middleware.ts
export async function authMiddleware({ request }: { request: Request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Public routes (login, register, etc.)
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot'];
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublic) return null; // ✅ Allow public routes

  // Check authentication
  const { isAuthenticated, user } = store.getState().auth;
  const hasAuth = isAuthenticated || user !== null;

  if (!hasAuth) {
    // ❌ Not authenticated → redirect to login
    const callbackUrl = encodeURIComponent(pathname + url.search);
    throw redirect(`/auth/login?callbackUrl=${callbackUrl}`);
  }

  return null; // ✅ Authenticated → allow access
}
```

**What happens:**

- ✅ User visits protected route
- ✅ Middleware checks: `isAuthenticated || user !== null`
- ✅ If true → route renders
- ❌ If false → redirect to login with callback URL

**Why check `user !== null` and not just `isAuthenticated`?**

- After page reload: `isAuthenticated = false` (memory cleared)
- But `user !== null` (loaded from localStorage)
- This allows page to render while `useAuthInit` refreshes token in background
- Prevents flash redirect to login page!

---

#### 5️⃣ **Logout Flow**

```typescript
// store/slices/auth/authSlice.ts
reducers: {
  loggedOut: (state) => {
    // 1. Clear Redux state
    state.user = null;
    state.accessToken = null;
    state.isAuthenticated = false;

    // 2. Clear localStorage
    localStorage.removeItem('user');
  },
}

// Usage
const handleLogout = async () => {
  await logout(); // Calls API to invalidate refresh token
  dispatch(loggedOut()); // Clears local state
  navigate('/auth/login');
};
```

**What happens:**

- ✅ Call logout API (backend clears refresh token cookie)
- ✅ Clear Redux state
- ✅ Clear localStorage
- ✅ Redirect to login page

---

### 🛡️ Why This Approach is Best

#### ✅ **Security Advantages**

| Security Threat       | How We Prevent It                                                       | ⭐ Rating  |
| --------------------- | ----------------------------------------------------------------------- | ---------- |
| **XSS Attacks**       | Access token in memory only (not localStorage) → stolen JS can't access | ⭐⭐⭐⭐⭐ |
| **CSRF Attacks**      | HTTP-only cookie → JS can't read/modify refresh token                   | ⭐⭐⭐⭐⭐ |
| **Token Theft**       | Short-lived access tokens (15 min) → limited damage window              | ⭐⭐⭐⭐⭐ |
| **Session Hijacking** | Refresh token rotation (optional backend feature)                       | ⭐⭐⭐⭐   |
| **Man-in-the-Middle** | HTTPS only, Secure cookie flag                                          | ⭐⭐⭐⭐⭐ |

#### ✅ **Performance Advantages**

```
Traditional Approach (localStorage tokens):
├─ Page reload → Read token from localStorage
├─ Every API call → Read token from localStorage
└─ 50+ API calls = 50+ localStorage reads (slow!)

Our Approach (memory + auto-refresh):
├─ Page reload → One refresh API call
├─ Every API call → Read token from Redux (memory, instant!)
└─ 50+ API calls = 0 localStorage reads (fast!) ⚡
```

#### ✅ **User Experience Advantages**

| Scenario                  | Traditional Approach       | Our Approach                   |
| ------------------------- | -------------------------- | ------------------------------ |
| Login                     | Redirect → Protected page  | ✅ Same                        |
| API call (token valid)    | Works                      | ✅ Same                        |
| API call (token expired)  | ❌ Error → Manual refresh  | ✅ Auto-refresh, user unaware  |
| Page reload               | ❌ Flash logout → Re-login | ✅ Seamless, stays logged in   |
| Tab switch (30 min later) | ❌ Token expired error     | ✅ Auto-refresh on next action |

#### ✅ **Developer Experience Advantages**

```typescript
// ❌ Traditional: Manual token refresh everywhere
const fetchData = async () => {
  let response = await api.getData();
  if (response.status === 401) {
    const newToken = await refreshToken(); // Manual!
    response = await api.getData(); // Retry!
  }
  return response;
};

// ✅ Our approach: Automatic, developers don't think about it!
const { data } = useGetDataQuery(); // That's it! 🎉
```

#### ✅ **Scalability Advantages**

- **Single Source of Truth:** One base API, all endpoints auto-refresh
- **Tag-Based Invalidation:** Creating order auto-refreshes product stock
- **No Token Management Code:** Automatic at API layer, not in components
- **Easy Testing:** Mock Redux state, no localStorage to mock
- **Server-Side Ready:** Can move to server-side rendering easily

---

### 🔍 Token Validation & Revalidation

#### **When Access Token is Validated**

```typescript
// Every API request automatically includes access token
baseQuery: fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`); // ✅ Added here
    }
    return headers;
  },
  credentials: 'include', // ✅ Sends HTTP-only cookies
});
```

#### **When Token Revalidation Happens**

| Trigger               | Action                           | User Impact       |
| --------------------- | -------------------------------- | ----------------- |
| 401 error on API call | Auto-refresh via `/auth/refresh` | None (seamless)   |
| Page reload           | Check user exists → refresh      | None (seamless)   |
| Refresh token expired | Logout user                      | Redirect to login |
| Explicit logout       | Clear tokens + call logout API   | Expected          |

#### **Token Expiration Timeline**

```
Login
│
├─ Access Token: 15 min ─────────────┐
│                                     │ (Expires)
│                                     ↓
├─ API Call at 16 min ───────> 401 Error
│                                     │
│                                     ↓
├─ Auto Refresh ─────────────> New Access Token (15 min)
│                                     │
│                                     ↓
├─ Retry API Call ──────────────> ✅ Success
│
├─ Refresh Token: 7 days ──────────────────────┐
│                                               │ (Expires)
│                                               ↓
└─ After 7 days ──────────────────────> Logout (Re-login required)
```

---

### 📊 Complete Authentication State

```typescript
// Redux State Structure
auth: {
  user: {                    // From localStorage on reload
    id: string,
    username: string,
    email: string,
    role: string,
    // ... other user fields
  } | null,
  accessToken: string | null, // In memory only (lost on reload)
  isAuthenticated: boolean,   // Derived: !!(user && accessToken)
}

// localStorage (for UI/reload only)
{
  "user": "{...}"            // User info for fast rehydration
}

// HTTP-only Cookie (handled by browser)
refreshToken=xxx;            // Backend sets, JS can't access
HttpOnly;                    // Prevents JS access
Secure;                      // HTTPS only
SameSite=Strict;             // CSRF protection
```

---

### 📊 Complete Token Flow Diagrams

Visual representation of all authentication flows in the system:

#### **1️⃣ Login Flow**

```
┌─────────────────────────────────────────────────────────────┐
│                        LOGIN FLOW                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    POST /auth/login
                    { username, password }
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
         Response Body              Set-Cookie Header
    ┌─────────────────┐         ┌──────────────────┐
    │ user: {...}     │         │ refreshToken:    │
    │ accessToken: .. │         │ [HTTP-only]      │
    └─────────────────┘         └──────────────────┘
                │                           │
                └─────────────┬─────────────┘
                              ▼
                    ┌──────────────────────┐
                    │   Redux State        │
                    │ user: ✅             │
                    │ accessToken: ✅      │
                    │ isAuthenticated: ✅  │
                    └──────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            localStorage            Cookie Storage
            user: {...}         refreshToken: {...}
                                [HTTP-only, Secure]
```

#### **2️⃣ Page Reload Flow**

```
┌─────────────────────────────────────────────────────────────┐
│                    PAGE RELOAD FLOW                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    User Presses F5 🔄
                              │
                              ▼
                    Load from Storage
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
         localStorage              Cookie (auto-sent)
    ┌─────────────────┐         ┌──────────────────┐
    │ user: {...}     │         │ refreshToken:    │
    │                 │         │ [HTTP-only]      │
    └─────────────────┘         └──────────────────┘
                │                           │
                └─────────────┬─────────────┘
                              ▼
                    ┌──────────────────────┐
                    │   Redux State        │
                    │ user: ✅             │
                    │ accessToken: ❌      │
                    │ isAuthenticated: ❌  │
                    └──────────────────────┘
                              │
                              ▼
                    useAuthInit() hook
                    detects: user exists
                    but no accessToken
                              │
                              ▼
                    POST /auth/refresh
                    (Cookie sent automatically)
                              │
                ┌─────────────┴─────────────┐
                │                           │
            Success ✅                   Failure ❌
                │                           │
                ▼                           ▼
    dispatch(tokenRefreshed)    dispatch(loggedOut)
    accessToken: new            user: null
    isAuthenticated: true       isAuthenticated: false
                │                           │
                ▼                           ▼
    Stay on current page        Redirect to /auth/login
```

#### **3️⃣ Auto-Refresh on 401 Flow**

```
┌─────────────────────────────────────────────────────────────┐
│                 AUTO-REFRESH ON 401 FLOW                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    API Request (GET /products)
                    Header: Bearer {expired-token}
                              │
                              ▼
                      ⚠️  401 Unauthorized
                              │
                              ▼
                 baseQueryWithReauth intercepts
                 "Access token expired!"
                              │
                              ▼
                    POST /auth/refresh
                    Cookie: refreshToken (auto-sent)
                              │
                ┌─────────────┴─────────────┐
                │                           │
            Success ✅                   Failure ❌
                │                           │
                ▼                           ▼
    Get new accessToken         dispatch(loggedOut)
    response.data.accessToken   Clear all state
                │                           │
                ▼                           │
    dispatch(tokenRefreshed)               │
    Update Redux state                     │
                │                           │
                ▼                           │
    🔄 Retry original request               │
    Header: Bearer {new-token}             │
                │                           │
                ▼                           ▼
    ✅ Return data to user          Redirect to /auth/login
    User never noticed!             "Session expired"
```

#### **4️⃣ Complete Authentication Timeline**

```
Time    Action                          Access Token    Refresh Token    State
─────────────────────────────────────────────────────────────────────────────
00:00   Login                           ✅ Valid        ✅ Valid        Authenticated
00:14   API Call                        ✅ Valid        ✅ Valid        Working
00:15   Access Token Expires            ❌ Expired      ✅ Valid        Still works!
00:16   API Call → 401 → Auto-refresh   ✅ New Token    ✅ Valid        Seamless
01:00   Multiple API calls              ✅ Valid        ✅ Valid        Working
02:00   Page Reload (F5)                ❌ Lost         ✅ Valid        Auto-refresh
        useAuthInit() → /auth/refresh   ✅ New Token    ✅ Valid        Restored
7 days  Refresh Token Expires           ❌ Lost         ❌ Expired      Logout
        Next API call → /auth/refresh   ❌ Failed       ❌ Expired      → Login Page
```

#### **5️⃣ Middleware Protection Flow**

```
┌─────────────────────────────────────────────────────────────┐
│               ROUTE PROTECTION FLOW                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    User navigates to route
                    e.g., /products
                              │
                              ▼
                    authMiddleware executes
                              │
                              ▼
                    Check if public route?
                    /auth/login, /auth/register
                              │
                ┌─────────────┴─────────────┐
                │                           │
            Yes (Public)                No (Protected)
                │                           │
                ▼                           ▼
          ✅ Allow access       Check: isAuthenticated || user !== null
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                          Yes (Has Auth)              No (Not Auth)
                              │                           │
                              ▼                           ▼
                        ✅ Allow access         ❌ Redirect to login
                        Route renders           with callbackUrl
                        useAuthInit() runs      /auth/login?callbackUrl=/products
                        refreshes token         │
                        in background           ▼
                                          User logs in → Returns to /products
```

#### **6️⃣ Token Storage Architecture**

```
┌──────────────────────────────────────────────────────────────┐
│                  TOKEN STORAGE LAYERS                         │
└──────────────────────────────────────────────────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Redux Store   │     │  localStorage   │     │  HTTP Cookie    │
│   (Memory)      │     │  (Browser)      │     │  (HTTP-only)    │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ ✅ user         │     │ ✅ user         │     │ ✅ refreshToken │
│ ✅ accessToken  │     │ ❌ accessToken  │     │                 │
│ ✅ isAuth       │     │ ❌ refreshToken │     │ Properties:     │
│                 │     │                 │     │ - HttpOnly      │
│ Lifetime:       │     │ Lifetime:       │     │ - Secure        │
│ - Session only  │     │ - 7 days        │     │ - SameSite      │
│ - Lost on F5    │     │ - Persists      │     │                 │
│                 │     │                 │     │ Lifetime:       │
│ Security:       │     │ Security:       │     │ - 7 days        │
│ ⭐⭐⭐⭐⭐       │     │ ⭐⭐⭐          │     │                 │
│ (XSS safe)      │     │ (XSS risk)      │     │ Security:       │
│                 │     │                 │     │ ⭐⭐⭐⭐⭐       │
│ Purpose:        │     │ Purpose:        │     │ (JS can't read) │
│ - Fast access   │     │ - UI display    │     │                 │
│ - API calls     │     │ - Page reload   │     │ Purpose:        │
│                 │     │ - User info     │     │ - Get new token │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                         │
        └───────────────────────┴─────────────────────────┘
                                │
                                ▼
                    🔒 Complete Security Model
                    ✅ XSS Protection
                    ✅ CSRF Protection
                    ✅ Token Theft Protection
                    ✅ Session Hijacking Protection
```

---

### 🧪 Testing the Flow

```bash
# 1. Login
POST /auth/login
Body: { username, password }
Response: { success: true, data: { userInfo, accessToken } }
Cookie Set: refreshToken=xxx

# 2. Make API call (works)
GET /products
Header: Authorization: Bearer <accessToken>
Response: { success: true, data: [...] }

# 3. Wait 16 minutes (access token expires)
GET /products
Response: 401 Unauthorized

# 4. Auto-refresh happens (behind the scenes)
POST /auth/refresh
Cookie: refreshToken=xxx (sent automatically)
Response: { success: true, data: { accessToken: <new> } }

# 5. Original request retried
GET /products
Header: Authorization: Bearer <newAccessToken>
Response: { success: true, data: [...] }
```

---

### 🔧 Configuration

```typescript
// Customize token expiration
const TOKEN_CONFIG = {
  ACCESS_TOKEN_LIFETIME: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_LIFETIME: 7 * 24 * 60 * 60 * 1000, // 7 days
  AUTO_REFRESH_BUFFER: 5 * 60 * 1000, // Refresh 5 min before expiry (optional)
};

// Backend must set these values in JWT payload
// Backend must configure HTTP-only cookie settings
```

---

### 🚨 Error Handling

```typescript
// Scenario 1: Refresh token expired
POST /auth/refresh → 401
Action: dispatch(loggedOut()) → Redirect to login

// Scenario 2: Network error during refresh
POST /auth/refresh → Network Error
Action: Retry once, then logout if still fails

// Scenario 3: Invalid refresh token (tampered)
POST /auth/refresh → 403
Action: dispatch(loggedOut()) → Redirect to login

// Scenario 4: User logged out from another device
POST /auth/refresh → 401 (token revoked)
Action: dispatch(loggedOut()) → Redirect to login
```

---

### ✅ Implementation Checklist

**Frontend (This Project) ✅**

- [x] Single base API with auto-refresh
- [x] Auth slice with loginSucceeded, tokenRefreshed, loggedOut
- [x] useAuthInit hook for page reload
- [x] Auth middleware for route protection
- [x] HTTP-only cookie support (credentials: 'include')
- [x] localStorage persistence for user info only
- [x] Typed Redux hooks for auth state

**Backend Requirements ⚠️**

- [ ] POST `/auth/login` → Returns `{ accessToken, userInfo }` + Sets HTTP-only cookie
- [ ] POST `/auth/refresh` → Reads HTTP-only cookie → Returns `{ accessToken }`
- [ ] POST `/auth/logout` → Clears HTTP-only cookie
- [ ] Access token validation on protected endpoints
- [ ] Refresh token rotation (optional, recommended)
- [ ] Token expiration matching frontend expectations (15 min access, 7 day refresh)

---

### 📚 Further Reading

- [RTK Query Authentication Documentation](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery)
- [OWASP JWT Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [HTTP-only Cookie Security](https://owasp.org/www-community/HttpOnly)
- [Token-based Authentication Guide](https://auth0.com/docs/secure/tokens/access-tokens)

---

## 📝 Code Quality

### Linting & Formatting

- **ESLint:** TypeScript + React rules
- **Prettier:** Consistent code formatting
- **Husky:** Pre-commit hooks
- **lint-staged:** Format staged files only
- **Commitlint:** Conventional commit messages

### Commit Convention

```bash
# Format: <type>(<scope>): <subject>

feat(auth): add JWT refresh token logic
fix(products): resolve pagination bug
docs(readme): update installation steps
chore(deps): upgrade React to v19
```

---

## 🔮 Future Enhancements

- [ ] **Token Refresh:** Automatic token refresh before expiration
- [ ] **Role-Based Access Control (RBAC):** Granular permissions
- [ ] **Dark Mode:** Theme switching
- [ ] **Multi-language Support:** i18n integration
- [ ] **Unit Tests:** Jest + React Testing Library
- [ ] **E2E Tests:** Playwright or Cypress
- [ ] **PWA Support:** Offline capabilities
- [ ] **Real-time Updates:** WebSocket integration
- [ ] **Advanced Filtering:** Search, sort, and filter enhancements
- [ ] **Export Features:** CSV/Excel export for reports
- [ ] **Audit Logs:** Track all user actions
- [ ] **Dashboard Analytics:** Charts and metrics

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary and confidential.

---

## 👥 Team

**SaRa Development Team**

For questions or support, contact: [Your Contact Information]

---

## 🙏 Acknowledgments

- React Team for React 19
- Redux Toolkit team for RTK Query
- Tailwind CSS team
- React Router team for v7
- Open source community

---

**Built with ❤️ by the SaRa Team**
