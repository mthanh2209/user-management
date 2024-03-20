export interface IUser {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  isActive: boolean;
  registeredDate: string | null;
  lastModifiedDate: string;
  details: string;
  bgColor: string;
}
