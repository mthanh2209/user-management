import { useState } from 'react';
import { mutate } from 'swr';

// Component
import AssignItem from '@components/DataDisplay/Assign/AssignItem';

// Constants
import { API, INFO_LIST_VIEW_USER } from '@constants';

// Helpers
import {
  filterUserItemsByUserId,
  findUserItemId,
  isItemAssignedToUser
} from '@helpers';

// Services
import {
  assignRuleToUser,
  getRoles,
  getRules,
  getUserRoles,
  getUserRules,
  unAssignRuleFromUser
} from '@services';

// Stores
import { Context } from '@stores';

// Types
import { ItemAssign } from '@types';

interface IAssignRule {
  rules: ItemAssign[];
  title: string;
}

const AssignRule = ({ rules, title }: IAssignRule) => {
  const [ruleState, setRuleState] = useState<ItemAssign[]>(rules);

  const { selectedRow, setUserInfoList } = Context();

  const { data: ruleData } = getRules();
  const { data: roleData } = getRoles();
  const { data: userRules } = getUserRules();
  const { data: userRoles } = getUserRoles();

  const userId = selectedRow.data?.id || 0;

  const getCorrespondingUserRules = filterUserItemsByUserId(
    userRules,
    ruleData,
    userId
  );

  const getCorrespondingUserRoles = filterUserItemsByUserId(
    userRoles,
    roleData,
    userId
  );

  /**
   * Handles the selection of a role.
   * @param id - The ID of the role.
   */
  const handleRuleSelect = (id: number) => async () => {
    const isCurrentlyAssigned = isItemAssignedToUser(
      selectedRow.data?.id || 0,
      id,
      userRules || [],
      'ruleId'
    );

    // Find the userRoleId
    const userRuleId = findUserItemId(
      selectedRow.data?.id || 0,
      id,
      userRules || [],
      'ruleId'
    );

    // Choose the appropriate action based on the current state of the item (assign or unassign rule)
    const action = isCurrentlyAssigned
      ? () => unAssignRuleFromUser(userRuleId)
      : () => assignRuleToUser(selectedRow.data?.id || 0, id);

    // Perform the action and retrieve the response
    const res = await action();

    const data = res && res.data;
    if (!data) {
      return;
    }

    // Update the data in the cache or on the server
    mutate(`${API.BASE}/${API.USER_RULES}`);

    // Create a new array with the updated assigned state for the selected role
    const newRules = ruleState.map((rule) => {
      if (rule.id === id) {
        return { ...rule, isAssigned: !isCurrentlyAssigned };
      }
      return rule;
    });

    // Update the state of the list rule
    setRuleState(newRules);

    // Update the display data list
    setUserInfoList([
      ...INFO_LIST_VIEW_USER(
        selectedRow.data,
        getCorrespondingUserRoles,
        getCorrespondingUserRules
      )
    ]);
  };

  return (
    <AssignItem
      items={rules}
      title={title}
      optionName='rule'
      handleItemSelect={handleRuleSelect}
    />
  );
};

export default AssignRule;
