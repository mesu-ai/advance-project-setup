# 🌐 SaRa Admin Panel

**SaRa Admin Panel** is a modern, production-grade administrative dashboard built for large-scale e-commerce operations.  
It provides powerful management capabilities for products, orders, users, roles, analytics, and more — optimized for performance, scalability, and developer experience.

---

## 🚀 Tech Stack

| Layer                  | Technology                                                                     | Purpose                                             |
| ---------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| **Frontend Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Strongly typed UI with modular components           |
| **Build Tool**         | [Vite](https://vitejs.dev/)                                                    | Lightning-fast development & optimized builds       |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)                                       | Utility-first responsive design                     |
| **State Management**   | [Redux Toolkit (RTK)](https://redux-toolkit.js.org/)                           | Centralized store with RTK Query for caching        |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)      | Type-safe schema validation                         |
| **HTTP Client**        | [Axios](https://axios-http.com/)                                               | API communication with interceptors                 |
| **Routing**            | [React Router v7 (Data Mode)](https://reactrouter.com/start/modes)             | Nested routes & loaders for modern SPA architecture |
| **Authorization**      | Custom JWT-based + [CASL](https://casl.js.org/)                                | Role & permission-based access control              |
| **Sanitization**       | [DOMPurify](https://github.com/cure53/DOMPurify)                               | Prevents XSS by sanitizing HTML                     |
| **UI Library**         | [shadcn/ui](https://ui.shadcn.com/)                                            | Accessible, themeable base components               |

---

## 🧩 Features

### 🔐 Authentication & Authorization

- JWT-based secure login & refresh token system
- Role-based and permission-based access (Admin, Super Admin, Moderator, etc.)
- Protected routes and UI-level access control

### 🧭 Core Modules

- **Dashboard Analytics:** Real-time overview of key business KPIs
- **Product Management:** CRUD operations, stock, pricing, and variants
- **Order Management:** Track, process, and update order statuses
- **User Management:** Add/edit/remove users and assign roles
- **Reports & Logs:** Exportable analytics and audit trails

### 🎨 UI & Experience

- Light/Dark mode theme switching
- Responsive design for all screen sizes
- Consistent layout and typography system
- Smooth transitions and interactive components

### ⚙️ Developer Experience

- Strict TypeScript setup
- ESLint + Prettier integration
- Commitlint + Husky for consistent commits
- Modular folder structure (Clean Architecture inspired)
- RTK Query API slices for data fetching
- Environment-based configuration via `.env`

---

## 🏗️ Folder Structure
