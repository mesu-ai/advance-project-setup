export interface User {
  id: number;
  name: string;
  role: 'admin' | 'vendor' | 'support';
  token: { access: string; refresh: string };
  permissions: string[]; // e.g., ['products.read', 'users.create']
}
