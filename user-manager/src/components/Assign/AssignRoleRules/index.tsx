import { useContext, useState } from 'react';

// Component
import AssignItem from '@components/Assign/AssignItem';

// Constants
import { TYPES } from '@constants';

// Helpers
import {
  findRoleItemId,
  isItemAssignedToRole
} from '@helpers/array';

// Services
import {
  assignRuleToRole,
  getRoleRules,
  unAssignRuleFromRole
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

interface IAssignRoleRules {
  items: ItemAssign[];
  title: string;
}

const AssignRoleRules = ({ items, title }: IAssignRoleRules) => {
  const [ruleState, setRuleState] = useState<ItemAssign[]>(items);

  const { state, dispatch } = useContext(Context);
  const { selectedRow } = state;

  const { data: roleRules, mutate: mutateRoleRules } = getRoleRules();

  // Handles the selection of a rule for assignment to a role.
  const handleItemSelect = (id: number) => async () => {
    dispatch({ type: TYPES.PROCESSING });

    const isCurrentlyAssigned = isItemAssignedToRole(
      selectedRow.data.id,
      id,
      roleRules || [],
      'ruleId'
    );

    const roleRuleId = findRoleItemId(
      selectedRow.data.id,
      id,
      roleRules || [],
      'ruleId'
    );

    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromRole(roleRuleId)
      : () => assignRuleToRole(selectedRow.data.id, id);

    const res = await action();

    const data = res && res.data;
    if (!data) {
      dispatch({ type: TYPES.ERROR });
      return;
    }

    mutateRoleRules();

    const newRules = ruleState.map((rule) => {
      if (rule.id === id) {
        return { ...rule, isAssigned: !isCurrentlyAssigned };
      }
      return rule;
    });

    setRuleState(newRules);

    dispatch({ type: TYPES.SUCCESS });
  };

  return (
    <AssignItem
      items={items}
      title={title}
      optionName='roleRules'
      handleItemSelect={handleItemSelect}
    />
  );
};

export default AssignRoleRules;
