export interface RoleT {
  id: number;
  role: string;
  status: string;
  permissions: string[];
}

export interface RoleResponseT {
  success: boolean;
  message: string;
  data: RoleT;
}

export interface ModulePermissionT {
  path: string;
  page: string;
  actions: readonly string[];
  pageLabel?: string;
}
