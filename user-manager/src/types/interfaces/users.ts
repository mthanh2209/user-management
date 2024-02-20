export interface IUserProps {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  isActive: boolean;
  registeredDate: string | null;
  lastVisitedDate: string;
  details: string;
  bgColor: string;
}
