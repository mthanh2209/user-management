export interface IItemNav {
  id: number;
  label: string;
  onClick: () => void;
}

export interface ItemViewProps {
  icon: string;
  title: string;
  additionalClass?: string;
  content: Array<{
    id: string;
    text: string;
    onClick: () => {};
  }>;
}

export interface ItemAssign {
  id: number;
  name: string;
  bgColor?: string;
  description?: string;
  isAssigned: boolean;
  isAssignedDirectly?: boolean;
  assignedTo?: {
    id?: number;
    name?: string;
  }[];
}
