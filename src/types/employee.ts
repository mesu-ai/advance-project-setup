import type { UserT } from './auth';

export interface EmployeeT extends UserT {
  nid: string;
  depertment: string;
  gender: 'femele' | 'male';
  status: 'Y' | 'N';
}

export interface EmployeeResponseT {
  success: boolean;
  message: string;
  data: EmployeeT;
}
