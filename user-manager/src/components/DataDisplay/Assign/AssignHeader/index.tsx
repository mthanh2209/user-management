import { AssignmentOptions, ItemAssign, SingleOptionTypes } from '@types';

interface AssignHeaderProp {
  items: ItemAssign[];
  heading: string;
  optionName: string;
  isModifying: boolean;
  onModifyClick: () => void;
  selectedType: AssignmentOptions;
  singleOption?: SingleOptionTypes;
  onTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssignHeader = ({
  items,
  heading,
  optionName,
  isModifying,
  onModifyClick,
  selectedType,
  singleOption,
  onTypeChange
}: AssignHeaderProp) => {
  return ()
};
