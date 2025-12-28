export interface EmployeeT {
  id: number;
  name: string;
  role: string;
  email: string;
  status: 'Y' | 'N';
  permissions: string[];
}
