// Component
import AssignItem from "@components/Assign/AssignItem";

// Types
import { ItemAssign } from "@types";

interface IAssignRule {
  rules: ItemAssign[];
  title: string;
}

const AssignRule = ({ rules, title }: IAssignRule) => {
  return (
    <AssignItem
      items={rules}
      title={title}
      optionName="rule"
    />
  )
};

export default AssignRule;
