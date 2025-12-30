export interface UserT {
  name: string;
  employeeId: string;
  mobileNo: string;
  email: string;
  photo: File | string;
  role: string;
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

export interface RefreshTokenResponseT {
  success: boolean;
  data: {
    accessToken: string;
  };
}
