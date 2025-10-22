export interface User {
  id: number;
  name: string;
  role: 'admin' | 'vendor' | 'support';
  permissions: string[]; // e.g., ['products.read', 'users.create']
}
