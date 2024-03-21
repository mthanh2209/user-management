import { useContext } from 'react';

// CSS
import '@components/Assign/AssignHeader/AssignHeader.css';

// Components
import RadioButton from '@components/RadioButton';
import TextView from '@components/EditorProfile/TextView';
import Button from '@components/Button';

// Types
import {
  IRoleRule,
  IUserRole,
  IUserRule,
  ItemAssign
} from '@types';

// Constants
import {
  AssignmentOptions,
  SingleOptionTypes
} from '@constants';

// Stores
import { Context } from '@stores';

// Helpers
import {
  getRoleRulesForRole,
  getUserRolesForUser,
  getUserRulesForUser
} from '@helpers/array';

interface AssignHeaderProp {
  items: ItemAssign[];
  title: string;
  optionName: string;
  isModifying: boolean;
  userRules?: IUserRule[];
  userRoles?: IUserRole[];
  roleRules?: IRoleRule[];
  onModifyClick: () => void;
  selectedType: AssignmentOptions;
  singleOption?: SingleOptionTypes;
  onTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssignHeader = ({
  items,
  title,
  optionName,
  isModifying,
  userRules,
  userRoles,
  roleRules,
  onModifyClick,
  selectedType,
  singleOption,
  onTypeChange
}: AssignHeaderProp) => {
  const { state } = useContext(Context);
  const { selectedRow } = state;

  // Count directly assigned items
  const directlyAssignedCount =
    items.filter((item) => item.isAssigned).length || 0;

  // Get user rules and roles
  const userRulesForUser = getUserRulesForUser(userRules, selectedRow.data.id);
  const userRolesForUser = getUserRolesForUser(userRoles, selectedRow.data.id);

  // Extract unique rule ids
  const ruleIds = new Set();

  userRulesForUser?.forEach((userRule) => ruleIds.add(userRule.ruleId));

  userRolesForUser?.forEach((userRole) => {
    const roleRulesForRole = getRoleRulesForRole(roleRules, userRole.roleId);

    roleRulesForRole?.forEach((roleRule) => ruleIds.add(roleRule.ruleId));
  });

  const allAssignmentsCount = ruleIds.size + directlyAssignedCount;

  // Determine data for radio buttons or text view
  let data = [];

  if (singleOption) {
    if (directlyAssignedCount > 0) {
      data.push({
        id: singleOption.toLowerCase().replace(' ', '-'),
        name: optionName,
        value: singleOption,
        label: `${singleOption} (${directlyAssignedCount})`,
        isChecked: false,
        onChange: () => {}
      });
    } else {
      const noSingleOptionLabel = `No ${singleOption.toLowerCase()}`;
      data.push({
        id: 'no-single-option',
        name: optionName,
        value: noSingleOptionLabel,
        label: noSingleOptionLabel,
        isChecked: false,
        onChange: () => {}
      });
    }
  } else {
    data = [
      {
        id: 'assigned-directly',
        name: optionName,
        value: 'Assigned directly',
        label: `Assigned directly (${directlyAssignedCount})`,
        isChecked: selectedType === AssignmentOptions.AssignDirectly,
        onChange: () => {}
      },
      {
        id: 'all-assignments',
        name: optionName,
        value: 'All assignments',
        label: `All assignments (${allAssignmentsCount})`,
        isChecked: selectedType === AssignmentOptions.AllAssignment,
        onChange: () => {}
      }
    ];
  }

  // Determine whether to show radio buttons or text view
  const showRadioBtnView = data.length > 1;
  const showTextView = !showRadioBtnView && data[0];

  return (
    <div className='panel-assign-header'>
      <div className='panel-assign-header-item'>
        <h2 className='panel-assign-header-title'>{title}</h2>

        {showRadioBtnView &&
          data.map((item) => (
            <RadioButton
              key={item.id}
              id={item.id}
              name={item.name}
              value={item.value}
              label={item.label}
              isChecked={item.isChecked}
              onChange={onTypeChange}
            />
          ))}

        {showTextView && (
          <TextView
            content={
              directlyAssignedCount > 0
                ? `${data[0].value} (${directlyAssignedCount})`
                : data[0].value
            }
          />
        )}
      </div>

      <Button
        variants='secondary'
        size='lg'
        additionalClass='panel-assign-header-button'
        children={isModifying ? 'Done' : 'Modify'}
        isDisable={selectedType === AssignmentOptions.AllAssignment}
        onClick={onModifyClick}
      />
    </div>
  );
};

export default AssignHeader;
