export interface UserT {
  id: number;
  name: string;
  role: 'admin' | 'vendor' | 'support' | 'not defined';
  // token: { access: string; refresh: string };
  permissions: string[]; // e.g., ['products.read', 'users.create']
}

export interface LoginResponseT {
  success: boolean;
  message: string;
  data: {
    userInfo: UserT;
    accessToken: string;
  };
}

export interface LoginRequestT {
  username: string;
  password: string;
}
