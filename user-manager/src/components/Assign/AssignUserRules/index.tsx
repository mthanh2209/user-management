import { useContext, useState } from 'react';

// Component
import AssignItem from '@components/Assign/AssignItem';

// Constants
import { TOAST_TYPE } from '@constants';

// Helpers
import { findUserItemId, isItemAssignedToUser } from '@helpers/array';

// Services
import {
  assignRuleToUser,
  getRoleRules,
  getUserRoles,
  getUserRules,
  unAssignRuleFromUser
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

interface IAssignRule {
  items: ItemAssign[];
  title: string;
}

const AssignUserRules = ({ items, title }: IAssignRule) => {
  const [ruleState, setRuleState] = useState<ItemAssign[]>(items);

  const { dispatch, selectedRow } = useContext(Context);

  const { data: userRules, mutate: mutateUserRules } = getUserRules();
  const { data: userRoles } = getUserRoles();
  const { data: roleRules } = getRoleRules();

  /**
   * Handles the selection of a role.
   * @param id - The ID of the role.
   */
  const handleRuleSelect = (id: number) => async () => {
    dispatch({ type: TOAST_TYPE.PROCESSING });

    const isCurrentlyAssigned = isItemAssignedToUser(
      selectedRow.data.id,
      id,
      userRules || [],
      'ruleId'
    );

    // Find the userRoleId
    const userRuleId = findUserItemId(
      selectedRow.data.id,
      id,
      userRules || [],
      'ruleId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromUser(userRuleId)
      : () => assignRuleToUser(selectedRow.data.id, id);

    // Perform the action and retrieve the response
    const res = await action();

    const data = res && res.data;
    if (!data) {
      dispatch({ type: TOAST_TYPE.ERROR });
      return;
    }

    // Update the data in the cache or on the server
    mutateUserRules();

    // Create a new array with the updated assigned state for the selected role
    const newRules = ruleState.map((rule) => {
      if (rule.id === id) {
        return { ...rule, isAssigned: !isCurrentlyAssigned };
      }
      return rule;
    });

    // Update the state of the list rule
    setRuleState(newRules);

    dispatch({ type: TOAST_TYPE.SUCCESS });
  };

  return (
    <AssignItem
      items={items}
      title={title}
      optionName='rule'
      userRoles={userRoles}
      userRules={userRules}
      roleRules={roleRules}
      handleItemSelect={handleRuleSelect}
    />
  );
};

export default AssignUserRules;
