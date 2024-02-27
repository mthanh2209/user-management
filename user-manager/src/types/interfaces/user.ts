import { IRole, IRule } from '@types';

export interface IUser {
  id?: number;
  avatar: string;
  fullName: string;
  email: string;
  isActive: boolean;
  registeredDate: string | null;
  lastVisitedDate: string;
  details: string;
  bgColor: string;
  roles: IRole[];
  rules: IRule[];
}
